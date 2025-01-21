import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'app/api/reporting/api.service';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
    selector: 'app-taxesreports',
    templateUrl: './taxesreports.component.html',
    styleUrls: ['./taxesreports.component.scss']
})
export class TaxesreportsComponent implements OnInit {
    isShowdetailflag: boolean = false;


    selectedDateFrom: any;
    selectedDateTo: any;
    categoryData: any;

    searchTerm: string = '';
    selectedPeriod: string = 'today';

    sel_row: any;
    ngOnInit(): void {
        this.setDateFromTo();
        this.fetchSearchItems();
    }
    selrow(selrow: any) {
        console.log(selrow);
        this.sel_row = selrow;
        this.isShowdetailflag = true;

    }
    onBackdropClick() {
        this.isShowdetailflag = false;
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
                                if (!sale_tax[el.product_id.type._id]) {
                                    sale_tax[el.product_id.type._id] = {
                                        category: el.product_id.type.name,
                                        cost: 0,
                                        qty: 0,
                                        tax: 0,
                                        products: [],
                                    };
                                }
                                sale_tax[el.product_id.type._id].cost += el.price * el.qty;
                                sale_tax[el.product_id.type._id].tax += el.tax;
                                sale_tax[el.product_id.type._id].qty += el.qty;
                                sale_tax[el.product_id.type._id].products.push(el);
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
        private customerService: CustomerService) {
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
}