import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-salesreports',
  templateUrl: './salesreports.component.html',
  styleUrls: ['./salesreports.component.scss']
})
export class SalesreportsComponent implements OnInit {

  selectedDateFrom: string = '';
  selectedDateTo: string = '';
  transactionsByDate: any = [];
  ngOnInit(): void {
    this.setDateFromTo();
    this.fetchSearchItems();

  }

  setDateFromTo() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    const oneDayAfter = new Date(today);

    sevenDaysAgo.setDate(today.getDate() - 100); // Subtract 7 days
    oneDayAfter.setDate(today.getDate() + 1); // Subtract 7 days


    this.selectedDateFrom = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.selectedDateTo = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
  }
  constructor(private http: HttpClient, private customerService: CustomerService) { }

  transactions = [
    // Sample transaction data
    { date: '2024-01-01', totalInclTax: 100, revenue: 150, costOfGoods: 80, grossProfit: 70, margin: 46.67, tax: 10 },
    { date: '2024-01-02', totalInclTax: 200, revenue: 250, costOfGoods: 150, grossProfit: 100, margin: 40.00, tax: 20 },
    // Add more sample data as needed
  ];

  filteredTransactions = [...this.transactions];

  searchTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(this.selectedDateFrom);
      const end = new Date(this.selectedDateTo);

      return (
        (this.selectedDateFrom ? transactionDate >= start : true) &&
        (this.selectedDateTo ? transactionDate <= end : true)
      );
    });
  }

  clearFilters() {
    // this.startDate = '';    this.endDate = '';
    this.setDateFromTo();
    this.filteredTransactions = [...this.transactions]; // Reset to original data
  }

  fetchSearchItems() {
    // this.http.get<any[]>(`${environment.apiUrl}/sale/getSearchItem`).subscribe(data => {

    // });
    const params = {
      from: this.selectedDateFrom,
      to: this.selectedDateTo,
    };

    // Log the params to check their structure
    console.log('Sending params:', params);

    this.customerService.fetchSaleHistory(params).subscribe(
      (res) => {
        // Group transactions by date
        const groupedTransactions = res.reduce((acc, item) => {
          const date = new Date(item.created_at).toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'

          // Calculate fields
          // const revenue = item.subtotal;
          // const tax = item.total - item.subtotal;
          // const costOfGoods = revenue * 0.6; // Example: 60% of revenue
          // const grossProfit = revenue - costOfGoods;
          // const margin = (grossProfit / revenue) * 100;

          // // Construct the transaction data
          // const transaction = {
          //   date,
          //   totalInclTax: item.total,
          //   revenue,
          //   costOfGoods,
          //   grossProfit,
          //   margin,
          //   tax,
          // };

          // Group by date
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);

          return acc;
        }, {} as Record<string, any[]>);

        this.transactionsByDate = groupedTransactions;
        console.log(this.transactionsByDate); // View the grouped data
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );

  }
}

