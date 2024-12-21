import { Component, OnInit } from '@angular/core';
interface Product {
  id: number;
  name: string;
  category: string; // Product Type
  brand: string;
  supplier: string;
  attributes: string; // Comma-separated values for attributes
  tags: string; // Comma-separated values for tags
  status: string; // e.g., "Active", "Inactive"
  Barcode: string;
  retailPrice: number;
  inventory: string;
  active: boolean;
  touch: boolean;
  created: Date;
  isEditing?: boolean; // Add isEditing property
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  rows: Product[] = [];
  currentRow: Product = {
    id: null,
    name: '',
    category: '',
    brand: '',
    supplier: '',
    attributes: '',
    tags: '',
    status: '',
    Barcode: '',
    retailPrice: null,
    inventory: '',
    active: false,
    touch: false,
    created: new Date()
  };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  selectedType: string = ''; // For product type
  selectedBrand: string = ''; // For brand
  selectedSupplier: string = ''; // For supplier
  selectedStatus: string = ''; // For status
  paginatedRows: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {
    // Load initial data
    this.rows = [
      { id: 1, name: 'Product 1', category: 'Type A', brand: 'Brand X', supplier: 'Supplier 1', attributes: 'Attribute 1', tags: 'Tag 1', status: 'Active', Barcode: '123456789', retailPrice: 10.99, inventory: '50', active: true, touch: true, created: new Date() },
      { id: 2, name: 'Product 2', category: 'Type B', brand: 'Brand Y', supplier: 'Supplier 2', attributes: 'Attribute 2', tags: 'Tag 2', status: 'Inactive', Barcode: '987654321', retailPrice: 15.99, inventory: '30', active: false, touch: false, created: new Date() },
      { id: 3, name: 'Product 3', category: 'Type A', brand: 'Brand Z', supplier: 'Supplier 1', attributes: 'Attribute 1, Attribute 3', tags: 'Tag 1, Tag 3', status: 'Active', Barcode: '456789123', retailPrice: 20.99, inventory: '20', active: true, touch: true, created: new Date() },
      { id: 4, name: 'Product 4', category: 'Type C', brand: 'Brand X', supplier: 'Supplier 3', attributes: 'Attribute 4', tags: 'Tag 4', status: 'Active', Barcode: '321654987', retailPrice: 25.99, inventory: '10', active: true, touch: false, created: new Date() },
      { id: 5, name: 'Product 5', category: 'Type B', brand: 'Brand Y', supplier: 'Supplier 2', attributes: 'Attribute 2', tags: 'Tag 2', status: 'Inactive', Barcode: '654321789', retailPrice: 30.99, inventory: '5', active: false, touch: true, created: new Date() },
      { id: 6, name: 'Product 6', category: 'Type C', brand: 'Brand Z', supplier: 'Supplier 3', attributes: 'Attribute 5', tags: 'Tag 5', status: 'Active', Barcode: '789123456', retailPrice: 35.99, inventory: '0', active: true, touch: false, created: new Date() },
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
      (row.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        row.Barcode.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (this.selectedType ? row.category === this.selectedType : true) &&
      (this.selectedBrand ? row.brand === this.selectedBrand : true) &&
      (this.selectedSupplier ? row.supplier === this.selectedSupplier : true) &&
      (this.selectedStatus ? row.status === this.selectedStatus : true)
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

  clearFilters() {
    this.searchQuery = '';
    this.selectedType = '';
    this.selectedBrand = '';
    this.selectedSupplier = '';
    this.selectedStatus = '';
    this.filterRows(); // Reapply filtering
  }
}
