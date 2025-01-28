import { Inject, Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { LegendItem, ChartType } from '../../lbd/lbd-chart/lbd-chart.component';
import * as Chartist from 'chartist';
import { OrdersService } from '../../api/orders/orders.service';
import { SalesService } from '../../api/sales/sales.service';
import { CustomerService } from 'app/api/salesledger/api.service';
import { ProductsService } from '../../api/products/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  activePeriod: string = 'daily';
  displayMode: string = 'daily';

  public chartType: ChartType;
  public chartSalesData: any;
  public chartOrdersData: any;
  public chartSalesOptions: any;
  public chartOrdersOptions: any;
  public chartResponsive: any[];
  public chartLegendItems: LegendItem[];

  start: string = '';
  end: string = '';

  maxSales: number = 0;
  maxOrders: number = 0;

  sumSales: number = 0;
  sumOrders: number = 0;

  month: string = ''; // For Sales Report
  today: string = ''; // For Sales Report

  salesData: any[] = [];
  ordersData: any[] = [];
  productsData: any[] = [];

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

  // Product Report
  currentDate: string = '';
  constructor(
    @Inject('APP_CONFIG') private config: any,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    private salesService: SalesService,
    private customerService: CustomerService,
  ) {
    const today = new Date();
    this.start = today.toISOString().split('T')[0];
    this.end = today.toISOString().split('T')[0];
    this.currentDate = today.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.onSetChart();
    this.setActivePeriod('daily');
  }

  onGetSalesReport() {
    const yesterday = new Date(this.start);
    const today = new Date(this.end);

    //totalForThisMonth: number = 0;
    //totalForToday: number = 0;
    // For today
    this.customerService.fetchSaleHistory({
      from: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0],
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().split('T')[0],
    }).subscribe(
      (res) => {
        // Get Real Paid. total_paid item.
        console.log('sales-today', res);
        this.totalForToday = this.getTotal(res, "subtotal");
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );

    // For Month
    this.customerService.fetchSaleHistory({
      from: new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0],
      to: new Date(today.getFullYear(), today.getMonth() + 1, 1).toISOString().split('T')[0],
    }).subscribe(
      (res) => {
        console.log('sales-month', res);
        this.totalForThisMonth = this.getTotal(res, "subtotal");
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );

    // For Period Sales 
    this.customerService.fetchSaleHistory({
      //from: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0],
      //to: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).toISOString().split('T')[0],
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().split('T')[0],
      from: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).toISOString().split('T')[0],
    }).subscribe(
      (res) => {
        // Get Real Paid. total_paid item.
        console.log('sales-today', res);
        this.sumSales = this.getTotal(res, "subtotal");
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }

  onGetProductReport() {

    const yesterday = new Date(this.start);
    const today = new Date(this.end);

    //totalForThisMonth: number = 0;
    //totalForToday: number = 0;
    // For today
    //from: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0],
    //to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().split('T')[0],

    this.customerService.fetchSaleHistory({
      //from: new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split('T')[0],
      //to: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).toISOString().split('T')[0],
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toISOString().split('T')[0],
      from: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).toISOString().split('T')[0],
    }).subscribe(
      (res) => {
        // Get Real Paid. total_paid item.
        console.log('sales-today', res);
        this.totalByOutlet = this.getTotal(res, "subtotal");
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );

    /* this.salesService.read({})
      .subscribe({
        next: (data) => {
          console.log('Product Report', data);
          //
          //totalByOutlet

          //config.outlet_id
          console.log('config.outlet_id', this.config.outlet_id);
          const totalSubtotal = data.reduce((acc, item) => {
            if (item.outlet === this.config.outlet_id) {
              acc += item.subtotal; // Sum the subtotal only for the target outlet
            }
            return acc;
          }, 0);
          this.totalByOutlet = totalSubtotal;
        },
        error: (err) => {
          console.error('Error fetching sales:', err);
        },
      }); */
  }

  onStockReport() {
    this.productsService.read({ range: 'stock_level' }).subscribe({
      next: (data) => {
        console.log('productsData', data);
        this.stockLevels = data.stock_level;
        this.stockOnHand = data.stock;
        // this.productsData = data?.data;
        //
        /* stockLevels: number = 0;
       stockOnHand: number = 0; */
      },
      error: (err) => {
        console.error('Error fetching stores:', err);
      },
    });
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
    this.chartSalesData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    };
    this.chartSalesOptions = {
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
    this.chartOrdersData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      series: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    };
    this.chartOrdersOptions = {
      low: 0,
      high: 10,
      showArea: false,
      height: '245px',
      fullWidth: false,
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
    const today = new Date();
    this.end = today.toISOString().split('T')[0];
    const start = new Date(today);

    if (tab == 'daily')
    {
      start.setDate(today.getDate() - 7);
      this.start = start.toISOString().split('T')[0];
      
    }
    else if (tab == 'monthly')
    {
      start.setDate(1);
      this.start = start.toISOString().split('T')[0];
    }
    else if (tab == 'yearly' )
    {
      start.setMonth(0);
      start.setDate(1);
      this.start = start.toISOString().split('T')[0];
    }

    this.activePeriod = tab;
    this.onGetAllData();
  }

  onClearFilters() {

  }

  onSearch() {
    //this.activePeriod = 'search';
    this.onGetAllData();
  }

  onGetAllData() {
    // Set Display Mode.
    // Calculate the difference in milliseconds
    const differenceInMilliseconds = Math.abs(new Date(this.start).getTime() - new Date(this.end).getTime());
    const difference = Math.ceil(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    if (difference >= 0 && difference <= 31)
      this.displayMode = 'daily';
    else if (difference >= 32 && difference <= 366)
      this.displayMode = 'monthly';
    else if (difference >= 367)
      this.displayMode = 'yearly';

    this.today = this.end;
    const month = new Date(this.end);
    month.setDate(1);
    this.month = month.toISOString().split('T')[0].split('-').slice(0, 2).join('-');

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

    this.onGetSalesReport();
    this.onGetProductReport();
    this.onStockReport();
  }

  onDataProcessing() {
    
    const dateArray = this.generateDateArray(this.start, this.end);

    const salesData = this.updateDateArray(dateArray, this.salesData, false);
    const ordersData = this.updateDateArray(dateArray, this.salesData, true);

    let datesOnlyArray = dateArray?.map(item => item.date);
    const salesOnlyArray = salesData?.map(item => item.value);
    const ordersOnlyArray = ordersData?.map(item => item.value);

    console.log("datesOnlyArray", datesOnlyArray);
    console.log("salesOnlyArray", salesOnlyArray);
    console.log("ordersOnlyArray", ordersOnlyArray);

    if (datesOnlyArray.length >= 15) {
      datesOnlyArray = datesOnlyArray.map(() => '-');
    }

    this.maxSales = Math.max(...salesOnlyArray);
    this.maxOrders = Math.max(...ordersOnlyArray);
    const maxAxis = Math.max(this.maxSales, this.maxOrders);

    this.sumOrders = ordersOnlyArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    //this.sumSales = salesOnlyArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    
    this.chartSalesData = {
      labels: datesOnlyArray,
      series: [
        salesOnlyArray
      ]
    };
    this.chartSalesOptions.high = this.maxSales;

    this.chartOrdersData = {
      labels: datesOnlyArray,
      series: [
        ordersOnlyArray
      ]
    };
    this.chartOrdersOptions.high = this.maxOrders;
  }

  onDateChange(): void {
    /* const inputElement = event.target as HTMLInputElement;
    const selectedDate = inputElement.value; // The selected date as a string (YYYY-MM-DD format)
    console.log('Selected Date:', selectedDate); */

  }

  updateDateArray(
    dateArray: { date: string; value: number }[],
    saleData: { created_at: string; subtotal: number }[],
    count: boolean
  ): { date: string; value: number }[] {
    // Create a mapping of dateArray for faster lookups
    const dateMap = new Map(
      dateArray?.map(item => [item.date, { date: item.date, value: item.value }])
    );

    // Iterate through the sales data
    saleData.forEach(sale => {
      let saleDate: string;

      if (this.displayMode === 'daily') {
        saleDate = new Date(sale.created_at).toISOString().split('T')[0]; // YYYY-MM-DD
      } else if (this.displayMode === 'monthly') {
        saleDate = `${new Date(sale.created_at).getFullYear()}-${String(new Date(sale.created_at).getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
      } else if (this.displayMode === 'yearly') {
        saleDate = `${new Date(sale.created_at).getFullYear()}`; // YYYY
      }

      // Check if the date exists in the dateArray map
      if (dateMap.has(saleDate)) {
        // Add the subtotal to the corresponding date's value
        const entry = dateMap.get(saleDate)!;
        if (count)
          entry.value++;
        else
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
    if (this.displayMode === 'monthly') {
      if (end.getDate() < start.getDate())
        end.setDate(start.getDate());
    }
    if (this.displayMode === 'yearly') {
      if (end.getDate() < start.getDate())
        end.setDate(start.getDate());
      if (end.getMonth() < start.getMonth())
        end.setMonth(start.getMonth());
    }

    while (start <= end) {
      let formattedDate: string;
      // Format the date based on the interval
      if (this.displayMode === 'daily') {
        formattedDate = start.toISOString().split('T')[0]; // YYYY-MM-DD
        dateArray.push({ date: formattedDate, value: 0 });
        start.setDate(start.getDate() + 1); // Increment by 1 day
      } else if (this.displayMode === 'monthly') {
        formattedDate = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`; // YYYY-MM
        dateArray.push({ date: formattedDate, value: 0 });
        start.setMonth(start.getMonth() + 1); // Increment by 1 month
      } else if (this.displayMode === 'yearly') {
        formattedDate = `${start.getFullYear()}`; // YYYY
        dateArray.push({ date: formattedDate, value: 0 });
        start.setFullYear(start.getFullYear() + 1); // Increment by 1 year
      }
    }

    return dateArray;
  }

}
