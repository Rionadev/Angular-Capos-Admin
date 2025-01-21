import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-saletransaction',
  templateUrl: './saletransaction.component.html',
  styleUrls: ['./saletransaction.component.scss']
})
export class SaletransactionComponent implements OnInit {
  selTransactions: any;
  isshowedit = false;
  currentDeleteID = '';
  isDeleteModal = false;
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

    sevenDaysAgo.setDate(today.getDate() - 30); // Subtract 7 days
    oneDayAfter.setDate(today.getDate() + 1); // Subtract 7 days


    this.selectedDateFrom = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.selectedDateTo = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
  }
  ngOnInit(): void {
    this.setDateFromTo();
    this.fetchSearchItems();
  }
  formatDate(temp: Date): string {
    const date = new Date(temp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // 'yyyy-MM-dd'
  }
  fetchSearchItems() {
    // this.http.get<any[]>(`${environment.apiUrl}/sale/getSearchItem`).subscribe(data => {

    // });
    const params = {
      from: this.selectedDateFrom,
      to: this.selectedDateTo,
      sale_status: 'all_closed',
    };

    // Log the params to check their structure

    this.customerService.fetchSaleHistory(params).subscribe(
      (res) => {
        this.customers = [];
        this.sale_status = [];
        this.users = [];
        this.transactions = res.map(item => {

          if (item.customer && item.customer.email) {
            const customerEmail = item.customer?.email;
            if (customerEmail) {
              const customerExists = this.customers.some(
                customer => customer.value === customerEmail
              );

              if (!customerExists) {
                this.customers.push({
                  value: customerEmail,
                  label: item.customer.name
                    ? `${item.customer.name} (${customerEmail})`
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
          // return {
          //   date: new Date(item.created_at).toISOString().split('T')[0], // Format date to 'YYYY-MM-DD'
          //   receipt: item.sale_number, // Receipt number
          //   user: `${item.user_id.first_name} ${item.user_id.last_name}`, // Full name of user
          //   user_email: item.user_id.email, // Email of user
          //   register: item.register.name, // Register name
          //   customer: item.customer.name || '', // Customer name
          //   customer_email: item.customer.email || '', // Customer email
          //   status: item.sale_status, // Sale status
          //   total: item.total, // Total amount
          // };
        });
        this.transactions = res;

        this.filteredTransactions = [...this.transactions];

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

  editRow(row: any): void {
    this.selTransactions = row;
    this.isshowedit = true;
  }
  searchTransactions() {

    this.filteredTransactions = this.transactions.filter(transaction => {
      const customerMatches = this.selectedCustomer === 'all' || transaction.customer.email === this.selectedCustomer;
      const userMatches = this.selectedUser === 'all' || transaction.user_id.email === this.selectedUser;
      const statusMatches = this.selectedStatus === 'all' || transaction.sale_status === this.selectedStatus;

      return customerMatches && userMatches && statusMatches;
    });

  }

  clearFilters() {
    this.selectedCustomer = 'all';
    this.selectedUser = 'all';
    this.selectedStatus = 'all';
    // this.setDateFromTo();

    this.filteredTransactions = [...this.transactions]; // Reset to original transactions
  }

  showDeleteModal(id: string) {
    this.currentDeleteID = id;
    this.isDeleteModal = true;
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  deleteRow() {
    this.customerService.deletesaletransaction({ _id: this.currentDeleteID }).subscribe({
      next: (data) => {
        this.fetchSearchItems()

        this.isDeleteModal = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
    this.isDeleteModal = false;
    /* this.rows = this.rows.filter((row) => row.id !== this.currentDeleteID); // Remove row by id
    this.isDeleteModal = false; */
  }

  onClose() {
    this.isshowedit = false;
  }

  onSave() {
    console.log(this.selTransactions);
    this.customerService.updatesaletransaction({
      _id: this.selTransactions._id,
      sale_status: this.selTransactions.sale_status
    }).subscribe({
      next: (data) => {
        this.fetchSearchItems()

        this.isDeleteModal = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
    this.isshowedit = false;
    this.onClose();
  }

}