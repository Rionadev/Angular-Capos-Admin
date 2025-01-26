import { Component, OnInit } from '@angular/core';
import { StockService } from 'app/api/stockcontrol/api.service';
import { ToastService } from 'app/component/toast/toast.service';

@Component({
  selector: 'app-manageorders',
  templateUrl: './manageorders.component.html',
  styleUrls: ['./manageorders.component.scss']
})
export class ManageordersComponent implements OnInit {

  totalItems: number = 100; // Total number of items
  countPerPage: number = 10; // Default items per page
  currentPage: number = 1;
  sel_row: any;

  before_Page_Filtered: any;
  isOrderModal = false;
  keyword = '';
  filteredProducts = [];
  newOrder: any;
  orderData: any;


  isShowdetailflag = false;
  total_items = 0;
  total_cost = 0;
  ngOnInit(): void {
    this.searchByIndex();
    this.setDateFromTo();
    this.reset();
    this.fetchSearchItems();

  }
  selectOption(type: string, value: string): void {
    this.newOrder[type] = value;
    console.log(this.newOrder);
  }
  constructor(
    private stockService: StockService,
    private toastService: ToastService,
  ) { }

  ordersTypes: any;
  outlets: any;
  suppliers: any;

  productOutlets: any;
  productSuppliers: any;

  searchInvoice: string = '';
  selectedOrderType: string = '';
  selectedOutlet: string = '';
  selectedSupplier: string = '';
  createdAtStart: string | null = null;
  createdAtEnd: string | null = null;
  dueDateStart: string | null = null;
  dueDateEnd: string | null = null;


  setDateFromTo() {
    this.orderData = [];
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    const oneDayAfter = new Date(today);

    sevenDaysAgo.setDate(today.getDate() - 7); // Subtract 7 days
    oneDayAfter.setDate(today.getDate() + 1); // Subtract 7 days


    this.createdAtStart = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.createdAtEnd = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today

    this.dueDateStart = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.dueDateEnd = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
  }

  beforeFiltered: any;
  // Method to filter rows based on the criteria
  filterRows() {
    this.before_Page_Filtered = this.beforeFiltered.filter(row => {
      // console.log(row.deliver_to._id);
      const matchesInvoice = !this.searchInvoice || row.invoice_number.includes(this.searchInvoice);
      const matchesOrderNumber = !this.searchInvoice || row.order_number.includes(this.searchInvoice);
      const matchesOrderType = !this.selectedOrderType || row.type == this.selectedOrderType;
      const matchesOutlet = (!this.selectedOutlet || !row.deliver_to) || row.deliver_to._id == this.selectedOutlet;
      const matchesSupplier = (!this.selectedSupplier || !row.supplier) || row.supplier._id == this.selectedSupplier;

      return matchesOrderType && matchesOutlet && matchesSupplier && (matchesInvoice || matchesOrderNumber);
      //  && matchesCreatedAt && matchesDueDate;
    });
    this.totalItems = this.before_Page_Filtered.length;
    this.onGetData();
    this.getTotal();

  }
  searchByIndex() {
    this.productOutlets = [{ _id: '', name: '' }];
    this.productSuppliers = [{ _id: '', description: '' }];
    //fetchOutlet
    this.stockService.fetchOutlet().subscribe(
      (res) => {
        this.outlets = [...res];
        this.productOutlets = [...this.productOutlets, ...res];

      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
    this.stockService.fetchSupplier().subscribe(
      (res) => {
        this.suppliers = [...res];
        this.productSuppliers = [...this.productSuppliers, ...res];
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  fetchSearchItems() {
    let params: any = {
      date_from: this.createdAtStart,
      date_to: this.createdAtEnd,
      due_from: this.dueDateStart,
      due_to: this.dueDateEnd,
    };
    if (this.selectedOrderType != '') {
      params = {
        ...params,
        type: this.selectedOrderType,
      };
    }
    if (this.selectedOutlet != '') {
      params = {
        ...params,
        outlet: this.selectedOutlet,
      };
    }
    if (this.selectedSupplier != '') {
      params = {
        ...params,
        supplier: this.selectedSupplier,
      };
    }
    if (this.searchInvoice != '') {
      params = {
        ...params,
        kewyword: this.searchInvoice,
      };
    }

    this.stockService.readOrderProduct(params).subscribe(
      (res) => {
        // this.orderData = res;
        this.beforeFiltered = res;
        this.before_Page_Filtered = res;
        this.getTotal();
        this.onGetData();
        this.totalItems = res.length;
        console.log(this.total_cost);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  calcItemCount(products: any): number {
    let count = 0;
    products?.forEach(element => {
      count += element.qty;
    });
    return count
  }
  clearFilters() {
    this.searchInvoice = '';
    this.selectedOrderType = '';
    this.selectedOutlet = '';
    this.selectedSupplier = '';
    this.setDateFromTo();
    this.fetchSearchItems();
    // this.filterRows(); // Reapply filter to reset the displayed rows
    // this.orderData = this.beforeFiltered;
    this.before_Page_Filtered = this.beforeFiltered;
    this.totalItems = this.beforeFiltered.length;
    this.onGetData();
  }

  updatePagination() {
    // Logic to update currentPage and totalPages based on filteredRows
  }
  calcProductCost(products: any): number {

    return products?.reduce((total, row) => total + row.supply_price * row.qty, 0);
  }
  getTotal(): void {
    this.total_items = 0;
    this.total_cost = 0;

    this.before_Page_Filtered?.forEach(element => {
      element.products.forEach(el => {
        this.total_items += el.qty;
        this.total_cost += el.qty * el.supply_price;
      });
    });
  }


  // Other methods...
  showModal(): void {
    this.reset();
    this.isOrderModal = true;
    this.newOrder.order_number = this.generateRandomNumberBasedOnDate();
    this.seletedRow = null;

  }
  saveOrder() {
    if (this.newOrder.supplier == '' ||
      this.newOrder.deliver_to == '' ||
      this.newOrder.products.length == 0
    ) {
      this.toastService.showToast('Please fill in all required fields.', 'warning', 3000);
      return;
    } else {
      console.log(this.newOrder);
      this.newOrder.type = 'purchase';
      this.newOrder.status = 'open';

      if (this.seletedRow) {
        this.stockService.updateorderProduct(this.newOrder).subscribe(
          (res) => {
            this.reset();
            this.fetchSearchItems();
            this.closeModal();
          },
          (error) => {
            console.error('Error fetching customer data:', error);
            // Handle the error as needed
          }
        );
      } else {
        // console.log('--------------new---------------');
        this.stockService.orderProduct(this.newOrder).subscribe(
          (res) => {
            this.reset();
            this.fetchSearchItems();
            this.closeModal();
          },
          (error) => {
            console.error('Error fetching customer data:', error);
            // Handle the error as needed
          }
        );
      }
      // return;


    }
  }
  receiveOrder() {
    if (this.newOrder.supplier == '' ||
      this.newOrder.deliver_to == '' ||
      this.newOrder.products.length == 0
    ) {
      this.toastService.showToast('Please fill in all required fields.', 'warning', 3000);
      return;
    } else {
      this.newOrder.status = 'closed';
      this.newOrder.type = 'receive';
      console.log(this.newOrder);
      if (this.seletedRow) {
        this.stockService.updateorderProduct(this.newOrder).subscribe(
          (res) => {
            this.reset();
            this.fetchSearchItems();
            this.closeModal();
            res.result.products.forEach(element => {
              this.updateInventory(
                element.product_id,
                element.qty,
              )
            });
          },
          (error) => {
            console.error('Error fetching customer data:', error);
            // Handle the error as needed
          }
        );
      } else {
        // console.log('--------------new---------------');
        this.stockService.orderProduct(this.newOrder).subscribe(
          (res) => {
            this.reset();
            this.fetchSearchItems();
            this.closeModal();
            res.result.products.forEach(element => {
              this.updateInventory(
                element.product_id,
                element.qty,
              )
            });
          },
          (error) => {
            console.error('Error fetching customer data:', error);
            // Handle the error as needed
          }
        );
      }

    }
  }
  updateInventory(product_id: string, qty: number) {
    const params = {
      product_id: product_id,
      qty: -qty,
    }
    this.stockService.updateProductInventory(params).subscribe(
      (res) => {
        this.reset();
        this.fetchSearchItems();
        this.closeModal();
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  closeModal(): void {
    this.isOrderModal = false;
  }
  generateRandomNumberBasedOnDate() {
    const today = new Date();
    const datePart = today.toISOString().slice(0, 10).replace(/-/g, '').slice(2); // YYMMDD format
    const randomPart = Math.floor(Math.random() * 100); // Random number between 0 and 99

    // Combine date part with random part
    return datePart + String(randomPart).padStart(2, '0'); // Ensure random part is 2 digits
  }
  reset(): void {
    this.newOrder = {
      // user_id: null, // Assuming user_id will be set later
      // private_web_address: '', // Add appropriate value if needed
      order_number: '', // String representation of the order number
      deliver_to: '', // Assuming deliver_to will be set later (Outlet ID)
      supplier: '', // Supplier ID (ObjectId)
      invoice_number: '', // Default as an empty string
      delivery_date: new Date().toISOString().split('T')[0],//null, // Date object or null
      note: '', // Any notes related to the order
      // status: 'open', // Default status
      products: [], // Array of product objects
      // type: 'purchase' // Default type
    };
  }
  searchProduct() {
    console.log(this.keyword);
    this.stockService.fetchProduct(this.keyword).subscribe(
      (res) => {
        this.filteredProducts = res;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  selectProduct(product: any): void {
    this.keyword = product.name; // Set the input to the selected product name
    this.filteredProducts = []; // Clear the filtered products
    const productExists = this.newOrder.products.some(item => item.product_id === product._id);
    if (productExists) return;
    console.log(product.name, product.price);
    this.newOrder.products.push({
      product_name: product.name,
      supply_price: product.retail_price,
      qty: 1,
      inventory: product.inventory,
      product_id: product._id,
      variant_id: '',
      tax: product.tax,
    });
    console.log(this.newOrder);
  }
  deleteproduct(delrow: any): void {
    console.log(delrow);
    this.newOrder.products = this.newOrder.products.filter(product => product.product_id !== delrow.product_id);
  }

  // Method to calculate total cost
  calcCost(): number {
    return this.newOrder.products.reduce((total, product) => {
      // console.log(product);
      return total + (product.qty * product.supply_price *
        (100 + product.tax?.rate || 0) / 100
      );
    }, 0);
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

    this.onGetData();
  }
  onGetData() {
    const page = (this.currentPage - 1);
    const size = (this.countPerPage);

    const startIndex = page * size; // Starting index
    const endIndex = startIndex + size; // Ending index

    // Create the new array based on pagination
    this.orderData = this.before_Page_Filtered.slice(startIndex, endIndex);
  }
  seletedRow: any;
  selectRow(row: any) {
    this.seletedRow = row;
    if (row.status == 'open') {
      this.newOrder = {
        order_number: row.order_number, // String representation of the order number
        deliver_to: row.deliver_to._id, // Assuming deliver_to will be set later (Outlet ID)
        supplier: row.supplier._id, // Supplier ID (ObjectId)
        invoice_number: row.invoice_number, // Default as an empty string
        delivery_date: new Date().toISOString().split('T')[0],//null, // Date object or null
        note: row.note,
        products: row.products, // Array of product objects,
        status: 'closed',
        type: 'receive',
        field: 'all',
        _id: row._id,

      };
      console.log(this.newOrder);
      this.isOrderModal = true;
    } else {
      console.log('--seletedRow------', this.seletedRow);
      this.isShowdetailflag = true;
    }
  }
  formatedDate(date: any) {
    const fdate = new Date(date);
    return fdate.toISOString().split('T')[0];
  }
  updateOrder() {
    if (this.newOrder.supplier == '' ||
      this.newOrder.deliver_to == '' ||
      this.newOrder.products.length == 0
    ) {
      this.toastService.showToast('Please fill in all required fields.', 'warning', 3000);
      return;
    } else {
      // console.log(this.newOrder);
      this.stockService.updateorderProduct(this.newOrder).subscribe(
        (res) => {
          this.reset();
          this.fetchSearchItems();
          this.closeModal();
        },
        (error) => {
          console.error('Error fetching customer data:', error);
          // Handle the error as needed
        }
      );
    }
  }
  onBackdropClick() {
    this.isShowdetailflag = false;
  }
}