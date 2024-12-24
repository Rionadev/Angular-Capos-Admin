import { Component, OnInit } from '@angular/core';
interface Product {
  id: number;
  name: string;
  description: string;
  product: string;
}

@Component({
  selector: 'app-openclose',
  templateUrl: './openclose.component.html',
  styleUrls: ['./openclose.component.scss']
})
export class OpencloseComponent implements OnInit {
  payments = [
    { type: 'Cash', expected: 178, counted: 0, difference: 0 },
    { type: 'Credit Card', expected: 178, counted: 0, difference: 0 },
    { type: 'Debit Card', expected: 178, counted: 0, difference: 0 },
    { type: 'Store Credit', expected: 178, counted: 0, difference: 0 },
    { type: 'Refunds', expected: 178, counted: 0, difference: 0 },
    { type: 'Voided', expected: 178, counted: 0, difference: 0 },
    { type: 'Penny', expected: 178, counted: 0, difference: 0 },
  ];

  salesData = [
    { category: 'Test Product', saleQty: 0, saleSum: 0 },
    { category: 'Accessories', saleQty: 0, saleSum: 0 },
    { category: 'Bulk Wire', saleQty: 0, saleSum: 0 },
    { category: 'Racks & Cabinets', saleQty: 0, saleSum: 0 },
    { category: 'Cables', saleQty: 6, saleSum: 464.10 },
    { category: 'Belmont', saleQty: 0, saleSum: 0 },
    { category: 'Test W', saleQty: 0, saleSum: 0 }
  ];
  date_s = new Date();
  formtted_date = this.date_s.toISOString().slice(0, 19).replace('T', '');

  reg_outlet: string = 'Main Outlet';
  reg_register: string = 'Main Register';
  reg_id: number = 1662059421489;
  reg_openingTime = this.formtted_date;


  rows: Product[] = [];
  currentRow: Product = { id: null, name: '', description: '', product: '' };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  paginatedRows: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  ngOnInit() {
    // Load initial data
    this.rows = [
      { id: 1, name: 'Product 1', description: 'Description 1', product: 'Product A' },
      { id: 2, name: 'Product 2', description: 'Description 2', product: 'Product B' },
      { id: 3, name: 'Product 3', description: 'Description 3', product: 'Product C' },
      { id: 4, name: 'Product 4', description: 'Description 4', product: 'Product D' },
      { id: 5, name: 'Product 5', description: 'Description 5', product: 'Product E' },
      { id: 6, name: 'Product 6', description: 'Description 6', product: 'Product F' },
      // Add more products as needed
    ];
  }

  toggleContent() {
    // this.isContentVisible = !this.isContentVisible;

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

  calculateDifferences() {
    this.payments.forEach(payment => {
      payment.difference = payment.expected - payment.counted;
    });
  }

  totalExpected(): number {
    return this.payments.reduce((total, payment) => total + payment.expected, 0);
  }

  totalCounted(): number {
    return this.payments.reduce((total, payment) => total + payment.counted, 0);
  }

  totalDifference(): number {
    return this.payments.reduce((total, payment) => total + payment.difference, 0);
  }
}
