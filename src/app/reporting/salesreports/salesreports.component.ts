import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-salesreports',
  templateUrl: './salesreports.component.html',
  styleUrls: ['./salesreports.component.scss']
})
export class SalesreportsComponent implements OnInit {
  [x: string]: any;
  showModal = false;
  selectedDateFrom: string = '';
  selectedDateTo: string = '';
  transactionsByDate: any = [];
  totalByDate: any = [];
  reportsData: any = [];
  total_reportData: any = [];

  beforeFiltered: any;

  // Pagination
  totalItems: number = 100; // Total number of items
  countPerPage: number = 10; // Default items per page
  currentPage: number = 1;

  ngOnInit(): void {
    this.setDateFromTo();
    this.fetchSearchItems();

  }

  setDateFromTo() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    const oneDayAfter = new Date(today);

    sevenDaysAgo.setDate(today.getDate()); // Subtract 7 days
    oneDayAfter.setDate(today.getDate() + 1); // Subtract 7 days


    this.selectedDateFrom = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.selectedDateTo = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
  }
  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    @Inject('APP_CONFIG') private config: any,
  ) { }

  transactions = [
    // Sample transaction data
    { date: '2024-01-01', totalInclTax: 100, revenue: 150, costOfGoods: 80, grossProfit: 70, margin: 46.67, tax: 10 },
    { date: '2024-01-02', totalInclTax: 200, revenue: 250, costOfGoods: 150, grossProfit: 100, margin: 40.00, tax: 20 },
    // Add more sample data as needed
  ];
  get filteredSales() {
    return this.selected_rowdata.data.filter(sale => sale.payment_status != 'not paid');
  }
  filteredTransactions: any = [];

  // searchTransactions() {
  //   this.filteredTransactions = this.transactions.filter(transaction => {
  //     const transactionDate = new Date(transaction.date);
  //     const start = new Date(this.selectedDateFrom);
  //     const end = new Date(this.selectedDateTo);

  //     return (
  //       (this.selectedDateFrom ? transactionDate >= start : true) &&
  //       (this.selectedDateTo ? transactionDate <= end : true)
  //     );
  //   });
  // }
  close() {
    this.showModal = false;
  }
  clearFilters() {
    // this.startDate = '';    this.endDate = '';
    this.setDateFromTo();
    this.fetchSearchItems();
  }
  selected_rowdata: any;
  showDetail(rowData: any) {
    this.selected_rowdata = {
      row: rowData,
      data: this.transactionsByDate[rowData.date]
    }
    console.log(this.selected_rowdata);
    this.showModal = true;

  }
  fetchSearchItems() {
    // this.http.get<any[]>(`${environment.apiUrl}/sale/getSearchItem`).subscribe(data => {

    // });
    const params = {
      start: this.selectedDateFrom,
      end: this.selectedDateTo,
      // page: this.currentPage - 1,
      // size: this.countPerPage,
      sale_status: 'all_closed',
    };

    // Log the params to check their structure
    // console.log('Sending params:', params);

    this.total_reportData = [];

    this.customerService.fetchSale(params).subscribe(
      (res) => {

        let t_total = 0;
        let t_revenue = 0;
        let t_cog = 0;
        let t_gp = 0;
        let t_margin = 0;
        let t_tax = 0;
        // Group transactions by date
        if (res.length == 0) return;
        this.totalItems = res.length;
        const groupedTransactions = res?.reduce((acc, item) => {
          const date = new Date(item.created_at).toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
          // if (item?.payment_status != 'not paid') {

          // Group by date
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);

          // }
          return acc;
        }, {} as Record<string, any[]>);

        this.transactionsByDate = groupedTransactions;
        this.reportsData = [];
        console.log(groupedTransactions);

        const groupedTransactionsArray = Object.keys(groupedTransactions)?.map(date => {
          // console.log('------', groupedTransactions[date]);

          const calc_row = groupedTransactions[date];
          let total = 0;
          let revenue = 0;
          let cog = 0;
          let gp = 0;
          let margin = 0;
          let tax = 0;

          calc_row.forEach(transaction => {
            console.log(transaction.sale_status);
            // if (transaction.payment_status != 'not paid') {

            total += transaction.subtotal; // include tax
            if (transaction.products.length > 0) {
              transaction.products.forEach(element => {
                revenue += (element?.product_id?.retail_price || 0) * element.qty;
                t_revenue += (element?.product_id?.retail_price || 0) * element.qty;
              });
            }
            tax += transaction.tax; //Tax
            if (transaction.products.length > 0) {
              transaction.products.forEach(element => {
                cog += (element?.product_id?.supply_price || 0) * element.qty;
                t_cog += (element?.product_id?.supply_price || 0) * element.qty;
              });
            }
            gp += transaction.subtotal - transaction.total_paid; //Gross profit
            //total whole
            t_total += transaction.subtotal;
            t_tax += transaction.tax;
            t_gp += transaction.subtotal - transaction.total_paid;

          });


          this.reportsData.push({
            date: date,
            total: total.toFixed(2),
            revenue: revenue.toFixed(2),
            cog: cog.toFixed(2),
            gp: gp.toFixed(2),
            tax: tax.toFixed(2),
            margin: ((gp / revenue) * 100).toFixed(2),
          });
        });
        this.filteredTransactions = groupedTransactionsArray;
        this.totalItems = groupedTransactionsArray.length;
        this.beforeFiltered = groupedTransactionsArray
        this.total_reportData = {
          total: t_total.toFixed(2),
          revenue: t_revenue.toFixed(2),
          cog: t_cog.toFixed(2),
          gp: t_gp.toFixed(2),
          tax: t_tax.toFixed(2),
          margin: ((t_gp / t_revenue) * 100).toFixed(2),
        }

        console.log(this.reportsData); // View the grouped data
        console.log(this.total_reportData); // View the grouped data
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  formatDate(dateString: string) {
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }
  onPageChanged(page: number) {
    this.paginateItems(page);
  }

  onCountPerPageChanged(count: number) {
    if (this.countPerPage != count) {
      this.countPerPage = count; // Update count per page
      this.paginateItems(1);
    }
  }
  paginateItems(page: number) {
    this.currentPage = page;
    /* const startIndex = (page - 1) * this.countPerPage; // Default items per page
    const endIndex = startIndex + this.countPerPage; */
    //this.paginatedItems = this.allItems.slice(startIndex, endIndex);
    this.onGetData();
  }
  onGetData() {
    const page = (this.currentPage - 1).toString();
    const size = (this.countPerPage).toString();
    console.log(this.countPerPage);
    console.log(this.currentPage);
    
    // this.fetchSearchItems();
  }


  getPlain(): string {
    return this.reportsData.map(transaction =>
      `
      <tr>
        <td>${transaction.date}</td>
        <td>${Number(transaction.total || 0).toFixed(2)}</td>
        <td>${Number(transaction.revenue || 0).toFixed(2)}</td>
        <td>${Number(transaction.cog || 0).toFixed(2)}</td>
        <td>${Number(transaction.gp || 0).toFixed(2)}</td>
        <td>${Number(transaction.margin || 0).toFixed(2)}%</td>
        <td>${Number(transaction.tax || 0).toFixed(2)}</td>
      </tr>
      `
    ).join('');
  }

  printContent() {
    const plainData = this.getPlain();
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
                        font-size: 38px; 
                        text-align: center;
                        margin-top: 56px;
                        margin-bottom: 56px;
                        color: tomato;
                        position: relative;
                    }

                    .date {
                        font-size: 18px;
                        line-height: 0.5;
                        margin-bottom: 56px;
                        color: green;
                    }
                    
                    table, td, th {
                        padding: 6px 8px;
                    }
                    
                    tr:nth-child(even){background-color: #f2f2f2}

                    th {
                      background-color: #666699;
                      color: white;
                    }

                    tr {
                        border-bottom: 1px solid #666699;
                    }
                    
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        text-align: left;
                        font-size: 18px;
                    }
                    
                    .image {
                        position: absolute;
                        right: 0px;
                        top: -56px;
                        
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
                <div class="header">
                    	<div class="image">
                              <img src="https://caposgt.com/assets/image/interface/home/logo.png" width="175" height="50"/>
                        </div>
                        <strong>Sales Report</strong>
                    </div>
                <div class="date">
                <p>DATE: ${this.selectedDateFrom} - ${this.selectedDateTo}</p>
                <p>PWA : ${this.config.private_web_address}</p>
                </div>
                <div>
                    <table>
                        <tr>
                            <th>Date</th>
                            <th>Total (Incl. Tax)</th>
                            <th>Revenue</th>
                            <th>Cost of Goods</th>
                            <th>Gross Profit</th>
                            <th>Margin (%)</th>
                            <th>Tax</th>
                        </tr>
                        <tr>
                          <td><strong>Total</strong></td>
                          <td><strong>$${Number(this.total_reportData.total || 0).toFixed(2)}</strong></td>
                          <td><strong>$${Number(this.total_reportData.revenue || 0).toFixed(2)}</strong></td>
                          <td><strong>$${Number(this.total_reportData.cog || 0).toFixed(2)}</strong></td>
                          <td><strong>$${Number(this.total_reportData.gp || 0).toFixed(2)}</strong></td>
                          <td><strong>${Number(this.total_reportData.margin).toFixed(2)}%</strong></td>
                          <td><strong>$${Number(this.total_reportData.tax || 0).toFixed(2)}</strong></td>
                        </tr>
                        ${plainData}
                    </table>
                <div>
                <div class="footer">
                    <div></div>
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

  getCSVPlain(): string {
    return this.reportsData.map(transaction =>
      `${transaction.date},$${Number(transaction.total || 0).toFixed(2)},$${Number(transaction.revenue || 0).toFixed(2)},$${Number(transaction.cog || 0).toFixed(2)},$${Number(transaction.gp || 0).toFixed(2)},${Number(transaction.margin || 0).toFixed(2)}%,$${Number(transaction.tax || 0).toFixed(2)}\n`
    ).join('');
  }

  exportContent() {
    const header = 'date, total(incl. tax), revenue, cost of goods, gross profit, margin(%), tax\n';
    const total = `Total,$${Number(this.total_reportData.total || 0).toFixed(2)},$${Number(this.total_reportData.revenue || 0).toFixed(2)},$${Number(this.total_reportData.cog || 0).toFixed(2)},$${Number(this.total_reportData.gp || 0).toFixed(2)},${Number(this.total_reportData.margin).toFixed(2)}%,$${Number(this.total_reportData.tax || 0).toFixed(2)}\n`;
    const rows = this.getCSVPlain();
    const content = header + total + rows;

    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'sales_report.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

}

