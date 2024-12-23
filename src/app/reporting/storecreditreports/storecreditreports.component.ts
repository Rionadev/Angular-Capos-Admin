import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storecreditreports',
  templateUrl: './storecreditreports.component.html',
  styleUrls: ['./storecreditreports.component.scss']
})
export class StorecreditreportsComponent implements OnInit {

  customers = [
    { name: 'John Doe', email: 'john@example.com', totalIssued: 500, totalRedeemed: 300, balance: 200 },
    { name: 'Jane Smith', email: 'jane@example.com', totalIssued: 700, totalRedeemed: 400, balance: 300 },
    { name: 'Alice Johnson', email: 'alice@example.com', totalIssued: 600, totalRedeemed: 600, balance: 0 },
    // Add more customer data as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }


  searchTerm: string = '';
  filteredCustomers = [...this.customers];

  // Method to search customers based on the search term
  searchCustomers(): void {
    if (this.searchTerm) {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCustomers = [...this.customers];
    }
  }

  // Method to calculate totals for the specified field
  getTotal(field: string): number {
    return this.filteredCustomers.reduce((sum, customer) => sum + customer[field], 0);
  }
}
