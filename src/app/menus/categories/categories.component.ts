import { Component, OnInit } from '@angular/core';

// Declare the TableRow interface outside of the component
export interface TableRow {
  id: number;
  name: string;
  slug: string;
  touch: boolean;
  cigarette: boolean;
  notrevenue: boolean;
  description: string;
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  rows: TableRow[] = [
    { id: 1, name: 'ORD001', slug: 'John Doe', touch: true, cigarette: false, notrevenue: true, description: 'ORD001' },
    { id: 2, name: 'ORD002', slug: 'Jane Smith', touch: false, cigarette: false, notrevenue: true, description: 'ORD001' },
    { id: 3, name: 'ORD003', slug: 'Alice Johnson', touch: true, cigarette: false, notrevenue: true, description: 'ORD001' },
    { id: 4, name: 'ORD004', slug: 'Bob Brown', touch: false, cigarette: false, notrevenue: false, description: 'ORD001' },
    { id: 5, name: 'ORD005', slug: 'Charlie Davis', touch: true, cigarette: false, notrevenue: true, description: 'ORD001' },
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
    return { id: 0, name: '', slug: '', touch: false, cigarette: false, notrevenue: false, description: '' };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }

}
