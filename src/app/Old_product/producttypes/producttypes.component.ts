import { Component, OnInit } from '@angular/core';

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  products: string;
  touch: boolean;
  cigarette: boolean;
  revenue: boolean;
  isEditing?: boolean; // Add isEditing property
}

@Component({
  selector: 'app-producttypes',
  templateUrl: './producttypes.component.html',
  styleUrls: ['./producttypes.component.scss']
})
export class ProducttypesComponent implements OnInit {
  rows: Product[] = [];
  currentRow: Product = { id: null, name: '', slug: '', description: '', products: '', touch: false, cigarette: false, revenue: false };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  paginatedRows: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  // isEditing:boolean = false;

  ngOnInit() {
    // Load initial data
    this.rows = [
      { id: 1, name: 'Product 1', slug: 'product-1', description: 'Description 1', products: 'Product A', touch: true, cigarette: false, revenue: true },
      { id: 2, name: 'Product 2', slug: 'product-2', description: 'Description 2', products: 'Product B', touch: false, cigarette: true, revenue: false },
      { id: 3, name: 'Product 3', slug: 'product-3', description: 'Description 3', products: 'Product C', touch: true, cigarette: false, revenue: true },
      { id: 4, name: 'Product 4', slug: 'product-4', description: 'Description 4', products: 'Product D', touch: false, cigarette: true, revenue: false },
      { id: 5, name: 'Product 5', slug: 'product-5', description: 'Description 5', products: 'Product E', touch: true, cigarette: false, revenue: true },
      { id: 6, name: 'Product 6', slug: 'product-6', description: 'Description 6', products: 'Product F', touch: false, cigarette: true, revenue: false },
    ];
    this.filterRows(); // Initialize pagination
  }

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
  }

  openEditModal(row: Product) {
    this.currentRow = { ...row };
  }

  editRow(row: Product) {
    row.isEditing = true;
  }

  saveRow(row: Product) {
    row.isEditing = false; // Exit editing mode
  }

  cancelEdit(row: Product) {
    row.isEditing = false; // Exit editing mode
  }

  deleteRow(id: number) {
    this.paginatedRows = this.paginatedRows.filter(row => row.id !== id);
    this.rows = this.rows.filter(row => row.id !== id); // Also remove from the main array
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
