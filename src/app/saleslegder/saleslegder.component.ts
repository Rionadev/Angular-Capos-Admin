import { Component, OnInit } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-saleslegder',
  templateUrl: './saleslegder.component.html',
  styleUrls: ['./saleslegder.component.scss']
})
export class SaleslegderComponent implements OnInit {
  selectedCustomer: string = 'all';
  selectedUser: string = 'all';
  selectedStatus: string = 'all';
  selectedDateFrom: string = '';
  selectedDateTo: string = '';

  customers = [
    { value: 'all', label: 'All Customer' },
    { value: 'new@gmail.com', label: 'New Customer (new@gmail.com)' },
    { value: 'test@gmail.com', label: 'Test Customer (test@gmail.com)' },
    { value: 'saboor@gmail.com', label: 'Abdul Saboor (saboor@gmail.com)' },
  ];
  onCustomerChange() {
    // Logic to handle the change in selected customer
    console.log('Selected Customer:', this.selectedCustomer);
  }
  transactions = [
    { date: '2024-01-01', receipt: '001', user: 'A Saboor', register: 'Reg1', customer: 'new@gmail.com', status: 'Completed', total: 100 },
    { date: '2024-01-02', receipt: '002', user: 'Cashier One', register: 'Reg2', customer: 'test@gmail.com', status: 'On Account', total: 200 },
    // Add more sample data as needed
  ];

  filteredTransactions = [...this.transactions];
  constructor(private http: HttpClient, private customerService: CustomerService) { }

  setDateFromTo() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 1000); // Subtract 7 days

    this.selectedDateFrom = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.selectedDateTo = today.toISOString().split('T')[0]; // Set the end date to today
  }
  ngOnInit(): void {
    this.setDateFromTo();
    this.fetchSearchItems();
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
        console.log('Customer Data:', res);
        // Handle the response data as needed
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  searchTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const dateMatches = (this.selectedDateFrom && this.selectedDateTo)
        ? (transaction.date >= this.selectedDateFrom && transaction.date <= this.selectedDateTo)
        : true;

      return (
        (this.selectedCustomer ? transaction.customer === this.selectedCustomer : true) &&
        (this.selectedUser ? transaction.user === this.selectedUser : true) &&
        (this.selectedStatus ? transaction.status === this.selectedStatus : true) &&
        dateMatches
      );
    });
  }

  clearFilters() {
    this.selectedCustomer = 'all';
    this.selectedUser = 'all';
    this.selectedStatus = 'all';
    this.setDateFromTo();

    this.filteredTransactions = [...this.transactions]; // Reset to original transactions
  }
}
