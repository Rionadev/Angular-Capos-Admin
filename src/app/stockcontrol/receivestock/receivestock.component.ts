import { Component, OnInit } from '@angular/core';
import { StockService } from 'app/api/stockcontrol/api.service';
interface Transaction {
  name: string;
  email: string;
  group: string;
  storeCredit: number;
  balance: number;
  points: number;
  country: string;
}
@Component({
  selector: 'app-receivestock',
  templateUrl: './receivestock.component.html',
  styleUrls: ['./receivestock.component.scss']
})
export class ReceivestockComponent implements OnInit {

  selectedSupplier: string = '';
  outlets: any = [];
  newOrder: any;
  suppliers: any;

  selectedOutletTo: string;
  selectedOutletFrom: string;
  deliveryDate: string;
  returnNumber: string;


  //product search
  keyword: string = '';
  filteredProducts: any = [];
  constructor(
    private stockService: StockService,
  ) { }
  initVar(): void {
    this.returnNumber = this.generateRandomNumberBasedOnDate();
    this.deliveryDate = new Date().toISOString().split('T')[0];
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
      return total + (product.qty * product.supply_price);
    }, 0);
  }
  generateRandomNumberBasedOnDate() {
    const today = new Date();
    const datePart = today.toISOString().slice(0, 10).replace(/-/g, '').slice(2); // YYMMDD format
    const randomPart = Math.floor(Math.random() * 100); // Random number between 0 and 99

    // Combine date part with random part
    return datePart + String(randomPart).padStart(2, '0'); // Ensure random part is 2 digits
  }
}