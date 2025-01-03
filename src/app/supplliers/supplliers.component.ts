import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  description: string;
  markup: number;
  product: string;
}

@Component({
  selector: 'app-supplliers',
  templateUrl: './supplliers.component.html',
  styleUrls: ['./supplliers.component.scss']
})
export class SupplliersComponent implements OnInit {
  rows: Product[] = [];
  currentRow: Product = { id: null, name: '', description: '', markup: 0, product: '' };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  paginatedRows: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor() { }

  ngOnInit(): void {
    this.rows = [
      { id: 1, name: 'Product 1', description: 'Description 1', markup: 50, product: 'Product A' },
      { id: 2, name: 'Product 2', description: 'Description 2', markup: 54, product: 'Product B' },
      { id: 3, name: 'Product 3', description: 'Description 3', markup: 3, product: 'Product C' },
      { id: 4, name: 'Product 4', description: 'Description 4', markup: 30, product: 'Product D' },
      { id: 5, name: 'Product 5', description: 'Description 5', markup: 59, product: 'Product E' },
      { id: 6, name: 'Product 6', description: 'Description 6', markup: 97, product: 'Product F' },
      // Add more products as needed
    ];
    this.filterRows(); // Initialize pagination
  }
  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  openEditModal(row: Product) {
    this.currentRow = { ...row };
    // $('#editModal').show();
  }

  editRow(row: any) {
    // Set the row to editing mode
    row.isEditing = true;
  }

  saveRow(row: any) {
    // Save changes (you can add your save logic here)
    row.isEditing = false; // Exit editing mode
  }

  cancelEdit(row: any) {
    // Reset the row to its original state
    // Here we would typically reload the original data from a service or store
    row.isEditing = false; // Exit editing mode
  }

  deleteRow(id: number) {
    // Logic to delete the row
    this.paginatedRows = this.paginatedRows.filter(row => row.id !== id);
  }

  filterRows() {
    const filtered = this.rows.filter(row =>
      row.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      row.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.currentPage = 1; // Reset to first page
    this.paginate(filtered);
  }

  paginate(filteredRows: Product[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedRows = filteredRows.slice(start, start + this.itemsPerPage);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  get totalPages(): number {
    return Math.ceil(this.rows.length / this.itemsPerPage);
  }

  updatePagination() {
    this.filterRows(); // Reapply filtering to ensure correct pagination
  }

}
