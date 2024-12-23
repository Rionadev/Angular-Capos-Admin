import { Component, OnInit } from '@angular/core';

// Declare the TableRow interface outside of the component
export interface TableRow {
  id: number;
  name: string;
  category: string;
  barcode: string;
  retailprice: string;
  inventory: string;
  active: boolean;
  touch: boolean;
  created: string;
}

@Component({
  selector: 'app-ecommerce-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class EcommerceProductsComponent implements OnInit {


  rows: TableRow[] = [
    { id: 1, name: 'Shielded Heavy', category: 'Category 1', barcode: '123456789', retailprice: '10.00', inventory: '100', active: true, touch: true, created: '2024-01-01' },
    { id: 2, name: 'Jane Smith', category: 'Category 2', barcode: '987654321', retailprice: '20.00', inventory: '50', active: false, touch: false, created: '2024-01-02' },
    { id: 3, name: 'Alice Johnson', category: 'Category 3', barcode: '234567890', retailprice: '15.00', inventory: '75', active: true, touch: false, created: '2024-01-03' },
    { id: 4, name: 'Bob Brown', category: 'Category 4', barcode: '345678901', retailprice: '25.00', inventory: '30', active: true, touch: true, created: '2024-01-04' },
    { id: 5, name: 'Charlie Davis', category: 'Category 5', barcode: '456789012', retailprice: '30.00', inventory: '20', active: false, touch: true, created: '2024-01-05' },
  ];

  isProductContentVisible: boolean = false; // Initially hidden for add or editing.
  isImportContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();
  selectedItemId: number | null = null; // Variable to track which row is expanded

  cities: string[] = ['London', 'New York', 'Paris', 'Tokyo'];
  selectedCity: string = 'London'; // Default selected value
  
  constructor() {}

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
  }

  toggleDetails(itemId: number): void {
    console.log(itemId);
    this.selectedItemId = this.selectedItemId === itemId ? null : itemId; // Toggle selection //this.selectedItemId === itemId ? null : 
  }

  toggleProductContent(): void {
    this.isProductContentVisible = !this.isProductContentVisible; // Toggle the visibility
    this.isImportContentVisible = false;
  }

  toggleImportContent(): void {
    this.isImportContentVisible = !this.isImportContentVisible; // Toggle the visibility
    this.isProductContentVisible = false;
  }

  saveRow(): void {
    if (this.currentRow.id) {
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
    }
    this.currentRow = this.resetRow();
    this.isProductContentVisible = false;
  }

  editRow(row: TableRow): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isProductContentVisible = true;
  }

  deleteRow(id: number): void {
    this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id
    this.isProductContentVisible = false;
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
    this.isProductContentVisible = false;
  }

  private resetRow(): TableRow {
    return { id: 0, name: '', category: '', barcode: '', retailprice: '', inventory: '', active: false, touch: false, created: '' };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }


}
