import { Component, OnInit } from '@angular/core';
import { ReportingService } from 'app/api/reporting/api.service';
import { sum } from 'chartist';

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

  row_sum: any;
  total_sum: any;

  sel_reg: any;
  selectedRegister: string = 'all'; // Default selection
  records: any = [
    { register: 'Main Register', timeOpened: '09:00 AM', timeClosed: '05:00 PM', storeCredit: 100, cashConcealedTotal: 200, cash: 150, credit: 50, debit: 0, refunds: 0, voided: 0, total: 200 },
    { register: 'Main Register', timeOpened: '10:00 AM', timeClosed: '06:00 PM', storeCredit: 150, cashConcealedTotal: 250, cash: 200, credit: 40, debit: 10, refunds: 5, voided: 0, total: 245 },
    { register: 'Register2', timeOpened: '09:30 AM', timeClosed: '05:30 PM', storeCredit: 80, cashConcealedTotal: 180, cash: 130, credit: 30, debit: 5, refunds: 0, voided: 0, total: 195 },
    { register: 'Register3', timeOpened: '11:00 AM', timeClosed: '07:00 PM', storeCredit: 120, cashConcealedTotal: 220, cash: 160, credit: 50, debit: 5, refunds: 10, voided: 0, total: 215 },
    { register: 'Register4', timeOpened: '08:30 AM', timeClosed: '04:30 PM', storeCredit: 90, cashConcealedTotal: 170, cash: 120, credit: 25, debit: 0, refunds: 0, voided: 1, total: 214 },
    { register: 'Main Register', timeOpened: '09:15 AM', timeClosed: '05:15 PM', storeCredit: 110, cashConcealedTotal: 210, cash: 180, credit: 20, debit: 5, refunds: 0, voided: 0, total: 205 },
    { register: 'Register2', timeOpened: '10:30 AM', timeClosed: '06:30 PM', storeCredit: 130, cashConcealedTotal: 230, cash: 190, credit: 40, debit: 0, refunds: 0, voided: 0, total: 230 },
    { register: 'Register3', timeOpened: '11:30 AM', timeClosed: '07:30 PM', storeCredit: 70, cashConcealedTotal: 140, cash: 100, credit: 30, debit: 5, refunds: 0, voided: 0, total: 135 },
    { register: 'Register4', timeOpened: '08:00 AM', timeClosed: '04:00 PM', storeCredit: 60, cashConcealedTotal: 120, cash: 90, credit: 20, debit: 0, refunds: 0, voided: 2, total: 110 },
    { register: 'Main Register', timeOpened: '09:45 AM', timeClosed: '05:45 PM', storeCredit: 140, cashConcealedTotal: 240, cash: 200, credit: 30, debit: 10, refunds: 5, voided: 0, total: 235 },
  ];
  ngOnInit(): void {
    this.init_row_sum();
    this.init_total_sum();
    this.fetchSearchItems();
  }
  value(index, item) {
    return item;
  }
  fetchSearchItems() {
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
          cash: this.calcCashPayment('cash', item.payment_data.cash_movements),
          credit: this.calcCashPayment('credit', item.payment_data.all_payments),
          debit: this.calcCashPayment('debit', item.payment_data.all_payments),
          refunds: this.calcCashPayment('refunds', item.payment_data.all_returns),
          voided: this.calcCashPayment('voided', item.payment_data.all_voided),
          total: this.calcSumCashPayment(),
        }));
        console.log(this.total_sum);
        this.records = this.filteredRecords;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  calcSumCashPayment() {
    let sum = 0;
    sum = this.row_sum['store_credit'] + this.row_sum['cash_concealed'] + this.row_sum['cash'] + this.row_sum['credit']
      + this.row_sum['debit'] + this.row_sum['refunds'] + this.row_sum['voided'];
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
    if (type == 'cash') {
      payData.forEach(element => {
        sum += element.transaction;
      });
    } else if (type == 'refunds' || type == 'voided') {
      payData.forEach(element => {
        sum += element.total_paid;
      });

    } else if (type == 'credit' || type == 'debit') {
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

  showDetails(record: any) {
    // this.isShowdetailflag = true;
    console.log(record);
    // this.selectedRecord = record; // Set the clicked record as the selectedRecord
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
      'credit': 0,
      'debit': 0,
      'refunds': 0,
      'voided': 0,
      'total': 0
    };
  }
}