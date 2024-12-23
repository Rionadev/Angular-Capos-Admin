import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-salesreports',
  templateUrl: './salesreports.component.html',
  styleUrls: ['./salesreports.component.scss']
})
export class SalesreportsComponent implements OnInit {

  startDate: string = '';
  endDate: string = '';

  ngOnInit(): void {
  }

  init_date(){
    const today = new Date();
    const twentyDaysAgo = new Date();
    twentyDaysAgo.setDate(today.getDate() - 20);

    this.startDate = twentyDaysAgo.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    this.endDate = today.toISOString().split('T')[0]; // Format to YYYY-MM-DD    
  }

  constructor() {
    this.init_date();
  }
  transactions = [
    // Sample transaction data
    { date: '2024-01-01', totalInclTax: 100, revenue: 150, costOfGoods: 80, grossProfit: 70, margin: 46.67, tax: 10 },
    { date: '2024-01-02', totalInclTax: 200, revenue: 250, costOfGoods: 150, grossProfit: 100, margin: 40.00, tax: 20 },
    // Add more sample data as needed
  ];

  filteredTransactions = [...this.transactions];

  searchTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      return (
        (this.startDate ? transactionDate >= start : true) &&
        (this.endDate ? transactionDate <= end : true)
      );
    });
  }

  clearFilters() {
    // this.startDate = '';    this.endDate = '';
    this.init_date();
    this.filteredTransactions = [...this.transactions]; // Reset to original data
  }
}

