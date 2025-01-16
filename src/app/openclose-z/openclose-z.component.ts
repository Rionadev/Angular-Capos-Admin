import { Component, Inject, OnInit } from '@angular/core';
import { ReportingService } from 'app/api/reporting/api.service';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-openclose-z',
  templateUrl: './openclose-z.component.html',
  styleUrls: ['./openclose-z.component.scss']
})
export class OpencloseZComponent implements OnInit {
  selectedDateFrom: any;
  selectedDateTo: any;

  searchTerm: string = '';
  selectedPeriod: string = 'today';

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
    const params = {
      from: this.selectedDateFrom,
      to: this.selectedDateTo,
    };
    // this.reportingService.fetchSaleTaxReport().subscribe(
    this.customerService.fetchSaleHistory(params).subscribe(

      (res) => {
        let sale_tax = {};
        // this.records = res;
        if (res.length > 0) {
          res.forEach(element => {
            if (element.products.length > 0) {
              element.products.forEach(el => {
                if (!sale_tax[el._id]) {
                  sale_tax[el._id] = {
                    id: el._id,
                    category: el.product_name,
                    sale: 0,
                    tax: 0
                  };
                }
                sale_tax[el._id].sale += element.total;
                sale_tax[el._id].tax += element.tax;
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
  fetchAuto(): void {
    // reportingService
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
