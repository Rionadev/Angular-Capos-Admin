import { Component, OnInit } from '@angular/core';

// Declare the TableRow interface outside of the component
export interface TableRow {
  id: number;
  parent: string;
  name: string;
  subcollections: string;
  products: string;
  active: boolean;
}

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})

export class CollectionsComponent implements OnInit {

  rows: TableRow[] = [
    { id: 1, parent: 'Parent A', name: 'John Doe', subcollections: 'Subcollection 1', products: 'Product 1', active: true },
    { id: 2, parent: 'Parent B', name: 'Jane Smith', subcollections: 'Subcollection 2', products: 'Product 2', active: false },
  ];

  isContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();
  cities: string[] = ['London', 'New York', 'Paris', 'Tokyo'];
  selectedCity: string = 'London'; // Default selected value
  
  constructor() {}

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
  }

  toggleContent(): void {
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
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
    this.isContentVisible = false;
  }

  editRow(row: TableRow): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isContentVisible = true;
  }

  deleteRow(id: number): void {
    this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id
    this.isContentVisible = false;
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  private resetRow(): TableRow {
    return { id: 0, parent: '', name: '', subcollections: '', products: '', active: false };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }

}
