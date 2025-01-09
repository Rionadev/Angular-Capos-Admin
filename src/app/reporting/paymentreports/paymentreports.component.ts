import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
    selector: 'app-paymentreports',
    templateUrl: './paymentreports.component.html',
    styleUrls: ['./paymentreports.component.scss']
})
export class PaymentreportsComponent implements OnInit {

    selectedDateFrom: string = '';
    selectedDateTo: string = '';

    constructor(private customerService: CustomerService) { }


    setDateFromTo() {
        const today = new Date();
        const sevenDaysAgo = new Date(today);
        const oneDayAfter = new Date(today);

        sevenDaysAgo.setDate(today.getDate() - 1000); // Subtract 7 days
        oneDayAfter.setDate(today.getDate() + 1); // Subtract 7 days


        this.selectedDateFrom = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
        this.selectedDateTo = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
    }
    ngOnInit(): void {
        this.setDateFromTo();
        this.fetchSearchItems();

    }
    fetchSearchItems() {

        const params = {
            from: this.selectedDateFrom,
            to: this.selectedDateTo,
        };


        this.customerService.fetchPaymentHistory(params).subscribe(
            (res) => {
            },
            (error) => {
                console.error('Error fetching customer data:', error);
                // Handle the error as needed
            }
        );
    }
    startDate: string = this.getFormattedDate(new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)); // 20 days ago
    endDate: string = this.getFormattedDate(new Date()); // Today

    transactions = [
        // Sample transaction data
        { date: '2024-12-01', storeCredit: 100, cashConcealedTotal: 200, cash: 150, credit: 50, debit: 0, refunds: 0, voided: 0, total: 200 },
        // Add more sample data as needed
    ];

    filteredTransactions = [...this.transactions];

    initToday() {
        this.startDate = this.getFormattedDate(new Date(Date.now() - 20 * 24 * 60 * 60 * 1000));
        this.endDate = this.getFormattedDate(new Date());
        this.filteredTransactions = [...this.transactions]; // Reset filtered results
    }

    searchTransactions() {
        this.filteredTransactions = this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= new Date(this.startDate) && transactionDate <= new Date(this.endDate);
        });
    }

    getFormattedDate(date: Date): string {
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // Format to YYYY-MM-DD
    }
}