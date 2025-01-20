import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-salesreports',
  templateUrl: './salesreports.component.html',
  styleUrls: ['./salesreports.component.scss']
})
export class SalesreportsComponent implements OnInit {
  [x: string]: any;
  showModal = false;
  selectedDateFrom: string = '';
  selectedDateTo: string = '';
  transactionsByDate: any = [];
  totalByDate: any = [];
  reportsData: any = [];
  total_reportData: any = [];

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
  get filteredSales() {
    return this.selected_rowdata.data.filter(sale => sale.payment_status != 'not paid');
  }
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
  close() {
    this.showModal = false;
  }
  clearFilters() {
    // this.startDate = '';    this.endDate = '';
    this.setDateFromTo();
    this.fetchSearchItems();
  }
  selected_rowdata: any;
  showDetail(rowData: any) {
    this.selected_rowdata = {
      row: rowData,
      data: this.transactionsByDate[rowData.date]
    }
    console.log(this.selected_rowdata);
    this.showModal = true;

  }
  fetchSearchItems() {
    // this.http.get<any[]>(`${environment.apiUrl}/sale/getSearchItem`).subscribe(data => {

    // });
    const params = {
      start: new Date(this.selectedDateFrom),
      end: new Date(this.selectedDateTo),
    };

    // Log the params to check their structure
    console.log('Sending params:', params);

    this.total_reportData = [];

    this.customerService.fetchSale(params).subscribe(
      (res) => {
        let t_total = 0;
        let t_revenue = 0;
        let t_cog = 0;
        let t_gp = 0;
        let t_margin = 0;
        let t_tax = 0;
        // Group transactions by date
        const groupedTransactions = res.reduce((acc, item) => {
          const date = new Date(item.updated_at).toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
          // if (item?.payment_status != 'not paid') {

          // Group by date
          if (!acc[date]) {
            acc[date] = [];
          }
          acc[date].push(item);

          // }
          return acc;
        }, {} as Record<string, any[]>);

        this.transactionsByDate = groupedTransactions;
        this.reportsData = [];
        console.log(groupedTransactions);

        const groupedTransactionsArray = Object.keys(groupedTransactions)?.map(date => {
          // console.log('------', groupedTransactions[date]);

          const calc_row = groupedTransactions[date];
          let total = 0;
          let revenue = 0;
          let cog = 0;
          let gp = 0;
          let margin = 0;
          let tax = 0;

          calc_row.forEach(transaction => {
            if (transaction.payment_status != 'not paid') {

              total += transaction.total; // include tax
              revenue += transaction.subtotal; //sale products
              tax += transaction.tax; //Tax
              cog += transaction.total_paid; //Cost of Products
              gp += transaction.subtotal - transaction.total_paid; //Gross profit
              //total whole
              t_total += total;
              t_revenue += revenue;
              t_tax += tax;
              t_cog += cog;
              t_gp += gp;
            } else {
              console.log('--------',transaction);

            }
          });


          this.reportsData.push({
            date: date,
            total: total.toFixed(2),
            revenue: revenue.toFixed(2),
            cog: cog.toFixed(2),
            gp: gp.toFixed(2),
            tax: tax.toFixed(2),
            margin: ((gp / revenue) * 100).toFixed(2),
          });
        });

        this.total_reportData = {
          total: t_total.toFixed(2),
          revenue: t_revenue.toFixed(2),
          cog: t_cog.toFixed(2),
          gp: t_gp.toFixed(2),
          tax: t_tax.toFixed(2),
          margin: ((t_gp / t_revenue) * 100).toFixed(2),
        }

        console.log(this.reportsData); // View the grouped data
        console.log(this.total_reportData); // View the grouped data

      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  formatDate(dateString: string) {
    const date = new Date(dateString);

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }
}

