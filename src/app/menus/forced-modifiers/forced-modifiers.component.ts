import { Component, OnInit } from '@angular/core';

// Declare the TableRow interface outside of the component
export interface TableRow {
  id: number;
  category: string;
  name: string;
  modifier: string;
}

@Component({
  selector: 'app-forced-modifiers',
  templateUrl: './forced-modifiers.component.html',
  styleUrls: ['./forced-modifiers.component.scss']
})
export class ForcedModifiersComponent implements OnInit {

  rows: TableRow[] = [
    { id: 1, category: 'ORD001', name: 'John Doe', modifier: 'Paid' },
    { id: 2, category: 'ORD002', name: 'Jane Smith', modifier: 'Pending' },
    { id: 3, category: 'ORD003', name: 'Alice Johnson', modifier: 'Refunded' },
    { id: 4, category: 'ORD004', name: 'Bob Brown', modifier: 'Unpaid' },
    { id: 5, category: 'ORD005', name: 'Charlie Davis', modifier: 'Paid' },
  ];

  currentRow: TableRow = this.resetRow();
  selectedItemId: number | null = null; // Variable to track which row is expanded
  
  constructor() {}

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
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
    return { id: 0, category: '', name: '', modifier: '' };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }

}
