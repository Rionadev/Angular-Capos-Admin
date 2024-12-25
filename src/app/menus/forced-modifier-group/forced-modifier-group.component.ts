import { Component, OnInit } from '@angular/core';

// Declare the TableRow interface outside of the component
export interface TableRow {
  id: number;
  groupname: string;
  touch: boolean;
  pizzasizestyle: boolean;
  pizzatopping: boolean;
  pizzafullorhalf: boolean;
}

@Component({
  selector: 'app-forced-modifier-group',
  templateUrl: './forced-modifier-group.component.html',
  styleUrls: ['./forced-modifier-group.component.scss']
})
export class ForcedModifierGroupComponent implements OnInit {

  rows: TableRow[] = [
    { id: 1, groupname: 'ORD001', touch: true, pizzasizestyle: false, pizzatopping: true, pizzafullorhalf: true },
    { id: 2, groupname: 'ORD002', touch: false, pizzasizestyle: false, pizzatopping: true, pizzafullorhalf: false },
    { id: 3, groupname: 'ORD003', touch: true, pizzasizestyle: false, pizzatopping: true, pizzafullorhalf: false },
    { id: 4, groupname: 'ORD004', touch: false, pizzasizestyle: false, pizzatopping: false, pizzafullorhalf: true },
    { id: 5, groupname: 'ORD005', touch: true, pizzasizestyle: false, pizzatopping: true, pizzafullorhalf: true },
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
    return { id: 0, groupname: 'ORD005', touch: false, pizzasizestyle: false, pizzatopping: false, pizzafullorhalf: false  };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }
}
