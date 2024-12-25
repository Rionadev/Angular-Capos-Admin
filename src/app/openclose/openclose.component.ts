import { Component, OnInit } from '@angular/core';
import { quantity } from 'chartist';
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
  print_totalnetsales = 2434.24;
  print_tax = 147.85;
  today: string;
  summary_subtotal = 0;
  summary_hst = 0;
  summary_total = 0;
  product_list = [
    { category: 'Bottled Beer Sales', quantity: 22, netSales: 243.23 },
    { category: 'Craft Beer Sales', quantity: 15, netSales: 180.50 },
    { category: 'Cider Sales', quantity: 10, netSales: 120.75 },
    { category: 'Wine Sales', quantity: 18, netSales: 300.00 },
    { category: 'Spirits Sales', quantity: 25, netSales: 450.00 },
  ];
  payments = [
    { type: 'Cash', expected: 178, counted: 45.6, difference: 0 },
    { type: 'Credit Card', expected: 178, counted: 25.43, difference: 0 },
    { type: 'Debit Card', expected: 178, counted: 345.86, difference: 0 },
    { type: 'Store Credit', expected: 178, counted: 1124.7, difference: 0 },
    { type: 'Refunds', expected: 178, counted: 156.45, difference: 0 },
    { type: 'Voided', expected: 345, counted: 453.3, difference: 0 },
    { type: 'Penny', expected: 252, counted: 324.6, difference: 0 },
  ];
  serverTipOut = [
    { type: 'Total Cash Payments', value: 45.6 },
    { type: 'Cash Adjustments', value: 37.52 },
    { type: 'Cash before Tipouts', value: 569.58 },
    { type: 'Cash Gratuity', value: 0 },
    { type: 'Credit/Non-Cash Gratuity', value: 0 },
    { type: 'Credit/Non-Cash tips', value: -366.79 },
  ];
  totalnonecashtipsandGratuity = -366.79;
  salesData = [
    { category: 'Test Product', saleQty: 0, saleSum: 0 },
    { category: 'Accessories', saleQty: 0, saleSum: 0 },
    { category: 'Bulk Wire', saleQty: 0, saleSum: 0 },
    { category: 'Racks & Cabinets', saleQty: 0, saleSum: 0 },
    { category: 'Cables', saleQty: 6, saleSum: 464.10 },
    { category: 'Belmont', saleQty: 0, saleSum: 0 },
    { category: 'Test W', saleQty: 0, saleSum: 0 }
  ];
  creditCardBreakdown = [
    {type:'Amex', amount:263.01},
    {type:'Mastercard', amount:624.24},
    {type:'Visa', amount:1527.51},
  ];
  date_s = new Date();
  formtted_date = this.date_s.toISOString().slice(0, 19).replace('T', '');

  reg_outlet: string = 'Main Outlet';
  reg_register: string = 'Main Register';
  reg_id: number = 1662059421489;
  reg_openingTime = this.formtted_date;
  showZReport = false; // To control visibility of the Z Report

  rows: Product[] = [];
  currentRow: Product = { id: null, name: '', description: '', product: '' };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  paginatedRows: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor() {
    const currentDate = new Date();
    this.today = currentDate.toLocaleDateString(); // Default format (MM/DD/YYYY)
  }
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
  formatCurrency(total: number): string {
    return `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  calculateTotalCounted(): any {
    return this.payments.reduce((total, payment) => total + payment.counted, 0);
  }
  calculateTotalCash(): any {
    return this.serverTipOut.reduce((total, payment) => total + payment.value, 0);
  }
  calcTotalCreditCard():number{
    return this.creditCardBreakdown.reduce((total, payment) => total + payment.amount, 0);
  }
  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
    if(this.isContentVisible){    this.closeRegister();}
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
  calculateTotalNetSales(): any {
    return (this.product_list.reduce((total, product) => total + product.netSales, 0));
  }
  totalDifference(): number {
    return this.payments.reduce((total, payment) => total + payment.difference, 0);
  }
  closeRegister() {
    this.showZReport = true; // Show Z Report
    this.calculateDifferences(); // Ensure differences are calculated
    this.printZReport(); // Optionally, print immediately
  }

  printZReport() {
    setTimeout(() => {
      window.print(); // Print the current window
    }, 1000); // Delay to allow the Z Report to render
  }

}
