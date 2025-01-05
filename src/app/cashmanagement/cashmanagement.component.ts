import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Component({
  selector: 'app-cashmanagement',
  templateUrl: './cashmanagement.component.html',
  styleUrls: ['./cashmanagement.component.scss']
})

export class CashmanagementComponent implements OnInit {
  currentRow: any = {};
  newTransaction: any = { reason: '', type: '', transaction: null };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  transactions = [
    { date: '2022-06-06 04:03:57', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'test new file on live server', type: 'Credit', transaction: '+ $100' },
    { date: '2022-06-05 21:14:44', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'test web debit', type: 'Debit', transaction: '- $15' },
    { date: '2022-06-05 21:14:22', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'Test web version', type: 'Credit', transaction: '+ $12' },
    { date: '2022-06-04 04:06:56', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'test drawer', type: 'Credit', transaction: '+ $10' },
    { date: '2022-06-03 08:05:19', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'xreason2', type: 'Debit', transaction: '- $50' },
    { date: '2022-06-03 08:04:42', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'xreason', type: 'Credit', transaction: '+ $100' },
    { date: '2022-06-03 07:47:52', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'xtest2', type: 'Debit', transaction: '- $20' },
    { date: '2022-06-03 07:47:14', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'xtest', type: 'Credit', transaction: '+ $121' },
    { date: '2022-06-02 05:14:17', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'testing actual and nox', type: 'Credit', transaction: '+ $200' },
    { date: '2022-05-31 10:35:23', user_id: 'saboortanha@gmail.com', register: 'Main Register', reasons: 'test', type: 'Debit', transaction: '- $16' }
  ];

  constructor(private http: HttpClient) { }
  ngOnInit() {
    this.fetchTransactions();
  }
 
  fetchTransactions() {
    this.http.get<any[]>(`${environment.apiUrl}/cash/getcashdata`).subscribe(data => {
      this.transactions = data.map(transaction => ({
        ...transaction,
        date: new Date(transaction.created_at).toLocaleString(),
        type: transaction.is_credit == 1 ? 'Credit' : 'Debit',
        // transaction: `${transaction.is_credit == 1 ? '+' : '-'} $${transaction.transaction}`
      }));
    });
  }

  toggleAddCashForm() {
    this.isContentVisible = !this.isContentVisible;
    if (!this.isContentVisible) {
      this.cancelAddCash(); // Reset the form if hidden
    }
    const transactionToAdd = {
      ...this.newTransaction,
      is_credit: this.newTransaction.type === 'Credit',
      created_at: new Date(),
      // Add other necessary fields like user_id, outlet, register
    };
    // this.http.post(`${process.env.API_URL}/api/transactions`, transactionToAdd).subscribe(response => {
    //   this.transactions.push({ ...response, date: new Date().toLocaleString() });
    //   this.cancelAddCash(); // Reset the form after saving
    // });
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