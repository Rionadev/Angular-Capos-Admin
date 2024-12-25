import { Component, OnInit } from '@angular/core';

// Declare the TableRow interface outside of the component
export interface TableRow {
  id: number;
  name: string;
  price: string;
  count: string;
  discount: string;
  addedproducts: string;
  active: boolean;
}

@Component({
  selector: 'app-mix',
  templateUrl: './mix.component.html',
  styleUrls: ['./mix.component.scss']
})

export class MixComponent implements OnInit {

  rows: TableRow[] = [
    { id: 1, name: 'ORD001', price: 'John Doe', count: 'Paid', discount: 'ORD001', addedproducts: 'John Doe', active: true },
    { id: 2, name: 'ORD002', price: 'Jane Smith', count: 'Pending', discount: 'ORD001', addedproducts: 'John Doe', active: false },
    { id: 3, name: 'ORD003', price: 'Alice Johnson', count: 'Refunded', discount: 'ORD001', addedproducts: 'John Doe', active: false },
    { id: 4, name: 'ORD004', price: 'Bob Brown', count: 'Unpaid', discount: 'ORD001', addedproducts: 'John Doe', active: true },
    { id: 5, name: 'ORD005', price: 'Charlie Davis', count: 'Paid', discount: 'ORD001', addedproducts: 'John Doe', active: true },
  ];
  isContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();
  selectedItemId: number | null = null; // Variable to track which row is expanded
  
  constructor() {}

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
  }

  toggleContent(): void {
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
  }

  toggleDetails(itemId: number): void {
    console.log(itemId);
    this.selectedItemId = this.selectedItemId === itemId ? null : itemId; // Toggle selection //this.selectedItemId === itemId ? null : 
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
  }

  editRow(row: TableRow): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
  }

  deleteRow(id: number): void {
    this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
  }

  private resetRow(): TableRow {
    return { id: 0, name: '', price: '', count: '', discount:'', addedproducts: '', active: false };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }
}
