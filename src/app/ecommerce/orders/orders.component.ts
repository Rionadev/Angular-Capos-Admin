import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../api/orders/orders.service';
import { CountriesService } from '../../api/countries/countries.service';
import { ToastService } from '../../component/toast/toast.service';

// Declare the TableRow interface outside of the component
export interface TableRow {
  _id: string;
  reference: string;
  customer: any;
  total: string;
  payment: string;
  status: string;
  payment_status: string;
  status_history: any;
  payment_status_history: any;
  payments: any;
  register: any;
  products: any;
  outlet: any;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {

  data: any[] = [];
  countries: any[] = [];
  products: any[] = [];

  isContentVisible: boolean = false; // Initially hidden for add or editing.
  isEditContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();
  currentEditRow: TableRow = this.resetRow();

  selectedItemId: number | null = null; // Variable to track which row is expanded

  // Search Items
  orders: { name: string, value: string }[] = [{ name: "All Order Status", value: '' }, { name: "Awaiting Payment", value: 'awaiting_payment' }, { name: "Allocated", value: 'allocated' }, { name: "Shipped", value: 'shipped' }, { name: "Quote", value: 'quote' }];
  status: string = ''; // Default selected value

  payments: { name: string, value: string }[] = [{ name: "All Payment Status", value: '' }, { name: "Partically Paid", value: 'part_paid' }, { name: "Fully Paid", value: 'full_paid' }, { name: "Not Paid", value: 'not_paid' }];
  payment: string = ''; // Default selected value

  order: string = '';
  customer: string = '';

  start: string = '';
  end: string = '';

  // Edit Variables
  //orders.slice(1);
  ordersEdit: { name: string, value: string }[] = [{ name: "Awaiting Payment", value: 'awaiting_payment' }, { name: "Allocated", value: 'allocated' }, { name: "Shipped", value: 'shipped' }, { name: "Quote", value: 'quote' }];
  paymentsEdit: { name: string, value: string }[] = [{ name: "Partically Paid", value: 'part_paid' }, { name: "Fully Paid", value: 'full_paid' }, { name: "Not Paid", value: 'not_paid' }];
  payments_date: string = new Date().toISOString().split('T')[0];
  payments_type: string = '';
  payments_amount: number = 0;

  constructor(
    private ordersService: OrdersService,
    private countriesService: CountriesService,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
    this.onGetData();
    this.onClearFilters();
    this.onGetCountries();
  }

  onGetCountries() {
    this.countriesService.read({}).subscribe({
      next: (data) => {
        console.log(data);
        this.countries = data;
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
      },
    });
  }

  onGetData() {
    this.ordersService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  onToUpperCase(input: string): string {
    // Split the string by underscores, capitalize each word, and join with spaces
    return input
      .split('_') // Split into parts based on '_'
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words with spaces
  }

  getClass(status: string): string {
    switch (status) {
      case 'not_paid':
        return 'bg-red';
      case 'full_paid':
        return 'bg-green';
      case 'allocated':
        return 'bg-blue';
      case 'not_allocated':
        return 'bg-red';
      default:
        return ''; // Default class if status doesn't match
    }
  }

  getDate(dateTimeString: string): string {
    // Split the string by 'T' and return the first part (date)
    return dateTimeString.split("T")[0];
  }

  getTime(dateTimeString: string): string {
    // Split the string by 'T', then split the second part by '.' and return the first part (time)
    return dateTimeString.split("T")[1].split(".")[0];
  }

  toggleDetails(itemId: number): void {
    console.log(itemId);
    this.selectedItemId = this.selectedItemId === itemId ? null : itemId; // Toggle selection //this.selectedItemId === itemId ? null : 
  }

  toggleProductContent(): void {
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
    this.isEditContentVisible = false;
  }

  toggleImportContent(): void {
    this.isEditContentVisible = !this.isEditContentVisible; // Toggle the visibility
    this.isContentVisible = false;
  }

  saveRow(): void {
    /*  if (this.currentRow.id) {
       // Update existing row
       const index = this.rows.findIndex((row) => row.id === this.currentRow.id);
       if (index !== -1) {
         this.rows[index] = { ...this.currentRow }; // Update row
       }
     } else {
       // Add new row
       this.rows.push({
         ...this.currentRow,
         id: this.generateId(),
       });
     } */
    this.currentRow.payments = this.currentEditRow.payments;
    this.currentRow.payment_status_history = this.currentEditRow.payment_status_history;
    this.currentRow.status_history = this.currentEditRow.status_history;

    this.currentRow.payment_status = this.currentEditRow.payment_status_history[this.currentEditRow.payment_status_history.length - 1].status;
    this.currentRow.status = this.currentEditRow.status_history[this.currentEditRow.status_history.length - 1].status;

    this.currentRow.register = this.currentRow.register._id;
    this.currentRow.outlet = this.currentRow.outlet._id;
    this.currentRow.products = this.currentEditRow.products.map(item => {
      if (item.product_id && item.product_id._id) {
        return {
          ...item,
          product_id: item.product_id._id
        };
      }
      return item;
    });

    this.ordersService.update(this.currentRow).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.onGetData();
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
    this.cancelEdit();  
  }

  // Edit functions
  onAdd(param: string) {
    console.log(param);
    if (param == 'order_status')
      this.currentEditRow.status_history.push({status: this.currentEditRow.status, created_at: new Date().toISOString()})
    else if (param == 'payment_status')
      this.currentEditRow.payment_status_history.push({status: this.currentEditRow.payment_status, created_at: new Date().toISOString()})
    else if (param == "payments")
      this.currentEditRow.payments.push({created_at: this.payments_date, type: this.payments_type, amount: this.payments_amount})
  }

  detailRow(row: TableRow): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isContentVisible = true;
  }

  editRow(row: TableRow): void {
    this.currentEditRow = { ...row }; // Clone the row to avoid direct edits
    this.currentRow.customer.billing_address.country = this.currentRow.customer.billing_address.country || this.currentRow.customer.billing_address.country?._id;
    this.currentRow.customer.shipping_address.country = this.currentRow.customer.shipping_address.country || this.currentRow.customer.shipping_address.country?._id;
    this.isEditContentVisible = true;
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
    this.currentEditRow = this.resetRow();
    this.isContentVisible = false;
    this.isEditContentVisible = false;
  }

  private resetRow(): any {
    return {
      status_history: [],
      payments: [],
      payment_status_history: [],
      customer: {
        shipping_address: {
          country: null,
        },
        billing_address: {
          country: null,
        },
      },
    };
  }

  /* private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  } */

  onSearch() {
    //type, outlet, supplier, date_from, date_to, due_from, due_to, keyword, 
    this.ordersService.read({
      date_from: this.start,
      date_to: this.end,
      keyword: this.order,
    }).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  onClearFilters() {
    const today = new Date();
    this.start = today.toISOString().split('T')[0];
    this.status = '';
    this.payment = '';
    this.order = '';
    this.customer = '';
    this.end = today.toISOString().split('T')[0];
  }
}

/* this.toastService.showToast('This is a success message!', 'success', 3000);
    this.toastService.showToast('This is a info message!', 'info', 3000);
    this.toastService.showToast('This is a warning message!', 'warning', 3000);
    this.toastService.showToast('This is a error message!', 'error', 3000); */