import { Component, Inject, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';
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
  print_totalnetsales = 0;
  print_tax = 0;
  today: string;
  summary_subtotal = 0;
  summary_hst = 0;
  summary_total = 0;
  categorySummary = [];
  categoryTotal = 0;
  total_discount = [];
  total_discount_value = 0;
  total_discount_qty = 0;
  total_credit = [];
  total_creditcard_amount = 0;

  server_tipouts = {
    'total_cash_payments': { type: 'Total Cash Payments', amount: 0 },
    'cash_adjustments': { type: 'Cash Adjustments', amount: 0 },
    'cash_before_tipouts': { type: 'Cash before Tipouts', amount: 0 },
    'cash_gratuity': { type: 'Cash Gratuity', amount: 0 },
    'non_cash_gratuity': { type: 'Credit/Non-Cash gratuity', amount: 0 },
    'non_cash_tips': { type: 'Credit/Non-Cash tips', amount: 0 },
    'total_none_cash_tips_gratuity': { type: 'Total Non-Cash Tips and Total Gratuity', amount: 0 },
    'total_cash': { type: 'Total Cash', amount: 0 }
  };
  paymentSummary = [];

  totalnonecashtipsandGratuity = -366.79;

  date_s = new Date();
  formtted_date = this.date_s.toISOString().slice(0, 19).replace('T', '');

  reg_outlet: string = this.config.outlet_name;
  reg_register: string = this.config.register_name;
  reg_id = this.config.register;
  reg_openingTime = '';
  showZReport = false; // To control visibility of the Z Report

  rows: Product[] = [];
  currentRow: Product = { id: null, name: '', description: '', product: '' };
  isContentVisible: boolean = false;
  searchQuery: string = '';
  paginatedRows: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(@Inject('APP_CONFIG') private config: any, private customerService: CustomerService) {
    const currentDate = new Date();
    this.today = currentDate.toLocaleDateString(); // Default format (MM/DD/YYYY)
  }
  ngOnInit() {
    this.fetchSearchItems();

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
  roundToTwo(num) {
    return Math.round(num * 100) / 100;
  }
  fetchSearchItems() {
    this.categorySummary = [];
    this.categoryTotal = 0;
    this.print_totalnetsales = 0;
    this.print_tax = 0;
    this.paymentSummary = []; // Initialize as an array
    let index = 0;
    this.total_creditcard_amount = 0;
    this.total_discount_value = 0;
    this.total_discount_qty = 0;

    this.customerService.fetchTodaySale().subscribe(
      (res) => {
        //set time///////////////////
        const startDate = new Date(res.start);
        const endDate = new Date(res.end);

        this.reg_openingTime = `${startDate.toLocaleString('en-US')} ~ ${endDate.toLocaleString('en-US')}`;
        // this.reg_openingTime = `${startDate}~${endDate}`;
        ////////////////////////////////////
        const groupedSales = res.data.reduce((acc, item) => {

          this.print_tax += item.tax * 1;
          this.print_totalnetsales += item.subtotal * 1;

          //Server Tipsouts
          if (item.payments && item.payments.length > 0) {
            item.payments.forEach(element => {
              //credit card breakdown

              //server tipouts
              if (element.type === 'cash') {
                // Update total cash payments
                this.server_tipouts['total_cash_payments'].amount = this.roundToTwo(
                  this.server_tipouts['total_cash_payments'].amount + element.amount
                );
              } else {
                this.total_creditcard_amount = this.roundToTwo(this.total_creditcard_amount + element.amount);
              }
              // else {
              // Handle non-cash payments
              if (!this.total_credit[element.type]) {
                this.total_credit[element.type] = 0;
              }
              // console.log(`index:${index++}=${element.type}:${element.amount}`);
              this.total_credit[element.type] = this.roundToTwo(
                this.total_credit[element.type] + element.amount
              );

              // }
            });
          }
          if (item.products && item.products.length > 0) {
            item.products.forEach(el => {
              // console.log('--------------', el.discount.mode, el.discount.value);
              if (el.discount.value != 0 && el.discount.mode == 'percent') {
                this.server_tipouts['cash_adjustments'].amount += el.price * el.qty * el.discount.value / 100;
                if (!this.total_discount[el._id]) {
                  this.total_discount[el._id] = {
                    name: el.product_name,
                    value: 0, //el.price,
                    qty: 0, //el.qty,
                    // discount: el.discount.value,
                  };
                }
                this.total_discount[el._id].qty += el.qty;
                this.total_discount[el._id].value += el.price * el.qty * el.discount.value / 100;
                this.total_discount_value += el.price * el.qty * el.discount.value / 100;
                this.total_discount_qty += el.qty;
              }
              //category
              if (!this.categorySummary[el._id]) {
                this.categorySummary[el._id] = {
                  ...el,
                  category_amount: 0
                };
              }
              this.categorySummary[el._id].category_amount += el.qty;
              this.categoryTotal += el.price;
            });
          }
          this.server_tipouts['cash_gratuity'].amount += item.cash_tip;
          this.server_tipouts['non_cash_gratuity'].amount += item.tip;
          // if (item.payment_status == 'cash') {
          //   if (item.voided == true || item.returned == true) {
          //     this.server_tipouts['cash_adjustments'].amount += item.total_paid;
          //   }
          // }

          //payments
          let paymentType = acc[item.payment_status];

          if (!paymentType) {
            paymentType = {
              type: item.payment_status,
              expected: 0,
              counted: 0,
              differences: 0
            };
            acc[item.payment_status] = paymentType;
            this.paymentSummary.push(paymentType); // Push to paymentSummary
          }

          // Update expected and counted amounts
          paymentType.expected = this.roundToTwo(paymentType.expected + item.total);
          paymentType.counted = this.roundToTwo(paymentType.counted + item.total_paid);
          paymentType.differences = paymentType.expected - paymentType.counted;


          this.calc_server_tipsouts();

          return acc;
        }, {});

        console.log(this.total_discount);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  calc_server_tipsouts() {
    this.server_tipouts['cash_before_tipouts'].amount = this.server_tipouts['total_cash_payments'].amount - this.server_tipouts['cash_adjustments'].amount;

    this.server_tipouts['total_none_cash_tips_gratuity'].amount = this.server_tipouts['non_cash_gratuity'].amount + this.server_tipouts['non_cash_tips'].amount;

    this.server_tipouts['total_cash'].amount = this.server_tipouts['total_cash_payments'].amount + this.server_tipouts['cash_adjustments'].amount + this.server_tipouts['cash_gratuity'].amount + this.server_tipouts['non_cash_gratuity'].amount + this.server_tipouts['non_cash_tips'].amount;

  }
  formatCurrency(total: number): string {
    return `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }


  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
    if (this.isContentVisible) { this.closeRegister(); }
  }

  openEditModal(row: Product) {
    this.currentRow = { ...row };
    // $('#editModal').show();
  }

  updateDifference(payment: any) {
    payment.differences = payment.expected - payment.counted;
  }

  closeRegister() {
    this.showZReport = true; // Show Z Report
    this.printZReport(); // Optionally, print immediately
  }
  totalExpected() {
    return this.paymentSummary.reduce((sum, payment) => sum + payment.expected, 0);
  }

  totalCounted() {
    return this.paymentSummary.reduce((sum, payment) => sum + payment.counted, 0);
  }

  totalDifference() {
    return this.paymentSummary.reduce((sum, payment) => sum + payment.differences, 0);
  }
  printZReport() {
    setTimeout(() => {
      window.print(); // Print the current window
    }, 1000); // Delay to allow the Z Report to render
  }


}
