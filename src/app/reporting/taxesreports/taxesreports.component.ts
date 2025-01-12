import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'app/api/reporting/api.service';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
    selector: 'app-taxesreports',
    templateUrl: './taxesreports.component.html',
    styleUrls: ['./taxesreports.component.scss']
})
export class TaxesreportsComponent implements OnInit {
    selectedDateFrom: string = '';
    selectedDateTo: string = '';

    searchTerm: string = '';
    selectedPeriod: string = 'today';
    startDate: Date | null = new Date();
    endDate: Date | null = new Date();
    ngOnInit(): void {
        this.setDateFromTo();
        this.fetchSearchItems();
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
        // this.http.get<any[]>(`${environment.apiUrl}/sale/getSearchItem`).subscribe(data => {

        // });
        const params = {
            from: this.selectedDateFrom,
            to: this.selectedDateTo,
        };

        // Log the params to check their structure
        console.log('Sending params:', params);


        this.customerService.fetchSaleHistory(params).subscribe(
            (res) => {
                this.records = res;
            },
            (error) => {
                console.error('Error fetching customer data:', error);
                // Handle the error as needed
            }
        );
    }



    records: any;

    filteredRecords: any;

    constructor(private reportingService: ReportingService, private customerService: CustomerService) {
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
        this.startDate = new Date();
        this.endDate = new Date();
    }

    // Method to update the date range based on the selected period
    updateDateRange(): void {
        const today = new Date();
        switch (this.selectedPeriod) {
            case 'today':
                this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                this.endDate = this.startDate;
                break;
            case 'thisWeek':
                this.startDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay());
                this.endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (6 - today.getDay()));
                break;
            case 'thisMonth':
                this.startDate = new Date(today.getFullYear(), today.getMonth(), 1);
                this.endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                break;
            case 'thisYear':
                this.startDate = new Date(today.getFullYear(), 0, 1);
                this.endDate = new Date(today.getFullYear(), 11, 31);
                break;
        }
        this.filterData(); // Re-filter records after updating dates
    }

    // Method to check if a record falls within the selected date range
    checkDateRange(createdAt: string): boolean {
        const recordDate = new Date(createdAt);
        const start = this.startDate ? new Date(this.startDate) : null;
        const end = this.endDate ? new Date(this.endDate) : null;
        return (!start || recordDate >= start) && (!end || recordDate <= end);
    }

    // Method to calculate totals for the specified field
    getTotal(field: string): number {
        return (this.records?.reduce((sum, record) => sum + record[field], 0)).toFixed(2);
    }
}