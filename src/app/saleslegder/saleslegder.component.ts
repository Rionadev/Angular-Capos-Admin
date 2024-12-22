import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-saleslegder',
  templateUrl: './saleslegder.component.html',
  styleUrls: ['./saleslegder.component.scss']
})
export class SaleslegderComponent implements OnInit {
  ngOnInit(): void {

  }
  selectedCustomer: string = '';
  selectedUser: string = '';
  selectedStatus: string = '';
  selectedDate: string = '';

  transactions = [
    // Sample transaction data
    { date: '2024-01-01', receipt: '001', user: 'A Saboor', register: 'Reg1', customer: 'new@gmail.com', status: 'Completed', total: 100 },
    { date: '2024-01-02', receipt: '002', user: 'Cashier One', register: 'Reg2', customer: 'test@gmail.com', status: 'On Account', total: 200 },
    // Add more sample data as needed
  ];

  filteredTransactions = [...this.transactions];

  searchTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      return (
        (this.selectedCustomer ? transaction.customer === this.selectedCustomer : true) &&
        (this.selectedUser ? transaction.user === this.selectedUser : true) &&
        (this.selectedStatus ? transaction.status === this.selectedStatus : true) &&
        (this.selectedDate ? transaction.date === this.selectedDate : true)
      );
    });
  }

  clearFilters() {
    this.selectedCustomer = '';
    this.selectedUser = '';
    this.selectedStatus = '';
    this.selectedDate = '';
    this.filteredTransactions = [...this.transactions]; // Reset to original data
  }
}