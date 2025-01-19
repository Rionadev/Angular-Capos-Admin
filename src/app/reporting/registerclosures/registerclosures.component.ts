import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'app/api/reporting/api.service';
import { sum } from 'chartist';
import { rmSync } from 'fs';

@Component({
  selector: 'app-registerclosures',
  templateUrl: './registerclosures.component.html',
  styleUrls: ['./registerclosures.component.scss']
})
export class RegisterclosuresComponent implements OnInit {

  constructor(private reportingService: ReportingService,) { }
  isRendered: boolean = false;
  selectedRecord: any = null; // Holds the clicked record for details
  isShowdetailflag: boolean = false;
  filteredRecords: any;

  sel_total_payment: any;
  sel_total_caetory: any;

  row_sum: any;
  total_sum: any;

  sel_reg: any;
  selectedRegister: string = 'all'; // Default selection
  detail_records: any
  ngOnInit(): void {
    this.init_row_sum();
    this.init_total_sum();
    this.fetchRegisters();
    this.fetchSearchItems();
  }
  value(index, item) {
    return item;
  }
  fetchRegisters() {
    //fecthRegister
    this.reportingService.fecthRegister().subscribe(
      (res) => {
        this.sel_reg = [{ label: 'All Registers', id: 'all' }];
        if (Object.keys(res).length > 0) {
          Object.entries(res).forEach(([key, value]: [key: any, value: any]) => {
            // Check if value.reg is not already in this.sel_reg
            if (!this.sel_reg.some(item => item.id === value._id)) {
              this.sel_reg.push({
                label: value.name,
                id: value._id
              });
            }
          });
        }
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  fetchSearchItems() {

    this.reportingService.fetchPaymentReg({
      register: this.selectedRegister
    }).subscribe(
      (res) => {
        this.filteredRecords = res;
        this.filteredRecords = this.filteredRecords.map(item => ({
          ...item,
          formattedOpeningTime: this.getFormattedDate(item.opening_time),
          formattedClosingTime: this.getFormattedDate(item.closing_time),
          store_credit: this.calcCashPayment('store_credit', item.open_value),
          cash_concealed: this.calcCashPayment('cash_concealed', item.payment_data.all_payments),
          cash_d: this.calcCashPayment('cash_d', item.payment_data.cash_movements),
          cash: this.calcCashPayment('cash', item.payment_data.all_payments),
          credit: this.calcCashPayment('credit', item.payment_data.all_payments),
          debit: this.calcCashPayment('debit', item.payment_data.all_payments),
          refunds: this.calcCashPayment('refunds', item.payment_data.all_returns),
          voided: this.calcCashPayment('voided', item.payment_data.all_voided),
          total: this.calcSumCashPayment(),
          // paymentSummary: this.calcCashPayment('paymentSummary', item.payment_data.all_voided),
          // categorySummary: this.calcCashPayment('categorySummary', item.payment_data.all_voided),

        }));
        console.log(this.total_sum);
        console.log(this.filteredRecords);
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  calcSumCashPayment() {
    let sum = 0;
    sum = this.row_sum['store_credit']
      + this.row_sum['cash_concealed']
      + this.row_sum['cash_d']
      + this.row_sum['cash']
      + this.row_sum['credit']
      + this.row_sum['debit']
      + this.row_sum['refunds']
      + this.row_sum['voided'];
    this.row_sum['total'] = sum;
    this.total_sum['total'] += sum;
    // sum = cash + credit + debit + refunds + voided;
    this.init_row_sum();
    return sum;
  }
  calcCashPayment(type: string, payData: any) {
    let sum = 0;
    this.row_sum[type] = 0;
    if (payData?.length < 1) { return sum; }
    if (type == 'cash_d') {
      payData.forEach(element => {
        sum += element?.transaction;
      });
    } else if (type == 'refunds' || type == 'voided') {
      payData.forEach(element => {
        sum += element.total_paid;
      });

    } else if (type == 'credit' || type == 'debit' || type == 'cash') {
      payData.forEach(element => {
        if (element.payment_status == type) {
          sum += element.total_paid;
        }
      });

    } else if (type == 'cash_concealed') {
      payData.forEach(element => {
        if (element.payment_status == type) {
          sum += element.total - element.total_paid;
        }
      });
    } else if (type == 'store_credit') {
      if (payData) sum = payData;
    }

    this.row_sum[type] = sum;

    this.total_sum[type] += sum;
    return sum;
  }
  onBackdropClick() {
    this.isShowdetailflag = false;
  }

  showDetails(record: any) {
    this.isShowdetailflag = true;
    this.selectedRecord = record; // Set the clicked record as the selectedRecord
    this.analysis_info(record);
  }

  analysis_info(record: any) {
    console.log(record);
    this.sel_total_payment = { sum: 0 };
    this.sel_total_caetory = { sum: 0 };
    this.detail_records = {};
    const cashmove = record.payment_data.cash_movements;
    const detail_info = {
      all: this.calc_sale_info(record.payment_data.all_payments),
      return: this.calc_sale_info(record.payment_data.all_returns),
      voided: this.calc_sale_info(record.payment_data.all_voided),
      cash: this.calc_cash_movement(record.payment_data.cash_movements) || 0,
    }
    console.log(detail_info);
    console.log(this.sel_total_payment);
    console.log(this.sel_total_caetory);
    this.detail_records = detail_info;
    console.log('------------------', this.detail_records.all.categoryinfo.sum);
  }
  calc_cash_movement(cashdata: any) {
    let cash_move = 0;
    if (cashdata.length > 0) {
      cashdata.forEach(element => {
        cash_move += element.transaction;
      });
    }
    return cash_move;
  }
  calc_sale_info(sale_list: any): any {
    let result = {
      sel_info: {
        total: 0,
        subtotal: 0,
        total_paid: 0,
        tax: 0,
        service_fee: 0,
        tip: 0,
        cash_tip: 0,
        total_items: 0,
        pay_info: {
          total: 0,
          total_paid: 0,
        },
      },
      paymentinfo: {
        sum: 0
      },
      categoryinfo: {
        sum: 0
      },
    };

    if (sale_list.length > 0) {
      sale_list.forEach(sale_info => {


        if (!result.sel_info.pay_info[sale_info.payment_status]) {
          result.sel_info.pay_info[sale_info.payment_status] = {
            penny: 0,
            susbtotal: 0,
            tax: 0,
            total: 0,
            total_paid: 0,
            total_items: 0,
          };
        }
        result.sel_info.pay_info[sale_info.payment_status].penny += sale_info.penny || 0;
        result.sel_info.pay_info[sale_info.payment_status].susbtotal += sale_info.susbtotal || 0;
        result.sel_info.pay_info[sale_info.payment_status].tax += sale_info.tax || 0;
        result.sel_info.pay_info[sale_info.payment_status].total += sale_info.total || 0;
        result.sel_info.pay_info[sale_info.payment_status].total_paid += sale_info.total_paid || 0;
        result.sel_info.pay_info[sale_info.payment_status].total_items += sale_info.total_items || 0;

        result.sel_info.pay_info.total += sale_info.total;
        result.sel_info.pay_info.total_paid += sale_info.total_paid;


        result.sel_info.total += sale_info.total || 0;
        result.sel_info.subtotal += sale_info.subtotal || 0;
        result.sel_info.total_paid += sale_info.total_paid || 0;
        result.sel_info.tax += sale_info.tax || 0;
        result.sel_info.service_fee += sale_info.service_fee || 0;
        result.sel_info.tip += sale_info.tip || 0;
        result.sel_info.cash_tip += sale_info.cash_tip || 0;
        result.sel_info.total_items += sale_info.total_items || 0;


        // Uncomment and complete this section if needed
        if (sale_info.payments.length > 0) {
          sale_info.payments.forEach(payment => {

            if (!this.sel_total_payment[payment.type]) {
              this.sel_total_payment[payment.type] = 0;
            }
            this.sel_total_payment[payment.type] += payment.amount;
            this.sel_total_payment.sum += payment.amount;


            // Initialize the payment type if it doesn't exist
            if (!result.paymentinfo[payment.type]) {
              result.paymentinfo[payment.type] = 0;
            }
            // Aggregate payment amounts
            result.paymentinfo[payment.type] += payment.amount || 0;
            result.paymentinfo.sum += payment.amount || 0
          });
        }
        if (sale_info.products.length > 0) {
          sale_info.products.forEach(product => {

            if (!this.sel_total_caetory[product._id]) {
              this.sel_total_caetory[product._id] = {
                discount: product.discount,
                price: product.price,
                product_name: product.product_name,
                tax: product.tax,
                qty: 0,
              }
            }
            this.sel_total_caetory[product._id].qty += product.qty || 0;
            let discount_v = 1;
            if (product.discount.value > 0) {
              if (product.discount.mode == 'percent') {
                discount_v = product.value / 100;
              }
            }
            this.sel_total_caetory.sum += product.qty * product.price * discount_v || 0;

            if (!result.categoryinfo[product._id]) {
              result.categoryinfo[product._id] = {
                discount: product.discount,
                price: product.price,
                product_name: product.product_name,
                tax: product.tax,
                qty: 0,
              }
            }
            result.categoryinfo[product._id].qty += product.qty || 0;
            // let discount_v = 1;
            // if (product.discount.value > 0) {
            //   if (product.discount.mode == 'percent') {
            //     discount_v = product.value / 100;
            //   }
            // }
            result.categoryinfo.sum += product.qty * product.price * discount_v || 0;
          });
        }

      });
    }

    // console.log(result);
    return result;
  }

  searchRecords() {
    this.init_row_sum();
    this.init_total_sum();
    this.fetchSearchItems();
    // if (this.selectedRegister === 'All Registers') {
    //   this.filteredRecords = this.records;
    // } else {
    //   this.filteredRecords = this.records.filter(record => record.register.name === this.selectedRegister);
    // }
  }
  getFormattedDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  }
  // getTotal(field: string) {
  //   return this.filteredRecords.reduce((acc, record) => acc + record[field], 0);
  // }
  calc(type: string, data: any) {

  }
  init_row_sum() {
    this.row_sum = {
      'store_credit': 0,
      'cash_concealed': 0,
      'cash': 0,
      'cash_d': 0,
      'credit': 0,
      'debit': 0,
      'refunds': 0,
      'voided': 0,
      'total': 0
    };

  }
  init_total_sum() {
    this.total_sum = {
      'store_credit': 0,
      'cash_concealed': 0,
      'cash': 0,
      'cash_d': 0,
      'credit': 0,
      'debit': 0,
      'refunds': 0,
      'voided': 0,
      'total': 0
    };
  }
}