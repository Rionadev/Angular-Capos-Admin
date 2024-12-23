import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventoryreports',
  templateUrl: './inventoryreports.component.html',
  styleUrls: ['./inventoryreports.component.scss']
})
export class InventoryreportsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  searchTerm: string = '';
    
  products = [
      // Sample product data
      { product: 'Product A', outlet: 'Outlet 1', currentStock: 50, itemValue: 20, stockValue: 1000, reorderPoint: 10, reorderAmount: 20 },
      { product: 'Product B', outlet: 'Outlet 2', currentStock: 30, itemValue: 15, stockValue: 450, reorderPoint: 5, reorderAmount: 15 },
      { product: 'Product C', outlet: 'Outlet 1', currentStock: 20, itemValue: 25, stockValue: 500, reorderPoint: 8, reorderAmount: 10 },
      // Add more sample data as needed
  ];

  filteredProducts = [...this.products];

  searchProducts() {
      this.filteredProducts = this.products.filter(item => {
          const productMatch = item.product.toLowerCase().includes(this.searchTerm.toLowerCase());
          const outletMatch = item.outlet.toLowerCase().includes(this.searchTerm.toLowerCase());
          return productMatch || outletMatch;
      });
  }
}