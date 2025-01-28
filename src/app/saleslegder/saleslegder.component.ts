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

  totalItems: number = 100; // Total number of items
  countPerPage: number = 10; // Default items per page
  currentPage: number = 1;
  before_filteredTransactions: any;


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
  users = [];
  sale_status = [];
  onCustomerChange() {
    // Logic to handle the change in selected customer
    console.log('Selected Customer:', this.selectedCustomer);
  }
  transactions = [];

  filteredTransactions = [...this.transactions];
  constructor(private http: HttpClient, private customerService: CustomerService) { }

  setDateFromTo() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    const oneDayAfter = new Date(today);
    oneDayAfter.setDate(today.getDate() + 1);

    this.selectedDateFrom = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.selectedDateTo = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
  }
  ngOnInit(): void {
    this.setDateFromTo();
    this.fetchSearchItems();
  }
  fetchSearchItems() {

    const params = {
      // from: this.selectedDateFrom,
      // to: this.selectedDateTo,
      start: this.selectedDateFrom,
      end: this.selectedDateTo,
      sale_status: 'all_closed',
    };

    // Log the params to check their structure
    console.log('Sending params:', params);

    this.customerService.fetchSaleHistory(params).subscribe(
      (res) => {
        this.customers = [];
        this.sale_status = [];
        this.users = [];

        if (res.length > 0) this.totalItems = res.length;

        this.transactions = res.map(item => {
          // if (item.payment_status != 'not paid') 
          {
            console.log(item.payment_status);

            if (item.customer && item.customer.email) {
              const customerEmail = item.customer?.email || '';
              if (customerEmail) {
                const customerExists = this.customers.some(
                  customer => customer.value === customerEmail
                );

                if (!customerExists) {
                  this.customers.push({
                    value: customerEmail,
                    label: item?.customer?.name || ''
                      ? `${item?.customer?.name || ''} (${customerEmail})`
                      : `New Customer (${customerEmail})`
                  });
                }
              }
            }
            if (item.user_id && item.user_id.email) {
              const userEmail = item.user_id?.email;
              if (userEmail) {
                const customerExists = this.users.some(
                  user => user.value === userEmail
                );

                if (!customerExists) {
                  this.users.push({
                    value: userEmail,
                    label: `${item.user_id.first_name} ${item.user_id.last_name}`
                      ? `${item.user_id.first_name} ${item.user_id.last_name} (${userEmail})`
                      : `New Customer (${userEmail})`
                  });
                }
              }
            }
            if (item.sale_status) {
              const status1 = item.sale_status;
              if (status1) {
                const customerExists = this.sale_status.some(
                  status => status.value === status1
                );
                if (!customerExists) {
                  this.sale_status.push({
                    value: status1,
                    label: status1
                  });
                }
              }
            }

            // Map transaction
            return {
              date: item.created_at,//new Date(item.created_at).toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
              receipt: item.sale_number, // Receipt number
              user: `${item.user_id?.first_name || ''} ${item.user_id?.last_name || ''}`, // Full name of user
              user_email: item?.user_id?.email || '', // Email of user
              register: item?.register?.name || '', // Register name
              customer: item?.customer?.name || '', // Customer name
              customer_email: item?.customer?.email || '', // Customer email
              status: item.sale_status, // Sale status
              total: item.total, // Total amount
              subtotal: item.subtotal,
            };
          }
          return null; // Return null if payment status is 'not paid'
        }).filter(item => item !== null); // Filter out null values;

        // this.filteredTransactions = [...this.transactions];
        this.totalItems = this.transactions.length;
        this.before_filteredTransactions = [...this.transactions];
        this.onGetData();
        // Convert set to array and parse JSON
        this.customers = [
          { value: 'all', label: 'All Customer' },
          ...this.customers
        ];
        this.users = [
          { value: 'all', label: 'All Users' },
          ...this.users
        ];
        this.sale_status = [
          { value: 'all', label: 'All Status' },
          ...this.sale_status
        ];
        console.log('transactions:', this.transactions);

      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  searchTransactions() {
    this.before_filteredTransactions = this.transactions.filter(transaction => {
      const customerMatches = this.selectedCustomer === 'all' || transaction.customer_email === this.selectedCustomer;
      const userMatches = this.selectedUser === 'all' || transaction.user_email === this.selectedUser;
      const statusMatches = this.selectedStatus === 'all' || transaction.status === this.selectedStatus;

      return customerMatches && userMatches && statusMatches;
    });
    this.totalItems = this.before_filteredTransactions.length;
    this.onGetData();
    console.log('Filtered Transactions:', this.filteredTransactions);
  }
  calculateTotal() {
    if (this.before_filteredTransactions) {

      return this.before_filteredTransactions.reduce((acc, transaction) => acc + transaction.subtotal, 0) || 0;
    } else {
      return 0;
    }
  }
  clearFilters() {
    this.selectedCustomer = 'all';
    this.selectedUser = 'all';
    this.selectedStatus = 'all';
    // this.setDateFromTo();

    // this.filteredTransactions = [...this.transactions]; // Reset to original transactions
    this.before_filteredTransactions = [...this.transactions]; // Reset to original transactions
    this.onGetData();

  }
  onPageChanged(page: number) {
    this.paginateItems(page);
  }

  onCountPerPageChanged(count: number) {
    if (this.countPerPage != count) {
      this.countPerPage = count; // Update count per page
      this.paginateItems(1);
    }
  }
  paginateItems(page: number) {
    this.currentPage = page;
    /* const startIndex = (page - 1) * this.countPerPage; // Default items per page
    const endIndex = startIndex + this.countPerPage; */
    //this.paginatedItems = this.allItems.slice(startIndex, endIndex);
    this.onGetData();
  }
  onGetData() {
    const page = (this.currentPage - 1);
    const size = (this.countPerPage);

    // Convert the object values to an array
    const arr_data = //Object.entries
      (this.before_filteredTransactions);


    // Store the original array for recovery
    const originalTransactions = [...arr_data]; // Create a copy of the original array

    // Calculate the start and end indices for slicing
    const startIndex = page * size; // Starting index
    const endIndex = startIndex + size; // Ending index

    // Create the new array based on pagination
    this.filteredTransactions = //Object.fromEntries
      (arr_data.slice(startIndex, endIndex));

  }
}
