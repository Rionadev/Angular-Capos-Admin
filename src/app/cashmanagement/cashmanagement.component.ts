import { Component, Inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { CashManagement } from 'app/api/cashmanagement/api.service';
import { userInfo } from 'os';
@Component({
  selector: 'app-cashmanagement',
  templateUrl: './cashmanagement.component.html',
  styleUrls: ['./cashmanagement.component.scss']
})

export class CashmanagementComponent implements OnInit {
  selectedDateFrom: string = '';
  selectedDateTo: string = '';

  currentRow: any = {};
  newTransaction: any = { reasons: '', type: '', transaction: null };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  transactions: any[] = []; // Initialize as an empty array

  constructor(
    private http: HttpClient,
    private cashmanagement: CashManagement,
    @Inject('APP_CONFIG') private config: any) { }
  ngOnInit() {
    this.setDateFromTo();
    this.fetchTransactions();
    console.log('------------------', this.config.userinfo);

    // Log the object directly
    console.log(this.config.userinfo);

    // Log as a string
    console.log(JSON.stringify(this.config.userinfo, null, 2));

    // Log entries
    console.log(Object.entries(this.config.userinfo));

    // Log keys
    console.log(Object.keys(this.config.userinfo));
  }

  setDateFromTo() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    const OneDayAfer = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 30); // Subtract 7 days
    OneDayAfer.setDate(today.getDate() + 1); // Subtract 7 days

    this.selectedDateFrom = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.selectedDateTo = OneDayAfer.toISOString().split('T')[0]; // Set the end date to today
  }

  fetchTransactions() {
    console.log("from:", this.selectedDateFrom, 'to', this.selectedDateTo);
    this.cashmanagement.getCashList({
      from: this.selectedDateFrom,
      to: this.selectedDateTo
    }).subscribe(
      (data) => {
        // console.log('cash  Data:', data);
        this.transactions = data.map(transaction => ({
          ...transaction,
          date: new Date(transaction.created_at).toLocaleString(),
          type: transaction.is_credit == 1 ? 'Credit' : 'Debit',
          // transaction: `${transaction.is_credit == 1 ? '+' : '-'} $${transaction.transaction}`
        }));
      },
      (error) => {
        console.error('Error fetching cash data:', error);
        // Handle the error as needed
      }
    );
    // this.http.get<any[]>(`${environment.apiUrl}/cash/cashmanagementdata`).subscribe(data => {
    //   this.transactions = data.map(transaction => ({
    //     ...transaction,
    //     date: new Date(transaction.created_at).toLocaleString(),
    //     type: transaction.is_credit == 1 ? 'Credit' : 'Debit',
    //     // transaction: `${transaction.is_credit == 1 ? '+' : '-'} $${transaction.transaction}`
    //   }));
    // });
  }

  toggleAddCashForm() {
    this.isContentVisible = !this.isContentVisible;
    if (!this.isContentVisible) {
      this.cancelAddCash(); // Reset the form if hidden
    }
    // const transactionToAdd = {
    //   ...this.newTransaction,
    //   is_credit: this.newTransaction.type === 'Credit',
    //   created_at: new Date(),
    //   // Add other necessary fields like user_id, outlet, register
    // };
    // this.http.post(`${process.env.API_URL}/api/transactions`, transactionToAdd).subscribe(response => {
    //   this.transactions.push({ ...response, date: new Date().toLocaleString() });
    //   this.cancelAddCash(); // Reset the form after saving
    // });
  }

  saveCashTransaction() {
    if (this.newTransaction.reasons == '' || this.newTransaction.transaction == null) return;
    const transactionToAdd = {
      ...this.newTransaction,
      is_credit: this.newTransaction.type === 'Credit',
      created_at: new Date(),
      user_id: 'Current User', // Replace with actual user logic
      register: 'Register Info' // Replace with actual register info
    };

    this.cashmanagement.createCash(
      transactionToAdd
    ).subscribe(
      (data) => {
        // console.log('cash  Data:', data);
        this.transactions.push({ ...data, date: new Date().toLocaleString() });
        this.cancelAddCash(); // Reset the form after saving
      },
      (error) => {
        console.error('Error fetching cash data:', error);
        // Handle the error as needed
      }
    );

    // this.http.post(`${environment.apiUrl}/cash/cashmanagementdata`, transactionToAdd).subscribe(response => {
    //   this.transactions.push({ ...response, date: new Date().toLocaleString() });
    //   this.cancelAddCash(); // Reset the form after saving
    // });
  }

  cancelAddCash() {
    this.newTransaction = { reason: '', type: '', transaction: null }; // Reset new transaction
    this.isContentVisible = false; // Hide the form
  }

  editTransaction(transaction: any) {
    transaction.isEditing = true; // Toggle editing state
    transaction.isActionButton = true; // Toggle editing state
  }

  saveTransaction(transaction: any) {
    const transactionToUpdate = {
      ...transaction,
      is_credit: transaction.type === 'Credit',
      updated_at: new Date() // Add updated timestamp if needed
    };
    this.cashmanagement.updateCash(
      transactionToUpdate
    ).subscribe(
      (data) => {
        transaction.isEditing = false; // Exit editing mode
        transaction.isActionButton = false; // Toggle editing state
        Object.assign(transaction, data); // Update the transaction with the response data
      },
      (error) => {
        console.error('Error fetching cash data:', error);
        // Handle the error as needed
      }
    );
    // this.http.put(`${environment.apiUrl}/cash/cashmanagementdata`, transactionToUpdate).subscribe(response => {
    // //   transaction.isEditing = false; // Exit editing mode
    //   transaction.isActionButton = false; // Toggle editing state
    //   Object.assign(transaction, response); // Update the transaction with the response data
    // });
  }

  cancelTransaction(transaction: any) {
    console.log(transaction);
    this.currentRow = {}; // Reset the current row
    transaction.isEditing = false; // Toggle editing state
    transaction.isActionButton = false; // Toggle editing state
  }
  confirmDelete(transaction: any) {
    transaction.isConfirming = true; // Set confirming state
    transaction.isActionButton = true; // Toggle editing state

  }

  cancelConfirm(transaction: any) {
    transaction.isConfirming = false; // Reset confirming state
    transaction.isActionButton = false; // Toggle editing state

  }

  deleteTransaction(transaction: any) {
    const index = this.transactions.indexOf(transaction);
    if (index > -1) {
      // Make an HTTP DELETE request to the server with the transaction ID in the URL

      this.cashmanagement.deleteCash(
        transaction
      ).subscribe(
        (data) => {
          this.transactions.splice(index, 1); // Remove the transaction from the array
          transaction.isEditing = false; // Exit editing mode
          transaction.isConfirming = false; // Reset confirming state
        },
        (error) => {
          console.error('Error fetching cash data:', error);
          // Handle the error as needed
        }
      );

      // this.http.delete(`${environment.apiUrl}/cash/cashmanagementdata/${transaction._id}`).subscribe(response => {
      //   this.transactions.splice(index, 1); // Remove the transaction from the array
      //   transaction.isEditing = false; // Exit editing mode
      //   transaction.isConfirming = false; // Reset confirming state
      // });
    }
  }
}