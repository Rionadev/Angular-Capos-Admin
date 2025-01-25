import { Component, OnInit } from '@angular/core';
import { StockService } from 'app/api/stockcontrol/api.service';
import { ToastService } from 'app/component/toast/toast.service';

@Component({
  selector: 'app-manageorders',
  templateUrl: './manageorders.component.html',
  styleUrls: ['./manageorders.component.scss']
})
export class ManageordersComponent implements OnInit {
  allRows: any;
  isOrderModal = false;
  keyword = '';
  filteredProducts = [];
  newOrder: any;
  orderData: any;


  total_items = 0;
  total_cost = 0;
  ngOnInit(): void {

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

  filteredRows: any;
  currentPage: number = 1;
  totalPages: number = 1;

  setDateFromTo() {
    this.orderData = [];
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    const oneDayAfter = new Date(today);

    sevenDaysAgo.setDate(today.getDate() - 1000); // Subtract 7 days
    oneDayAfter.setDate(today.getDate() + 1); // Subtract 7 days


    this.createdAtStart = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.createdAtEnd = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today

    this.dueDateStart = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.dueDateEnd = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
  }

  // Method to filter rows based on the criteria
  filterRows() {
    this.filteredRows = this.allRows.filter(row => {
      const matchesInvoice = !this.searchInvoice || row.number.includes(this.searchInvoice);
      const matchesOrderType = !this.selectedOrderType || row.type === this.selectedOrderType;
      const matchesOutlet = !this.selectedOutlet || row.from === this.selectedOutlet;
      const matchesSupplier = !this.selectedSupplier || row.from === this.selectedSupplier;

      // const matchesCreatedAt = (!this.createdAtStart || new Date(row.created) >= new Date(this.createdAtStart)) &&
      //   (!this.createdAtEnd || new Date(row.created) <= new Date(this.createdAtEnd));

      // const matchesDueDate = (!this.dueDateStart || new Date(row.dueDate) >= new Date(this.dueDateStart)) &&
      //   (!this.dueDateEnd || new Date(row.dueDate) <= new Date(this.dueDateEnd));

      return matchesInvoice && matchesOrderType && matchesOutlet && matchesSupplier;
      //  && matchesCreatedAt && matchesDueDate;
    });
    this.updatePagination();
  }
  searchByIndex() {
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
        this.orderData = res;
        this.getTotal();
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
    // this.stockService.fetchCustomer().subscribe(
    //   (res) => {
    //     this.customers = [...this.customers, ...res];
    //   },
    //   (error) => {
    //     console.error('Error fetching customer data:', error);
    //     // Handle the error as needed
    //   }
    // );
    this.stockService.readOrderProduct(params).subscribe(
      (res) => {
        this.orderData = res;
        this.getTotal();
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
  }

  updatePagination() {
    // Logic to update currentPage and totalPages based on filteredRows
  }
  calcProductCost(products: any): number {

    return products?.reduce((total, row) => total + row.supply_price * row.qty, 0);
  }
  getTotal(): void {
    this.total_items = 0;
    this.orderData?.forEach(element => {
      element.products.forEach(el => {
        this.total_items += el.qty;
        this.total_cost += el.qty * el.supply_price;
      });
    });
  }


  // Other methods...
  showModal(): void {
    this.isOrderModal = true;
    this.newOrder.order_number = this.generateRandomNumberBasedOnDate();
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

      this.stockService.orderProduct(this.newOrder).subscribe(
        (res) => {
          this.reset();

          this.isOrderModal = false;
          this.clearFilters();
        },
        (error) => {
          console.error('Error fetching customer data:', error);
          // Handle the error as needed
        }
      );
    }
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
      return total + (product.qty * product.supply_price) * (100 + product?.tax?.rate) / 100;
    }, 0);
  }
}