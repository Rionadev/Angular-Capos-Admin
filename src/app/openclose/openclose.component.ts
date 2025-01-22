import { Component, Inject, OnInit } from '@angular/core';
import { ReportingService } from 'app/api/reporting/api.service';
import { CustomerService } from 'app/api/salesledger/api.service';
import { ToastService } from 'app/component/toast/toast.service';
import { quantity } from 'chartist';
import { run } from 'googleapis/build/src/apis/run';


@Component({
  selector: 'app-openclose',
  templateUrl: './openclose.component.html',
  styleUrls: ['./openclose.component.scss']
})
export class OpencloseComponent implements OnInit {

  isClosedReg = false;

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
  categorySummary = [];
  categorySum: any;
  paymentSummary = [];
  paymentSum: any;
  zSalesTaxesSummary: any;
  serverTipout: any
  discounts = [];

  showZReport = false; // To control visibility of the Z Report

  isContentVisible: boolean = false;
  opencloseHistory: any = [];

  constructor(
    @Inject('APP_CONFIG') private config: any,
    private customerService: CustomerService,
    private reportingservice: ReportingService,
    private toastService: ToastService,
  ) {
    const currentDate = new Date();
  }
  init_var() {
    this.isClosedReg = false;
    this.isOpenClose = false;
    this.isConfirmClose = false;
    this.isCreateOpenClose = false;
    this.total_creditcard_amount = 0;
    this.openclose = [];

    this.openingFloat = null; // Property for opening float
    this.new_note = ''; // Property for notes
    this.selected_reg = ''; // Property for selected register

    this.payhistory = [];
    this.categorySummary = [];
    this.categorySum = {
      qty: 0,
      expect: 0,
      tax: 0,
    };
    this.paymentSummary = [];
    this.paymentSum = {
      expected: 0,
      counted: 0,
      differences: 0,
    };

    this.zSalesTaxesSummary = {
      totalNetSale: 0,
      tax: 0,
      total: 0,
    };
    this.serverTipout = {
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
    this.discounts = [];

    this.showZReport = false; // To control visibility of the Z Report

    this.isContentVisible = false;
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
  getLastRegisters() {
    console.log('-----------------')
    this.customerService.fecthLastOpenCloseDatar().subscribe(
      (res) => {
        let paymentlist = [];
        this.opencloseHistory = res;
        if (this.opencloseHistory.payment_data) {
          this.calc_quickView(this.opencloseHistory.payment_data);
        }
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );

  }
  goToReg() {
    // this.init_var();
    console.log(this.selected_reg);
  }
  fetchSearchItems() {
    this.init_var();

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

    this.customerService.fetchTodaySale().subscribe(
      (res) => {
        if (res.length === 0) {
          // this.preparingToOpen();
          this.getLastRegisters();
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
    // this.isConfirmClose = false;
    // this.isClosedReg = true;
    this.customerService.updateOpenClsoe(saveData).subscribe(
      (res) => {
        //save successful toast
        this.isConfirmClose = false;
        this.isClosedReg = true;
        // this.isContentVisible = true;
        // if (this.isContentVisible) { this.closeRegister(); }
        this.toastService.showToast('Closed Register updated successfully.', 'success', 3000);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
        this.toastService.showToast('Failed Closing Register .', 'warning', 3000);

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

  formatCurrency(amount: number, currency: string = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  }

  printReport() {

    console.log('paymentsummary:', this.paymentSummary);
    console.log('discounts:', this.discounts);
    console.log('payhistory:', this.payhistory);
    console.log('categorySummary:', this.categorySummary);


    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Open|Close Register</title>
            <style>
              @page {
                size: A4; /* Set the page size to A4 */
                margin: 20mm; /* Set margins */
              }
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                width: 100%;
                height: 100%;
                box-sizing: border-box;
              }
h1 {
    text-align: center;
}

div {
    page-break-inside: avoid; /* Avoid page breaks inside this div */
    margin-bottom: 1rem; /* Maintain bottom margin */
}

.border {
    border-bottom: 1px solid gray; /* Keep the border */
}

.z-report {
    border: 1px solid #dcdcdc; /* Lighter border for a softer look */
    background-color: #ffffff; /* White background */
    margin-top: 20px; /* Keep top margin */
    padding: 15px; /* Add padding for print */
    border-radius: 8px; /* Rounded corners for a modern touch */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
}

.z-report h3 {
    text-align: center; /* Center align heading */
    font-size: 22px; /* Slightly larger font size */
    margin-bottom: 15px; /* Reduce bottom margin */
    color: #333; /* Darker text color for better readability */
}

.z-report h4 {
    font-size: 20px; /* Slightly larger font size */
    margin-top: 10px; /* Reduce top margin */
    color: #555; /* Medium gray color */
}

.z-report p {
    font-size: 14px; /* Adjust font size */
    margin: 5px 0; /* Add margin for spacing */
    color: #666; /* Lighter gray for paragraph text */
}

.z-report table {
    width: 100%; /* Full width for tables */
    border-collapse: collapse; /* Merge borders */
    margin-top: 10px; /* Maintain top margin */
}

.z-report th,
.z-report td {
    padding: 0.75rem; /* Add padding for cells */
    text-align: left; /* Left align text */
    border: none; /* No border for cells */
}

.z-report th {
    background-color: #f7f7f7; /* Very light gray background for headers */
    font-weight: bold; /* Bold text for headers */
    color: #333; /* Darker text color */
}

/* Style for odd rows */
.z-report tr:nth-child(odd) {

    background-color: #f0f0f0; /* Light gray for odd rows */
}

.z-report .total-border {
    font-weight: bold; /* Bold text for total */
    background-color: #f0f0f0; /* Light background for total */
}

.print-table {
    background-color: #ffffff !important; /* White background */
    font-size: 1rem; /* Adjust font size for print */
    text-align: center; /* Center align text */
}


            </style>
          </head>
          <body>
            <h1>Z Report</h1>
            <div>${this.getStrContent()}</div>
            <script>
              window.onafterprint = function() {
                window.close();
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  }
  getStrContent(): string {
    return `<div class="print-table">
            <div class="border just-row mb-1" style="justify-content: space-between;">
                (${this.nowday(this.openclose?.opening_time)} - ${this.nowday('now')})
            </div>
            <div class="mb-1">
                <div class="border" style="text-align: center;">
                    <b>SALES AND TAXES SUMMARY</b>
                </div>
                <div class="border">
                    <div class="just-row">
                        <span>Total Net Sales</span>
                        <span>${this.formatCurrency(this.zSalesTaxesSummary.totalNetSale)}</span>
                        +
                        <span>Tax</span>
                        <span>${this.formatCurrency(this.zSalesTaxesSummary.tax)}</span>
                   
                      =
                    <span><b>Total Sales</b></span>
                    <span><b>${this.formatCurrency(this.zSalesTaxesSummary.total)}</b></span>
                </div>
            </div>



            <div class="mb-1">
                <div class="border"><b>PAYMENT DETAILS</b></div>
                <table style="width:100%;" class="print-table">

                    <tbody class="border">
                      ${this.str_paymentDetails(this.paymentSummary)}
                    </tbody>
                    <tr>
                        <td class="print-table" style="float: left;"><b>Total Payments</b></td>
                        <td class="print-table" style="float: right;">
                            <b>${this.formatCurrency(this.paymentSum.counted)}</b>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="mb-1">
                <div class="just-row">
                    <b>Total Payments - Total Sales =</b>
                    <b>${(this.formatCurrency(this.paymentSum.counted - this.zSalesTaxesSummary.total))}</b>
                </div>
            </div>
            <div class="mb-1">
                <div class="border"><b>SERVER TIPOUTS</b></div>
                <table style="width:100%" class="print-table">
                    <tbody>

                        <tr>
                            <td class="print-table" style="float: left;">
                                ${this.serverTipout.cash.type}
                            </td>
                            <td class="print-table" style="float: right;">
                                ${this.formatCurrency(this.serverTipout.cash.bal)}
                            </td>
                        </tr>
                        <tr>
                            <td class="print-table" style="float: left;">
                                ${this.serverTipout.cashAdjustments.type}
                            </td>
                            <td class="print-table" style="float: right;">
                                ${this.formatCurrency(this.serverTipout.cashAdjustments.bal)}
                            </td>
                        </tr>
                        <tr>
                            <td class="print-table" style="float: left;font-style: italic;">
                                ${this.serverTipout.cashBeforeTip.type}
                            </td>
                            <td class="print-table" style="float: right;">
                                ${this.formatCurrency(this.serverTipout.cash.bal + this.serverTipout.cashAdjustments.bal)}
                            </td>
  </tr>
  <tr >
  <td class="print-table" style = "float: left;" >
    ${this.serverTipout.cashGratuity.type}
</td>
  <td class="print-table" style = "float: right;" >
    ${this.formatCurrency(-this.serverTipout.cashGratuity.bal)}
</td>
  </tr>
  <tr >
  <td class="print-table" style = "float: left;" >
    ${this.serverTipout.noneCashGratuity.type}
</td>
  <td class="print-table" style = "float: right;" >
    ${this.formatCurrency(-this.serverTipout.noneCashGratuity.bal)}
</td>
  </tr>
  <tr >
  <td class="print-table" style = "float: left;" >
    ${this.serverTipout.noneCashTip.type}
</td>
  <td class="print-table" style = "float: right;" >
    ${this.formatCurrency(-this.serverTipout.noneCashTip.bal)}
</td>
  </tr>
  <tr class="border" >
    <td class="print-table" style = "float: left;font-style: italic;" >
      ${this.serverTipout.totalNonCashtip.type}
</td>
  <td class="print-table" style = "float: right;" >
    ${this.formatCurrency
        (
          -this.serverTipout.cashGratuity.bal
          - this.serverTipout.noneCashGratuity.bal
          - this.serverTipout.noneCashTip.bal)
      }
</td>
  </tr>
  <tr >
  <td class="print-table" style = "float: left;" >
    <b>Total Cash </b>
      </td>
      <td class="print-table" style = "float: right;" >
        <b>${this.formatCurrency
        (this.serverTipout.cash.bal
          + this.serverTipout.cashAdjustments.bal
          - this.serverTipout.cashGratuity.bal
          - this.serverTipout.noneCashGratuity.bal
          - this.serverTipout.noneCashTip.bal)
      }</b>
  </td>
  </tr>
  </tbody>
  </table>
  </div>
  <div class="mb-1">
    <div class="border"><b>TOTAL DISCOUNTS </b></div >
      <table style="width:100%" class="print-table" >
        <thead class="border" >
          <tr>
          <td class="print-table" style = "float: left;" > Discount Name </td>
            <td class="print-table" > Count </td>
              <td class="print-table" style = "float: right;" > Amount </td>
                </tr>
                </thead>
                <tbody class="border" >
                  ${this.str_discounts(this.discounts)}
  </tbody>

  </table>
  </div>

  <div class="mb-1" >
    <div class="border" > <b>CREDIT CARD BREAKDOWN </b></div >
      <table style="width:100%" class="print-table" >
        <tbody class="border" >
         ${this.str_payhistory(this.payhistory)}
  </tbody>
  <tr >
  <td class="print-table" style = "float: left;" > <b>Total </b></td >
    <td class="print-table" style = "float: right;" >
      <b>${this.formatCurrency(this.total_creditcard_amount)}</b>
        </td>
        </tr>

        </table>
        </div>
        <div class="mb-1" >
          <div class="border"><b>SALES CATEGORIES </b></div >
            <table style="width:100%" class="print-table" >
              <thead class="border" >
                <tr>
                <td class="print-table" style = "float: left;" > Category </td>
                  <td class="print-table" > Quantity </td>
                    <td class="print-table" style = "float: right;" > Net Sales </td>
                      </tr>
                      </thead>
                      <tbody class="border" >
                      ${this.str_categorySummary(this.categorySummary)}
                      

  </tbody>
  <tr >
  <td class="print-table" style = "float: left;" > <b>Total Net Sales </b></td >
    <td class="print-table" > </td>
      <td class="print-table" style = "float: right;" >
        <b>${this.formatCurrency(this.categorySum.expect)}</b>
          </td>
          </tr>
          </table>
          </div>
          </div>`;

  }
  str_paymentDetails(paymentsummary: any): string {

    let str = '';

    for (const [key, value] of Object.entries(paymentsummary)) {
      str += `
<tr>
    <td class="print-table" style="float: left;">${key}</td>
    <td class="print-table" style="float: right;">${this.formatCurrency(value['counted'])}</td>
</tr>
`;
    }
    return str;
  }
  str_discounts(discountlist: any): string {

    let str = '';
    if (discountlist.length == 0) return '';
    for (const [key, value] of Object.entries(discountlist)) {
      str += `
<tr>
    <td class="print-table" style="float: left;">${value['product_name']}</td>
    <td class="print-table">${value['qty']}%</td>
    <td class="print-table" style="float: right;">${this.formatCurrency(value['bal'])}</td>
</tr>
`;
      return str;
    }
  }
  str_payhistory(paidData: any): string {

    let str = '';
    if (paidData.length == 0) return '';
    for (const [key, value] of Object.entries(paidData)) {
      if (key != 'cash') {
        str += `
        <tr>
        <td class="print-table" style="float: left;">${key}</td>
        <td class="print-table" style="float: right;">${this.formatCurrency(value['bal'])}</td>
        </tr>
        `;
      }
      return str;
    }
  }
  str_categorySummary(categorysummary: any): string {

    let str = '';
    if (categorysummary.length == 0) return '';
    for (const [key, value] of Object.entries(categorysummary)) {
      str += `
        <tr>
        <td class="print-table" style="float: left;">${value['name']}</td>
        <td class="print-table" > (${value['qty']})</td>
        <td class="print-table" style="float: right;">${this.formatCurrency(value['cost'])}</td>
        </tr>
        `;
      return str;
    }
  }
  last_payment = {
    cash: 0,
    credit: 0,
    debit: 0,
    other: 0,
    sotre_credit: 0,
    refunds: 0,
    voided: 0,
    sum: 0,

  };
  calc_quickView(pay_data: any) {
    this.last_payment = {
      cash: 0,
      credit: 0,
      debit: 0,
      other: 0,
      sotre_credit: 0,
      refunds: 0,
      voided: 0,
      sum: 0,
    };
    //all payment
    if (pay_data && pay_data.all_payments.length > 0) {
      pay_data.all_payments.forEach(element => {
        if (element.payment_status == 'cash') {
          this.last_payment['cash'] += element.total_paid;
          this.last_payment.sum += element.total_paid;
        } else if (element.payment_status == 'credit') {
          this.last_payment['credit'] += element.total_paid;
          this.last_payment.sum += element.total_paid;

        } else if (element.payment_status == 'debit') {
          this.last_payment['debit'] += element.total_paid;
          this.last_payment.sum += element.total_paid;
        } else {
          this.last_payment['other'] += element.total_paid;
          this.last_payment.sum += element.total_paid;
        }
      });
    }
    //returns
    if (pay_data && pay_data.all_returns.length > 0) {
      pay_data.all_returns.forEach(element => {
        this.last_payment['refunds'] += element.total_paid;
        this.last_payment.sum += element.total_paid;
      });
    }
    //voided
    if (pay_data && pay_data.all_voided.length > 0) {
      pay_data.all_voided.forEach(element => {
        this.last_payment['voided'] += element.total_paid;
        this.last_payment.sum += element.total_paid;
      });
    }
    //cash move add to cash
    if (pay_data && pay_data.cash_movements.length > 0) {
      pay_data.cash_movements.forEach(element => {
        this.last_payment['cash'] += element.transaction;
        this.last_payment.sum += element.transaction;
      });
    }

  }
}