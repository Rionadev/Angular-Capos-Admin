import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { OrdersService } from '../../api/orders/orders.service';
import { SalesService } from '../../api/sales/sales.service';
import { CustomerService } from 'app/api/salesledger/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  activePeriod: string = 'daily';

  public chartType: ChartType;
  public chartData: any;
  public chartOptions: any;
  public chartResponsive: any[];
  public chartLegendItems: LegendItem[];

  start: string = '';
  end: string = '';

  maxSales: number = 0;
  maxOrders: number = 0;

  salesData: any[] = [];
  ordersData: any[] = [];

  chartVisible: boolean = false;
  
  // Variable for Sales Report
  totalForThisMonth: number = 0;
  totalForToday: number = 0;

  // Variable for Product Report
  totalByUser: number = 0;
  totalByOutlet: number = 0;
  totalByCustomer: number = 0;

  // Stock Report
  stockLevels: number = 0;
  stockOnHand: number = 0;

  constructor(
    private ordersService: OrdersService,
    private salesService: SalesService,
    private customerService: CustomerService,
  ) {
    const today = new Date();
    this.start = today.toISOString().split('T')[0];
    this.end = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.onSetChart();
    this.onGetSalesData();
    this.onGetOrdersData();

    this.onGetSalesReport();
    this.onGetProductReport();
    this.onStockReport();
  }

  onGetSalesReport() {
    const today = new Date();
    const start = today.toISOString().split('T')[0];
    const end = today.toISOString().split('T')[0];

    //totalForThisMonth: number = 0;
    //totalForToday: number = 0;
    // For today
    this.customerService.fetchSaleHistory({
      from: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0],
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0],
    }).subscribe(
      (res) => {
        // Get Real Paid. total_paid item.
        this.totalForToday = this.getTotal(res, "total_paid");
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );

    // Fpor Month
    this.customerService.fetchSaleHistory({
      from: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0],
      to: new Date(today.getFullYear(), today.getMonth() + 1, 0).toISOString().split('T')[0],
    }).subscribe(
      (res) => {
        this.totalForThisMonth = this.getTotal(res, "total_paid");
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );

  }

  onGetProductReport() {
    /* totalByUser: number = 0;
    totalByOutlet: number = 0;
    totalByCustomer: number = 0; */
  }

  onStockReport() {
    /* stockLevels: number = 0;
    stockOnHand: number = 0; */
  }

  getTotal(records: any, field: string): number {
    return (records?.reduce((sum, record) => sum + record[field], 0)).toFixed(2);
  }

  onGetSalesData() {
    this.salesService.read({
      start: this.start,
      end: this.end
    }).subscribe({
      next: (data) => {
        console.log('salesData', data);
        this.salesData = data;
      },
      error: (err) => {
        console.error('Error fetching sales:', err);
      },
    });
  }

  onGetOrdersData() {
    this.ordersService.read({
      date_from: this.start,
      date_to: this.end
    }).subscribe({
      next: (data) => {
        console.log('ordersData', data);
        this.ordersData = data;
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
      },
    });
  }

  onSetChart() {
    this.chartType = ChartType.Line;
    this.chartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    };
    this.chartOptions = {
      low: 0,
      high: 10,
      showArea: false,
      height: '245px',
      axisX: {
        showGrid: false,
      },
      /* lineSmooth: Chartist.Interpolation.simple({
        divisor: 1
      }), */
      showLine: true,
      showPoint: true,
    };
    this.chartResponsive = [
      ['screen and (max-width: 640px)', {
        axisX: {
          labelInterpolationFnc: function (value) {
            return value[0];
          }
        }
      }]
    ];
    this.chartLegendItems = [
      { title: 'Sales', imageClass: 'fa fa-circle text-info' },
      { title: 'Orders', imageClass: 'fa fa-circle text-danger' },
    ];
  }

  setActivePeriod(tab: string): void {
    this.activePeriod = tab;
  }

  onClearFilters() {

  }

  onSearch() {
    this.onGetAllData();
  }

  onGetAllData() {
      this.salesService.read({
        start: this.start,
        end: this.end
      }).subscribe({
        next: (sales) => {
          this.salesData = sales;
          this.ordersService.read({
            date_from: this.start,
            date_to: this.end
          }).subscribe({
            next: (orders) => {
              this.ordersData = orders;
              this.onDataProcessing();
            },
            error: (err) => {
              console.error('Error fetching orders:', err);
            },
          });
        },
        error: (err) => {
          console.error('Error fetching sales:', err);
        },
      });
  }

  onDataProcessing() {
    
    
    const dateArray = this.generateDateArray(this.start, this.end);
    console.log("dateArray", dateArray);
    const salesData = this.updateDateArray(dateArray, this.salesData);
    const ordersData =  this.updateDateArray(dateArray, this.ordersData);

    const datesOnlyArray = dateArray?.map(item => item.date);
    const salesOnlyArray = salesData?.map(item => item.value);
    const ordersOnlyArray = ordersData?.map(item => item.value);

    console.log("datesOnlyArray", datesOnlyArray);
    console.log("salesOnlyArray", salesOnlyArray);
    console.log("ordersOnlyArray", ordersOnlyArray);
    
    this.maxSales = Math.max(...salesOnlyArray);
    this.maxOrders = Math.max(...ordersOnlyArray);
    const maxAxis = Math.max(this.maxSales, this.maxOrders);

    this.chartData = {
      labels: datesOnlyArray,
      series: [
        salesOnlyArray,
        ordersOnlyArray
      ]
    };
    this.chartOptions.high = maxAxis;
  }

  onDateChange(): void {
    /* const inputElement = event.target as HTMLInputElement;
    const selectedDate = inputElement.value; // The selected date as a string (YYYY-MM-DD format)
    console.log('Selected Date:', selectedDate); */
    
  }

  updateDateArray(
    dateArray: { date: string; value: number }[],
    saleData: { created_at: string; subtotal: number }[]
  ): { date: string; value: number }[] {
    // Create a mapping of dateArray for faster lookups
    const dateMap = new Map(
      dateArray?.map(item => [item.date, { date: item.date, value: item.value }])
    );
  
    // Iterate through the sales data
    saleData.forEach(sale => {
      let saleDate: string;

      if (this.activePeriod === 'daily') {
        saleDate = new Date(sale.created_at).toISOString().split('T')[0]; // YYYY-MM-DD
      } else if (this.activePeriod === 'monthly') {
        saleDate = `${new Date(sale.created_at).getFullYear()}-${String(new Date(sale.created_at).getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
      } else if (this.activePeriod === 'yearly') {
        saleDate = `${new Date(sale.created_at).getFullYear()}`; // YYYY
      }

      // Check if the date exists in the dateArray map
      if (dateMap.has(saleDate)) {
        // Add the subtotal to the corresponding date's value
        const entry = dateMap.get(saleDate)!;
        entry.value += sale.subtotal;
      }
    });
  
    // Convert the map back to an array
    return Array.from(dateMap.values());
  }
  
  generateDateArray(startDate: string, endDate: string): { date: string; value: number }[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray: { date: string; value: number }[] = [];

    //
    if (this.activePeriod === 'monthly'){
      if(end.getDate() < start.getDate())
        end.setDate(start.getDate());
    }
    if (this.activePeriod === 'yearly'){
      if(end.getDate() < start.getDate())
        end.setDate(start.getDate());
      if(end.getMonth() < start.getMonth())
        end.setMonth(start.getMonth());
    }

    while (start <= end) {
      let formattedDate: string;
      // Format the date based on the interval
      if (this.activePeriod === 'daily') {
        formattedDate = start.toISOString().split('T')[0]; // YYYY-MM-DD
        dateArray.push({ date: formattedDate, value: 0 });
        start.setDate(start.getDate() + 1); // Increment by 1 day
      } else if (this.activePeriod === 'monthly') {
        formattedDate = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
        dateArray.push({ date: formattedDate, value: 0 });
        start.setMonth(start.getMonth() + 1); // Increment by 1 month
      } else if (this.activePeriod === 'yearly') {
        formattedDate = `${start.getFullYear()}`; // YYYY
        dateArray.push({ date: formattedDate, value: 0 });
        start.setFullYear(start.getFullYear() + 1); // Increment by 1 year
      }
    }

    return dateArray;
  }
}
