import { Component, Inject, OnInit } from '@angular/core';
import { ReportingService } from 'app/api/reporting/api.service';
import { CustomerService } from 'app/api/salesledger/api.service';
import { ToastService } from 'app/component/toast/toast.service';
import { quantity } from 'chartist';


@Component({
  selector: 'app-openclose',
  templateUrl: './openclose.component.html',
  styleUrls: ['./openclose.component.scss']
})
export class OpencloseComponent implements OnInit {


  isOpenClose = false;
  isConfirmClose = false;

  //create new order
  openingFloat: number; // Property for opening float
  new_note: string; // Property for notes
  selected_reg: string; // Property for selected register

  openclose: any = [];

  isCreateOpenClose = false;


  total_creditcard_amount = 0;

  payhistory = [];
  producttype: any;
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


  constructor(
    @Inject('APP_CONFIG') private config: any,
    private customerService: CustomerService,
    private reportingservice: ReportingService,
    private toastService: ToastService,
  ) {
    const currentDate = new Date();
  }
  ngOnInit() {
    this.fetchSearchItems();


  }
  nowday(str: string): string {
    let today = new Date();
    if (str !== 'now') {
      today = new Date(str);
    }

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(today.getDate()).padStart(2, '0');

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`; // Returns '2025-01-20 10:11:00'
  }
  roundToTwo(num) {
    return Math.round(num * 100) / 100;
  }
  createNewOpenClose() {
    // Logic to handle opening a register

    let createData = {
      status: 1,
      register: this.selected_reg,
      open_note: this.new_note || '',
    };

    // console.log(createData);
    if (!createData.register) {
      this.toastService.showToast('Please select register.', 'warning', 3000);
      this.isCreateOpenClose = false;
      return;
    }
    this.customerService.createOpenClose(createData).subscribe(
      (res) => {
        this.toastService.showToast('Register opened successfully.', 'success', 3000);

        this.isCreateOpenClose = false;
        this.isOpenClose = false;
        this.fetchSearchItems();

      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
        this.isCreateOpenClose = false;

      }
    );
  }
  registers: any;
  confirmCreate() {
    this.isCreateOpenClose = true;
  }
  fetchSearchItems() {
    this.categorySummary = [];

    this.paymentSummary = []; // Initialize as an array
    this.reportingservice.fecthRegister().subscribe(
      (res) => {
        // this.seletced_reg = this.config.register_id;
        this.registers = res;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );

    this.customerService.fetchCatetogry().subscribe(
      (res) => {
        this.producttype = {};
        Object.keys(res).forEach(key => {
          const element = res[key]; // Access the element using the key
          if (element._id) { // Check if _id exists
            this.producttype[element._id] = element; // Assign the element to producttype using _id as the key
          }
        });
        console.log(this.producttype);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
    this.customerService.fetchTodaySale().subscribe(
      (res) => {
        if (res.length === 0) {
          // this.preparingToOpen();
          return;
        } else {
          this.isOpenClose = true;
        }
        this.openclose = res[0];

        if (res[0].payment_data.all_payments.length > 0) {
          res[0].payment_data.all_payments.forEach(element => {
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
                } else if (el.type == 'credit') {
                  this.total_creditcard_amount += el.amount;
                }
              });
            }


            if (element.products.length > 0) {
              element.products.forEach(({ product_id, product_name, qty, tax, price, discount }) => {
                // const productType = product_id._id;
                const productType = product_id.type._id;


                // Initialize category summary if it doesn't exist
                if (!this.categorySummary[productType]) {
                  this.categorySummary[productType] = {
                    name: product_id.type.name,
                    qty: 0,
                    cost: 0,
                  };
                }

                //calc servertipout cash adjstments
                if (discount.mode == 'percent') {
                  this.serverTipout.cashAdjustments.bal += qty * price * discount.value / 100;
                }
                //product discount
                if (discount.value != 0) {

                  if (!this.discounts[productType]) {

                    this.discounts[productType] = {
                      product_name: product_name,
                      mode: discount.mode,
                      value: discount.value,
                      qty: 0,
                      bal: 0,
                    }
                  }
                  this.discounts[productType].qty += qty;
                  if (discount.mode == 'percent') {

                    this.discounts[productType].bal += qty * price * discount.value / 100;
                  }
                }

                // Update quantities, taxes, and prices
                this.categorySummary[productType].qty += qty;
                this.categorySummary[productType].cost += qty * price;

                // Update overall category sums
                this.categorySum.qty += qty;
                this.categorySum.expect += qty * price; // Changed from 'expect' to 'expected'
                // console.log(`${product_name}===> ${qty}(qty)*${price}(price): ${this.categorySum.expect}`);
              });

            }
          });
        }
        if (res[0].payment_data.cash_movements.length > 0) {
          res[0].payment_data.cash_movements.forEach(element => {
            if (!this.paymentSummary['cash']) {
              this.paymentSummary['cash'] = {
                expected: 0,
                counted: 0,
                differences: 0
              };
            }
            this.paymentSummary['cash'].expected += element.transaction;
            this.paymentSummary['cash'].counted += element.transaction;
            this.paymentSum.expected += element.transaction;
            this.paymentSum.counted += element.transaction;


            if (!this.payhistory['cash']) {
              this.payhistory['cash'] = {
                bal: 0
              }
            }
            this.payhistory['cash'] += element.transaction;

            this.zSalesTaxesSummary.totalNetSale += element.transaction;
            this.zSalesTaxesSummary.total += element.transaction;
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



  toggleContent() {
    this.isConfirmClose = true;
    // this.isContentVisible = !this.isContentVisible;
    // if (this.isContentVisible) { this.closeRegister(); }
  }


  confirmCloseRegister() {
    // console.log(this.paymentSummary['cash']);
    this.isContentVisible = true;
    this.isConfirmClose = false;
    this.printReport()
    let saveData = {
      _id: this.openclose._id,
      counted: {
        cash: this.paymentSummary['cash']?.counted || 0,
        credit_card: this.paymentSummary['credit']?.counted || 0,
        master_card: this.paymentSummary['master']?.counted || 0,
        debit_card: this.paymentSummary['debit']?.counted || 0,
      },
      status: 2,
      open_value: (this.paymentSum.counted - this.zSalesTaxesSummary.total),
    };
    // this.customerService.updateOpenClsoe(saveData).subscribe(
    //   (res) => {
    //     //save successful toast
    //     this.isConfirmClose = false;
    //     this.isContentVisible = true;
    //     if (this.isContentVisible) { this.closeRegister(); }
    //     // this.toastService.showToast('Closed Register updated successfully.', 'success', 3000);
    //   },
    //   (error) => {
    //     console.error('Error fetching customer data:', error);
    //     // Handle the error as needed
    //   }
    // );
    // console.log(saveData);

  }

  calculatePaymentSum() {
    // Reset totals
    this.paymentSum.expected = 0;
    this.paymentSum.counted = 0;
    this.paymentSum.differences = 0;

    // Calculate new totals
    Object.values(this.paymentSummary).forEach(({ expected, counted, differences }) => {
      this.paymentSum.expected += expected;
      this.paymentSum.counted += counted;
      this.paymentSum.differences += differences;
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

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  printReport() {
    const reportWindow = window.open('', '', 'height=842,width=595'); // A4 size in pixels at 72 DPI
    reportWindow.document.write(`
      <html>
        <head>
          <title>Z Report</title>
          <style>
             @page {
        size: A4;
        /* Set the page size to A4 */
        margin: 10mm;
        /* Set margins for the print */
    }

    body {
        font-size: 14pt;
        /* Base font size for print */
    }


    .print-roll-bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 95vh;
        z-index: 1000;
    }

    .print-roll {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        // position: absolute;
        // max-height: 90%;
        // overflow-y: auto;
        // top: 20%;
        // left: 30%;
    }

    .z-report {
        border: 1px solid #8b8b8b;
        /* Keep the border for print */
        background-color: #f9f9f9;
        /* Maintain background color */
        margin-top: 20px;
        /* Keep top margin */
        padding: 10px;
        /* Add padding for print */
    }

    .z-report h3 {
        text-align: center;
        /* Center align heading */
        font-size: 20px;
        /* Adjust font size for print */
        margin-bottom: 15px;
        /* Reduce bottom margin */
    }

    .z-report h4 {
        font-size: 18px;
        /* Adjust font size for print */
        margin-top: 10px;
        /* Reduce top margin */
    }

    .z-report p {
        font-size: 14px;
        /* Adjust font size for print */
        margin: 5px 0;
        /* Add margin for spacing */
    }

    .z-report table {
        width: 100%;
        /* Full width for tables */
        border-collapse: collapse;
        /* Merge borders */
        margin-top: 10px;
        /* Maintain top margin */
    }

    .z-report th,
    .z-report td {
        border: 1px solid #ddd;
        /* Keep border for cells */
        text-align: left;
        /* Left align text */
        padding: 8px;
        /* Add padding for cells */
    }

    .z-report th {
        background-color: #f2f2f2;
        /* Light gray background for headers */
        font-weight: bold;
        /* Bold text for headers */
    }

    .z-report .total-border {
        font-weight: bold;
        /* Bold text for total */
        background-color: #e9e9e9;
        /* Light background for total */
    }

    .print-table {
        border: none !important;
        /* Remove borders */
        background: none !important;
        /* Remove background */
        font-size: 1rem;
        /* Adjust font size for print */
        padding: 0 !important;
        /* Remove padding */
        margin: 0 !important;
        /* Remove margin */
        text-align: center;
        /* Center align text */
    }
          </style>
        </head>
        <body>
          <div class="print-roll-bg">
            <div class="z-report print-roll">
              <div class="print-table">
                <div class="border just-row mb-1">
                  <b>Z Report</b> (${this.nowday(this.openclose?.opening_time)} - ${this.nowday('now')})
                </div>
                <div class="mb-1">
                  <div class="border" style="text-align: center;">
                    <b>SALES AND TAXES SUMMARY</b>
                  </div>
                  <div class="border">
                    <div class="just-row">
                      <span>Total Net Sales</span>
                      <span>${this.formatCurrency(this.zSalesTaxesSummary.totalNetSale)}</span>
                    </div>
                    <div class="just-row">
                      <span>Tax</span>
                      <span>${this.formatCurrency(this.zSalesTaxesSummary.tax)}</span>
                    </div>
                  </div>
                  <div class="just-row">
                    <span><b>Total Sales</b></span>
                    <span><b>${this.formatCurrency(this.zSalesTaxesSummary.total)}</b></span>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="border"><b>PAYMENT DETAILS</b></div>
                  <table style="border: none;" class="print-table">
                    <tbody class="border">
                      <tr *ngFor="let payment of paymentSummary | keyvalue">
                        <td class="print-table" style="float: left;"></td>
                        <td class="print-table" style="float: right;"></td>
                      </tr>
                      <tr>
                        <td class="print-table" style="float: left;"><b>Total Payments</b></td>
                        <td class="print-table" style="float: right;">
                          <b>${this.formatCurrency(this.paymentSum.counted)}</b>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="mb-1">
                  <div class="just-row">
                    <b>Total Payments - Total Sales =</b>
                    <b>${this.formatCurrency(this.paymentSum.counted - this.zSalesTaxesSummary.total)}</b>
                  </div>
                </div>
                <div class="mb-1">
                  <div class="border"><b>SERVER TIPOUTS</b></div>
                  <table style="border: none;" class="print-table">
                    <tbody>
                      <tr>
                        <td class="print-table" style="float: left;">${this.serverTipout.cash.type}</td>
                        <td class="print-table" style="float: right;">${this.formatCurrency(this.serverTipout.cash.bal)})}</td>
                      </tr>
                      <!-- Additional rows for other tipouts -->
                      <tr class="border">
                        <td class="print-table" style="float: left;font-style: italic;">${this.serverTipout.totalNonCashtip.type}</td>
                        <td class="print-table" style="float: right;">${this.formatCurrency(this.serverTipout.cashAdjustments.bal)}</td>
                      </tr>
                     
                    </tbody>
                  </table>
                </div>
                <!-- Additional sections for discounts, credit card breakdown, etc. -->
              </div>
            </div>
          </div>
        </body>
      </html>
    `);
    reportWindow.document.close();
    reportWindow.print();
  }

}
