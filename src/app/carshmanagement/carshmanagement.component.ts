import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carshmanagement',
  templateUrl: './carshmanagement.component.html',
  styleUrls: ['./carshmanagement.component.scss']
})
export class CarshmanagementComponent implements OnInit {
  currentRow: any = {};
  newTransaction: any = { reason: '', type: '', transaction: null };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  transactions = [
    { date: '2022-06-06 04:03:57', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'test new file on live server', type: 'Credit', transaction: '+ $100' },
    { date: '2022-06-05 21:14:44', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'test web debit', type: 'Debit', transaction: '- $15' },
    { date: '2022-06-05 21:14:22', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'Test web version', type: 'Credit', transaction: '+ $12' },
    { date: '2022-06-04 04:06:56', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'test drawer', type: 'Credit', transaction: '+ $10' },
    { date: '2022-06-03 08:05:19', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'xreason2', type: 'Debit', transaction: '- $50' },
    { date: '2022-06-03 08:04:42', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'xreason', type: 'Credit', transaction: '+ $100' },
    { date: '2022-06-03 07:47:52', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'xtest2', type: 'Debit', transaction: '- $20' },
    { date: '2022-06-03 07:47:14', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'xtest', type: 'Credit', transaction: '+ $121' },
    { date: '2022-06-02 05:14:17', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'testing actual and nox', type: 'Credit', transaction: '+ $200' },
    { date: '2022-05-31 10:35:23', user: 'saboortanha@gmail.com', register: 'Main Register', reason: 'test', type: 'Debit', transaction: '- $16' }
  ];

  ngOnInit() {


  }

  toggleAddCashForm() {
    this.isContentVisible = !this.isContentVisible;
    if (!this.isContentVisible) {
      this.cancelAddCash(); // Reset the form if hidden
    }
  }

  saveCashTransaction() {
    const transactionToAdd = {
      ...this.newTransaction,
      date: new Date().toLocaleDateString(), // Add current date
      user: 'Current User', // Replace with actual user logic
      register: 'Register Info' // Replace with actual register info
    };
    this.transactions.push(transactionToAdd);
    this.cancelAddCash(); // Reset the form after saving
  }

  cancelAddCash() {
    this.newTransaction = { reason: '', type: '', transaction: null }; // Reset new transaction
    this.isContentVisible = false; // Hide the form
  }

  saveRow() {
    if (this.currentRow.id) {
      // Update existing row logic
    } else {
      // Add new row logic
      this.transactions.push({ ...this.currentRow, id: this.transactions.length + 1 });
    }
    this.currentRow = {}; // Reset the form
    this.isContentVisible = false; // Hide the form
  }

  editTransaction(transaction: any) {
    transaction.isEditing = !transaction.isEditing; // Toggle editing state
  }

  saveTransaction(transaction: any) {
    transaction.isEditing = false; // Exit editing mode
    // Logic to save the transaction can be added here
  }

  deleteTransaction(transaction: any) {
    const index = this.transactions.indexOf(transaction);
    if (index > -1) {
      this.transactions.splice(index, 1); // Remove the transaction from the array
    }
  }

  cancelEdit() {
    this.currentRow = {}; // Reset the current row
    this.isContentVisible = false; // Hide the form
  }
}