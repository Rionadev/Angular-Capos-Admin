import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../api/products/api.service';

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


  data: any[] = [];

  isProductContentVisible: boolean = false; // Initially hidden for add or editing.
  isImportContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();
  selectedItemId: number | null = null; // Variable to track which row is expanded

  cities: string[] = ['Search', 'Search 1', 'Search 2', 'Search 3'];
  selectedCity: string = 'Search'; // Default selected value
  
  // Pagination
  totalItems: number = 100; // Total number of items
  allItems: number[] = Array.from({ length: 100 }, (_, i) => i + 1); // Example data
  paginatedItems: number[] = [];
  countPerPage: number = 10; // Default items per page

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
    this.onGetData();
    this.paginateItems(1); // Initialize pagination
  }

  onGetData() {
    this.productsService.read({range: 'all-factor'}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
  }

  getDate(dateTimeString: string): string {
    // Split the string by 'T' and return the first part (date)
    return dateTimeString.split("T")[0];
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
    /* if (this.currentRow.id) {
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
    /* this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id
    this.isProductContentVisible = false; */
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
    this.isProductContentVisible = false;
  }

  private resetRow(): any {
    return {};
  }

  onPageChanged(page: number) {
    this.paginateItems(page);
  }

  onCountPerPageChanged(count: number) {
    this.countPerPage = count; // Update count per page
    this.paginateItems(1);
  }

  paginateItems(page: number) {
    const startIndex = (page - 1) * this.countPerPage; // Default items per page
    const endIndex = startIndex + this.countPerPage;
    this.paginatedItems = this.allItems.slice(startIndex, endIndex);
  }

}
