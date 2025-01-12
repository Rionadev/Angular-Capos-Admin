import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-storecreditreports',
  templateUrl: './storecreditreports.component.html',
  styleUrls: ['./storecreditreports.component.scss']
})
export class StorecreditreportsComponent implements OnInit {

  customers: any = [];
  searchTerm: string = '';
  filteredCustomers: any = [];
  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.fetchSearchItems();

  }
  fetchSearchItems() {

    this.customerService.fetchCumtomerData().subscribe(
      (res) => {
        this.customers = res;
        this.filteredCustomers = res;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }


  // Method to search customers based on the search term
  searchCustomers(): void {
    if (this.searchTerm) {
      this.filteredCustomers = this.customers.filter(customer =>
        customer.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCustomers = this.customers; // Reset to original customers
    }
  }

  // Method to calculate totals for the specified field
  getTotal(field: any): number {
    if (this.filteredCustomers.length == 0) return;

    return this.filteredCustomers.reduce((sum, customer) => {
      return sum + (customer[field] || 0); // Ensure to handle undefined fields
    }, 0);
  }


}
