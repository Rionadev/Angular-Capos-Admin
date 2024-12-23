import { Component, OnInit } from '@angular/core';

// Declare the TableRow interface outside of the component
export interface TableRow {
  id: number;
  reference: string;
  customer: string;
  total: string;
  payment: string;
  status: string;
  paymentstatus	: string;
}

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})

export class OrdersComponent implements OnInit {
  
  rows: TableRow[] = [
    { id: 1, reference: 'ORD001', customer: 'John Doe', total: '$100.00', payment: 'Credit Card', status: 'Completed', paymentstatus: 'Paid' },
    { id: 2, reference: 'ORD002', customer: 'Jane Smith', total: '$200.00', payment: 'PayPal', status: 'Processing', paymentstatus: 'Pending' },
    { id: 3, reference: 'ORD003', customer: 'Alice Johnson', total: '$150.00', payment: 'Bank Transfer', status: 'Cancelled', paymentstatus: 'Refunded' },
    { id: 4, reference: 'ORD004', customer: 'Bob Brown', total: '$250.00', payment: 'Cash', status: 'Pending', paymentstatus: 'Unpaid' },
    { id: 5, reference: 'ORD005', customer: 'Charlie Davis', total: '$300.00', payment: 'Credit Card', status: 'Completed', paymentstatus: 'Paid' },
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
    return { id: 0, reference: '', customer: '', total: '', payment: '', status: '', paymentstatus: '' };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }

}
