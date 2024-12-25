import { Component, OnInit } from '@angular/core';

// Declare the TableRow interface outside of the component
export interface TableRow {
  id: number;
  name: string;
  touch: boolean;
  description: string;
}

@Component({
  selector: 'app-modifier-types',
  templateUrl: './modifier-types.component.html',
  styleUrls: ['./modifier-types.component.scss']
})

export class ModifierTypesComponent implements OnInit {


  rows: TableRow[] = [
    { id: 1, name: 'ORD001', touch: true, description: 'ORD001' },
    { id: 2, name: 'ORD002', touch: true, description: 'ORD001' },
    { id: 3, name: 'ORD003', touch: false, description: 'ORD001' },
    { id: 4, name: 'ORD004', touch: true, description: 'ORD001' },
    { id: 5, name: 'ORD005', touch: false, description: 'ORD001' },
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
    return { id: 0, name: '', touch: false, description: '' };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }

}
