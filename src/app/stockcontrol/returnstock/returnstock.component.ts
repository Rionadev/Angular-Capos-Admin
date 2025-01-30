import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StockService } from 'app/api/stockcontrol/api.service';
import { ToastService } from 'app/component/toast/toast.service';

@Component({
  selector: 'app-returnstock',
  templateUrl: './returnstock.component.html',
  styleUrls: ['./returnstock.component.scss']
})
export class ReturnstockComponent implements OnInit {

  selectedSupplier: string = '';
  outlets: any = [];
  newOrder: any;
  suppliers: any;

  selectedOutletTo: string;
  selectedOutletFrom: string;
  deliveryDate: string;
  sel_invoiceNumber: number;
  returnNumber: string;
  note: string;


  //product search
  keyword: string = '';
  filteredProducts: any = [];
  constructor(
    private stockService: StockService,
    private toastService: ToastService,
    private router: Router,

  ) { }
  initVar(): void {

    this.selectedSupplier = '';
    this.selectedOutletTo = '';
    this.sel_invoiceNumber = 0;

    this.returnNumber = this.generateRandomNumberBasedOnDate();
    this.deliveryDate = new Date().toISOString().split('T')[0];
    this.note = '';
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
      status: 'closed',
      type: 'return'
      // type: 'purchase' // Default type
    };
  }
  ngOnInit(): void {
    this.initVar();
    this.fetchSearchItems();
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
  fetchSearchItems() {
    this.stockService.fetchOutlet().subscribe(
      (res) => {
        this.outlets = [...res];
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
    this.stockService.fetchSupplier().subscribe(
      (res) => {
        this.suppliers = [...res];
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
  generateRandomNumberBasedOnDate() {
    const today = new Date();
    const datePart = today.toISOString().slice(0, 10).replace(/-/g, '').slice(2); // YYMMDD format
    const randomPart = Math.floor(Math.random() * 100); // Random number between 0 and 99

    // Combine date part with random part
    return datePart + String(randomPart).padStart(2, '0'); // Ensure random part is 2 digits
  }
  returnStock() {
    // if (this.selectedSupplier != '') {
    // }
    this.newOrder.supplier = this.selectedSupplier;
    this.newOrder.deliver_to = this.selectedOutletTo;
    this.newOrder.invoice_number = this.sel_invoiceNumber;
    this.newOrder.delivery_date = this.deliveryDate;
    this.newOrder.order_number = this.returnNumber;
    this.newOrder.note = this.note;
    console.log(this.newOrder);
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
          res.result.products.forEach(element => {
            this.updateInventory(
              element.product_id,
              element.qty,
            )
          });
          this.initVar();
        },
        (error) => {
          console.error('Error fetching customer data:', error);
          // Handle the error as needed
        }
      );
    }
  }
  updateInventory(product_id: string, qty: number) {
    const params = {
      product_id: product_id,
      qty: qty,
    }
    this.stockService.updateProductInventory(params).subscribe(
      (res) => {
        this.router.navigate(['/stockcontrol/manageorders']);

      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  reset() {

  };
  cancelReturnStock() {
    this.initVar();

  }
}