import { Component, Inject, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';
import { quantity } from 'chartist';


@Component({
  selector: 'app-openclose',
  templateUrl: './openclose.component.html',
  styleUrls: ['./openclose.component.scss']
})
export class OpencloseComponent implements OnInit {

  openclose: any;

  total_creditcard_amount = 0;

  payhistory = [];

  categorySummary = [];
  categorySum = {
    qty: 0,
    expect: 0,
    tax: 0,
  };
  paymentSummary = [];
  paymentSum = {
    expected: 0,
    counted: 0,
    differences: 0,
  };

  zSalesTaxesSummary = {
    totalNetSale: 0,
    tax: 0,
    total: 0,
  };
  serverTipout = {
    cash: {
      type: 'Total Cash Payments',
      bal: 0
    },
    cashAdjustments: {
      type: 'Cash Adjstments',
      bal: 0
    },
    cashBeforeTip: {
      type: 'Cash before Tipouts',
      bal: 0,
    },
    cashGratuity: {
      type: 'Cash Gratuity',
      bal: 0,
    },
    noneCashGratuity: {
      type: 'Credit/Non-Cash gratuity',
      bal: 0,
    },
    noneCashTip: {
      type: 'Credit/Non-Cash tips',
      bal: 0,
    },
    totalNonCashtip: {
      type: 'Total Non-Cash Tips and Total Gratuity',
      bal: 0,
    },
    total: {
      bal: 0
    }
  };
  discounts = [];

  showZReport = false; // To control visibility of the Z Report

  isContentVisible: boolean = false;


  constructor(private customerService: CustomerService) {
    const currentDate = new Date();
  }
  ngOnInit() {
    this.fetchSearchItems();


  }
  roundToTwo(num) {
    return Math.round(num * 100) / 100;
  }
  fetchSearchItems() {
    this.categorySummary = [];

    this.paymentSummary = []; // Initialize as an array

    // this.customerService.fetchOpenClose().subscribe(
    //   (res) => {
    //   },
    //   (error) => {
    //     console.error('Error fetching customer data:', error);
    //     // Handle the error as needed
    //   }
    // );
    this.customerService.fetchTodaySale().subscribe(
      (res) => {
        this.openclose = res;
        if (res.payment_data.all_payments.length > 0) {
          res.payment_data.all_payments.forEach(element => {
            // Ensure paymentSummary is initialized for the correct payment status
            if (!this.paymentSummary[element.payment_status]) {
              this.paymentSummary[element.payment_status] = {
                expected: 0,
                counted: 0,
                differences: 0
              };
            }
            console.log(element.tip, '-------', element.cash_tip);
            //calc cash tips 
            this.serverTipout.cashGratuity.bal += element.cash_tip;
            this.serverTipout.noneCashTip.bal += element.tip;

            // Now, use the same payment status to aggregate data
            this.paymentSummary[element.payment_status].expected += element.total;
            this.paymentSummary[element.payment_status].counted =
              (this.paymentSummary[element.payment_status].counted * 1000 + element.total_paid * 1000) / 1000;
            this.paymentSummary[element.payment_status].differences += (element.total - element.total_paid);
            this.paymentSum.expected += element.total;
            this.paymentSum.counted += element.total_paid;
            this.paymentSum.differences += element.total - element.total_paid;

            //calc sales and taxes summary
            this.zSalesTaxesSummary.totalNetSale += element.subtotal;
            this.zSalesTaxesSummary.tax += element.tax;
            this.zSalesTaxesSummary.total += element.subtotal + element.tax;

            if (element.payments.length > 0) {
              element.payments.forEach(el => {
                if (!this.payhistory[el.type]) {
                  this.payhistory[el.type] = {
                    bal: 0
                  }
                }
                this.payhistory[el.type].bal += el.amount;

                if (el.type == 'cash') {
                  this.serverTipout.cash.bal += el.amount;
                } else {
                  this.total_creditcard_amount += el.amount;
                }
              });
            }


            if (element.products.length > 0) {
              element.products.forEach(({ product_id, product_name, qty, tax, price, discount }) => {
                const productId = product_id._id;

                // Initialize category summary if it doesn't exist
                if (!this.categorySummary[productId]) {
                  this.categorySummary[productId] = {
                    product_name: product_name,
                    qty: 0,
                    tax: 0,
                    price: price,
                  };
                }

                //calc servertipout cash adjstments
                if (discount.mode == 'percent') {
                  this.serverTipout.cashAdjustments.bal += qty * price * discount.value / 100;
                }
                //product discount
                if (discount.value != 0) {

                  if (!this.discounts[productId]) {

                    this.discounts[productId] = {
                      product_name: product_name,
                      mode: discount.mode,
                      value: discount.value,
                      qty: 0,
                      bal: 0,
                    }
                  }
                  this.discounts[productId].qty += qty;
                  if (discount.mode == 'percent') {

                    this.discounts[productId].bal += qty * price * discount.value / 100;
                  }
                }

                // Update quantities, taxes, and prices
                this.categorySummary[productId].qty += qty;
                this.categorySummary[productId].tax += tax;

                // Update overall category sums
                this.categorySum.qty += qty;
                this.categorySum.tax += tax;
                this.categorySum.expect += qty * price; // Changed from 'expect' to 'expected'
                // console.log(`${product_name}===> ${qty}(qty)*${price}(price): ${this.categorySum.expect}`);
              });

            }
          });
        }
        console.log(this.categorySummary);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  calc_server_tipsouts() {


  }
  formatCurrency(total: number): string {
    return `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }


  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
    if (this.isContentVisible) { this.closeRegister(); }
  }

  calculatePaymentSum() {
    // Reset totals
    this.paymentSum.expected = 0;
    this.paymentSum.counted = 0;
    this.paymentSum.differences = 0;

    // Calculate new totals
    Object.values(this.paymentSummary).forEach(element => {
      this.paymentSum.expected += element.expected;
      this.paymentSum.counted += element.counted;
      this.paymentSum.differences += element.differences;
    });

  }
  updateDifference(payment: any) {
    payment.differences = payment.expected - payment.counted;
    this.calculatePaymentSum();
  }

  closeRegister() {
    this.showZReport = true; // Show Z Report
    this.printZReport(); // Optionally, print immediately
  }

  printZReport() {
    setTimeout(() => {
      window.print(); // Print the current window
    }, 1000); // Delay to allow the Z Report to render
  }


}
