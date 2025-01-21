import { Component, OnInit, Inject } from '@angular/core';
import { ReportingService } from 'app/api/reporting/api.service';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
    selector: 'app-taxesreports',
    templateUrl: './taxesreports.component.html',
    styleUrls: ['./taxesreports.component.scss']
})
export class TaxesreportsComponent implements OnInit {
    selectedDateFrom: any;
    selectedDateTo: any;
    categoryData: any;

    searchTerm: string = '';
    selectedPeriod: string = 'today';

    ngOnInit(): void {
        this.setDateFromTo();
        this.fetchSearchItems();
    }
    selrow(selrow: any) {
        console.log(selrow);
    }

    setDateFromTo() {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        const oneDayAfter = new Date(today);

        sevenDaysAgo.setDate(today.getDate() - 100); // Subtract 7 days
        oneDayAfter.setDate(today.getDate() + 1); // Subtract 7 days


        this.selectedDateFrom = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
        this.selectedDateTo = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
    }

    fetchSearchItems() {
        const params = {
            start: new Date(this.selectedDateFrom),
            end: new Date(this.selectedDateTo),
        };
        // this.reportingService.fetchSaleTaxReport().subscribe(

        this.customerService.getType().subscribe(
            (res) => {
                this.categoryData = {};
                if (res.length > 0) {
                    res.forEach(element => {
                        this.categoryData[element._id] = element;
                    });
                }
                console.log(this.categoryData);
            },
            (error) => {
                console.error('Error fetching customer data:', error);
                // Handle the error as needed
            }
        );
        this.customerService.fetchSale(params).subscribe(
            (res) => {
                let sale_tax = {};
                // this.records = res;
                if (res.length > 0) {
                    res.forEach(element => {
                        if (element.products.length > 0) {
                            element.products.forEach(el => {
                                if (!sale_tax[el.product_id.type]) {
                                    sale_tax[el.product_id.type] = {
                                        id: el.product_id.type,
                                        category: this.categoryData[el.product_id.type].name,
                                        sale: 0,
                                        tax: 0,
                                        qty: 0,
                                        products: [],
                                    };
                                }
                                sale_tax[el.product_id.type].sale += el.price * el.qty;
                                sale_tax[el.product_id.type].tax += el.tax;
                                sale_tax[el.product_id.type].qty += el.qty;
                                sale_tax[el.product_id.type].products.push(element);
                            });
                        }
                    });
                }
                console.log(sale_tax);
                this.records = Object.values(sale_tax);

            },
            (error) => {
                console.error('Error fetching customer data:', error);
                // Handle the error as needed
            }
        );
        // this.customerService.fetchSaleHistory(params).subscribe(

        //     (res) => {

        //     },
        //     (error) => {
        //         console.error('Error fetching customer data:', error);
        //         // Handle the error as needed
        //     }
        // );
    }

    records: any;

    filteredRecords: any;

    constructor(
        private reportingService: ReportingService,
        private customerService: CustomerService,
        @Inject('APP_CONFIG') private config: any,
    ) {
        this.updateDateRange(); // Set default date range on initialization
    }

    // Method to filter records based on search term and selected date range
    filterData(): void {
        this.fetchSearchItems();

        // this.filteredRecords = this.records.filter(record => {
        //     const matchesSearch = record.category.toLowerCase().includes(this.searchTerm.toLowerCase());
        //     const withinDateRange = this.checkDateRange(record.createdAt); // Check against the createdAt field
        //     return matchesSearch && withinDateRange;
        // });
    }

    // Method to clear all filters
    clearFilters(): void {
        this.searchTerm = '';
        this.selectedPeriod = 'today';
        this.setDateFromTo();
        this.fetchSearchItems();

    }

    // Method to update the date range based on the selected period
    updateDateRange(): void {
        const today = new Date();
        switch (this.selectedPeriod) {
            case 'today':
                this.selectedDateFrom = new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0];
                this.selectedDateTo = this.selectedDateFrom;
                break;
            case 'thisWeek':
                const dayOfWeek = today.getDay(); // Sunday is 0, Monday is 1, ..., Saturday is 6

                // Calculate the start date (Sunday of the current week)
                this.selectedDateFrom = new Date(today.getFullYear(), today.getMonth(), today.getDate() - dayOfWeek).toISOString().split('T')[0];

                // Calculate the end date (Saturday of the current week)
                this.selectedDateTo = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - dayOfWeek)).toISOString().split('T')[0];
                break;
            case 'thisMonth':
                this.selectedDateFrom = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
                this.selectedDateTo = new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0];
                break;
            case 'thisYear':
                this.selectedDateFrom = new Date(today.getFullYear(), 0, 1).toISOString().split('T')[0];
                this.selectedDateTo = new Date(today.getFullYear(), 11, 31).toISOString().split('T')[0];
                break;
        }
        this.filterData(); // Re-filter records after updating dates
    }

    // Method to check if a record falls within the selected date range
    checkDateRange(createdAt: string): boolean {
        const recordDate = new Date(createdAt);
        const start = this.selectedDateFrom ? new Date(this.selectedDateFrom) : null;
        const end = this.selectedDateTo ? new Date(this.selectedDateTo) : null;
        return (!start || recordDate >= start) && (!end || recordDate <= end);
    }

    // Method to calculate totals for the specified field
    getTotal(field: string): number {
        return (this.records?.reduce((sum, record) => sum + record[field], 0)).toFixed(2);
    }

    getPlain():string {
        return this.records.map(record => 
            `<tr><td>${record.category}</td><td>$${record.sale}</td><td>$${record.tax}</td></tr>`
          ).join('');
    }

    printContent() {
        const plainData = this.getPlain();
        const saleTotal = this.getTotal('sale');
        const taxTotal = this.getTotal('tax');
        const printWindow = window.open('Z-Report', 'Z-Report', 'height=3508,width=2480');
        /* printWindow?.document.write('<html><head><title>Print</title>');
        printWindow?.document.write('</head><body >');
        printWindow?.document.write(document.getElementById('print-section')?.innerHTML || '');
        printWindow?.document.write('</body></html>'); */
        printWindow.document.write(`
            <html>
                <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" media="print"/>
                <link href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css" rel="stylesheet">
                <link href='https://fonts.googleapis.com/css?family=Roboto:400,700,300' rel='stylesheet' type='text/css'>
                <title>Z-Report</title>
                <style>
                    @media print {
                        app-root > * { display: none; }
                        app-root app-print-layout { display: block; }
                    }

                    .header {
                        font-size: 32px; 
                        text-align: center;
                        margin-top: 56px;
                        margin-bottom: 56px;
                    }

                    .date {
                        font-size: 18px;
                        line-height: 0.5;
                        margin-bottom: 56px;
                    }
                    
                    table, td, th {
                        border: 1px solid;
                        padding: 6px 8px;
                    }
                    
                    th {
                        font-weight: 100;
                    }

                    table {
                        width: 100%;
                        border-collapse: collapse;
                        text-align: left;
                        font-size: 18px;
                    }

                    .footer {
                        position: fixed;
                        font-size: 18px;
                        bottom: 0px;
                    }

                    .footer div{
                        width: 100%;
                        text-align: center;
                    }


                </style>
                <body onload="window.print()">
                    <p class="header"><strong>Z-Report</strong></p>
                    <div class="date">
                    <p>Date: ${ this.selectedDateFrom } - ${ this.selectedDateTo }</p>
                    <p>PWA: ${ this.config.private_web_address}</p>
                    </div>
                    <div>
                        <table>
                            <tr>
                                <th>Category</th>
                                <th>Sale</th>
                                <th>Tax</th>
                            </tr>
                            <tr>
                                <td><strong>Total</strong></td>
                                <td><strong>$${ saleTotal }</strong></td>
                                <td><strong>$${ taxTotal }</strong></td>
                            </tr>
                            ${ plainData }
                        </table>
                    <div>
                    <div class="footer">
                        <div>Tax Report</div>
                    <div>
                </body>
            </html>
        `);

        printWindow?.document.close();
        //printWindow?.focus();
        //printWindow?.print();
        //printWindow?.document.close();
        //printWindow?.close();
        setTimeout(function () {
            //printWindow?.print();
            printWindow.close();
        }, 1000);
    }

    getCSVPlain():string {
        return this.records.map(record => 
            `${record.category},$${record.sale},$${record.tax}\n`
          ).join('');
    }

    exportContent() {
        const header = 'category,sale,tax\n';
        const total =`Total,${this.getTotal('sale')},${this.getTotal('tax')}\n`;
        const rows = this.getCSVPlain();
        
        const content = header + total + rows;

        const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        
        link.setAttribute('href', url);
        link.setAttribute('download', 'tax_reports.csv');
        link.style.visibility = 'hidden';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}