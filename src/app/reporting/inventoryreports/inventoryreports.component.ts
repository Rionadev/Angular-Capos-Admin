import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-inventoryreports',
  templateUrl: './inventoryreports.component.html',
  styleUrls: ['./inventoryreports.component.scss']
})
export class InventoryreportsComponent implements OnInit {

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.fetchSearchItems();
  }

  searchTerm: string = '';

  products: any;

  filteredProducts: any;

  searchProducts() {
    this.filteredProducts = this.products.filter(item => {
      const productMatch = item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      const outletMatch = item.outlet?.name.toLowerCase().includes(this.searchTerm.toLowerCase());
      return productMatch || outletMatch;
    });
  }
  fetchSearchItems() {
    this.customerService.fetchProducts().subscribe(
      (res) => {
        this.products = res;
        this.filteredProducts = [...this.products];
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
}