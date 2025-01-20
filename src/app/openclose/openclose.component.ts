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
                const productType = product_id.type;


                // Initialize category summary if it doesn't exist
                if (!this.categorySummary[productType]) {
                  this.categorySummary[productType] = {
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
                this.categorySummary[productType].tax += tax;

                // Update overall category sums
                this.categorySum.qty += qty;
                this.categorySum.tax += tax;
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
  formatCurrency(total: number): string {
    return `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }


  toggleContent() {
    this.isConfirmClose = true;
    // this.isContentVisible = !this.isContentVisible;
    // if (this.isContentVisible) { this.closeRegister(); }
  }


  confirmCloseRegister() {
    // console.log(this.paymentSummary['cash']);
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
    this.customerService.updateOpenClsoe(saveData).subscribe(
      (res) => {
        //save successful toast
        this.isConfirmClose = false;
        this.isContentVisible = true;
        if (this.isContentVisible) { this.closeRegister(); }
        // this.toastService.showToast('Closed Register updated successfully.', 'success', 3000);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
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


}
