import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paymentreports',
  templateUrl: './paymentreports.component.html',
  styleUrls: ['./paymentreports.component.scss']
})
export class PaymentreportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  startDate: string = this.getFormattedDate(new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)); // 20 days ago
  endDate: string = this.getFormattedDate(new Date()); // Today

  transactions = [
      // Sample transaction data
      { date: '2024-12-01', storeCredit: 100, cashConcealedTotal: 200, cash: 150, credit: 50, debit: 0, refunds: 0, voided: 0, total: 200 },
      // Add more sample data as needed
  ];

  filteredTransactions = [...this.transactions];

  initToday() {
      this.startDate = this.getFormattedDate(new Date(Date.now() - 20 * 24 * 60 * 60 * 1000));
      this.endDate = this.getFormattedDate(new Date());
      this.filteredTransactions = [...this.transactions]; // Reset filtered results
  }

  searchTransactions() {
      this.filteredTransactions = this.transactions.filter(transaction => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= new Date(this.startDate) && transactionDate <= new Date(this.endDate);
      });
  }

  getFormattedDate(date: Date): string {
      const d = new Date(date);
      return d.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  }
}