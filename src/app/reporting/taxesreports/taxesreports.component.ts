import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-taxesreports',
  templateUrl: './taxesreports.component.html',
  styleUrls: ['./taxesreports.component.scss']
})
export class TaxesreportsComponent implements OnInit {


  ngOnInit(): void {
  } searchTerm: string = '';
  selectedPeriod: string = 'today';
  startDate: Date | null = new Date();
  endDate: Date | null = new Date();

  records = [
      { category: 'Electronics', sale: 1000, tax: 100, createdAt: '2024-12-20' },
      { category: 'Clothing', sale: 500, tax: 50, createdAt: '2024-12-21' },
      { category: 'Groceries', sale: 300, tax: 30, createdAt: '2024-12-22' },
      { category: 'Books', sale: 200, tax: 20, createdAt: '2024-12-23' },
      { category: 'Furniture', sale: 700, tax: 70, createdAt: '2024-12-24' },
  ];

  filteredRecords = [...this.records];

  constructor() {
      this.updateDateRange(); // Set default date range on initialization
  }

  // Method to filter records based on search term and selected date range
  filterData(): void {
      this.filteredRecords = this.records.filter(record => {
          const matchesSearch = record.category.toLowerCase().includes(this.searchTerm.toLowerCase());
          const withinDateRange = this.checkDateRange(record.createdAt); // Check against the createdAt field
          return matchesSearch && withinDateRange;
      });
  }

  // Method to clear all filters
  clearFilters(): void {
      this.searchTerm = '';
      this.selectedPeriod = 'today';
      this.startDate = new Date();
      this.endDate = new Date();
      this.filteredRecords = [...this.records]; // Reset to all records
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
      return this.filteredRecords.reduce((sum, record) => sum + record[field], 0);
  }
}