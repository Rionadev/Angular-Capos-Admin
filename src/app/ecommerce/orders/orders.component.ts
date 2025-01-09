import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../api/orders/orders.service';

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
  
  data: any[] = [];

  isProductContentVisible: boolean = false; // Initially hidden for add or editing.
  isImportContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();
  selectedItemId: number | null = null; // Variable to track which row is expanded

  cities: string[] = ['Search', 'Search 1', 'Search 2', 'Search 3'];
  selectedCity: string = 'Search'; // Default selected value
  
  constructor(private ordersService: OrdersService) {}

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
    this.onGetData();
  }

  onGetData() {
    this.ordersService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  onToUpperCase(input: string): string {
    // Split the string by underscores, capitalize each word, and join with spaces
    return input
      .split('_') // Split into parts based on '_'
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words with spaces
  }

  getClass(status: string): string {
    switch (status) {
      case 'not_paid':
        return 'bg-red';
      case 'full_paid':
        return 'bg-green';
      case 'allocated':
        return 'bg-blue';
      case 'not_allocated':
        return 'bg-red';
      default:
        return ''; // Default class if status doesn't match
    }
  }

  getDate(dateTimeString: string): string {
    // Split the string by 'T' and return the first part (date)
    return dateTimeString.split("T")[0];
  }

  getTime(dateTimeString: string): string {
    // Split the string by 'T', then split the second part by '.' and return the first part (time)
    return dateTimeString.split("T")[1].split(".")[0];
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
   /*  if (this.currentRow.id) {
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
    } */
    this.currentRow = this.resetRow();
    this.isProductContentVisible = false;
  }

  editRow(row: TableRow): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isProductContentVisible = true;
  }

  deleteRow(id: number): void {
    /* this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id */
    this.isProductContentVisible = false;
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
    this.isProductContentVisible = false;
  }

  private resetRow(): any {
    return {};
  }

  /* private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  } */

}
