import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';
import { UtilService } from 'app/api/utils/api.service';

@Component({
  selector: 'app-saletransaction',
  templateUrl: './saletransaction.component.html',
  styleUrls: ['./saletransaction.component.scss']
})
export class SaletransactionComponent implements OnInit {

  totalItems: number = 100; // Total number of items
  countPerPage: number = 10; // Default items per page
  currentPage: number = 1;
  before_filteredTransactions: any;

  selTransactions: any;
  isshowedit = false;
  currentDeleteID = '';
  isDeleteModal = false;
  selectedCustomer: string = 'all';
  selectedPayType: string = 'all';
  selectedUser: string = 'all';
  selectedStatus: string = 'all';
  selectedDateFrom: string = '';
  selectedDateTo: string = '';

  customers = [];
  users = [];
  sale_status = [];
  pay_types = [];
  onCustomerChange() {
    // Logic to handle the change in selected customer
    console.log('Selected Customer:', this.selectedCustomer);
  }
  transactions = [];
  // producttype: any;

  filteredTransactions = [...this.transactions];
  constructor(
    private http: HttpClient,
    private customerService: CustomerService,
    private utilservice: UtilService,
  ) { }

  setDateFromTo() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    const oneDayAfter = new Date(today);

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
    const params = {
      start: this.selectedDateFrom,
      end: this.selectedDateTo,
      sale_status: 'all_closed',
    };

    this.customerService.fetchSaleHistory(params).subscribe(
      (res) => {
        this.customers = [];
        this.sale_status = [];
        this.pay_types = [];
        this.users = [];

        this.totalItems = res.length;

        this.transactions = res.map(item => {

          if (item.customer && item.customer?.email) {
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
          if (item.payment_status) {
            const status1 = item.payment_status;
            if (status1) {
              const customerExists = this.pay_types.some(
                status => status.value === status1
              );
              if (!customerExists) {
                this.pay_types.push({
                  value: status1,
                  label: status1
                });
              }
            }
          }

        });
        this.transactions = res;

        // this.filteredTransactions = [...this.transactions];
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
        this.pay_types = [
          { value: 'all', label: 'All Status' },
          ...this.pay_types
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
    console.log(row);
    this.selTransactions = row;
    this.selTransactions.categories = {};
    // let newProductTypes = [];
    if (this.selTransactions.products.length > 0) {
      this.selTransactions.products.forEach(goods => {
        if (goods.product_id && goods.product_id.type) {

          if (!this.selTransactions.categories[goods.product_id.type._id]) {
            this.selTransactions.categories[goods.product_id.type._id] = {
              categoryname: goods.product_id.type.name || '',
              itemCount: 0,
              cost: 0,
            }
          }
          this.selTransactions.categories[goods.product_id.type._id].itemCount += goods.qty;
          this.selTransactions.categories[goods.product_id.type._id].cost += goods.price * goods.qty;
        }
      });
    }
    console.log(this.selTransactions);

    this.isshowedit = true;
  }
  searchTransactions() {
    console.log(this.selectedPayType);
    this.before_filteredTransactions = this.transactions.filter(transaction => {
      const customerMatches = this.selectedCustomer === 'all' || transaction.customer.email === this.selectedCustomer;
      const userMatches = this.selectedUser === 'all' || transaction.user_id.email === this.selectedUser;
      const statusMatches = this.selectedStatus === 'all' || transaction.sale_status === this.selectedStatus;
      const paystatusMatches = this.selectedPayType === 'all' || transaction.payment_status === this.selectedPayType;
      return customerMatches && userMatches && statusMatches && paystatusMatches;
    });
    this.totalItems = this.before_filteredTransactions.length;
    this.onGetData();

  }

  clearFilters() {
    this.selectedCustomer = 'all';
    this.selectedPayType = 'all';
    this.selectedUser = 'all';
    this.selectedStatus = 'all';
    // this.setDateFromTo();

    this.filteredTransactions = [...this.transactions]; // Reset to original transactions
    this.onGetData();

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
    console.log(this.countPerPage);
    console.log(this.currentPage);

    // Convert the object values to an array
    const arr_data = (this.before_filteredTransactions);


    // Store the original array for recovery
    // const originalTransactions = [...arr_data]; // Create a copy of the original array

    // Calculate the start and end indices for slicing
    const startIndex = page * size; // Starting index
    const endIndex = startIndex + size; // Ending index

    // Create the new array based on pagination
    this.filteredTransactions = arr_data.slice(startIndex, endIndex);

  }
}