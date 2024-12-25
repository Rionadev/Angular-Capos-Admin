import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registerclosures',
  templateUrl: './registerclosures.component.html',
  styleUrls: ['./registerclosures.component.scss']
})
export class RegisterclosuresComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  sel_reg = ['All Registers', 'Main Register', 'Register2', 'Register3', 'Register4'];
  selectedRegister: string = this.sel_reg[0]; // Default selection
  records = [
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
  selectedRecord: any = null; // Holds the clicked record for details
  isShowdetailflag: boolean = false;
  filteredRecords = [...this.records];
  // Function to handle clicks on the backdrop
  onBackdropClick(event: MouseEvent) {
    this.isShowdetailflag = false; // Hide the details box
    this.selectedRecord = null; // Clear the selected record
  }
  initFilters() {
    this.selectedRegister = this.sel_reg[0]; // Reset to 'All Registers'
    this.filteredRecords = [...this.records]; // Reset filtered results
  }
  showDetails(record: any) {
    this.isShowdetailflag = true;
    // console.log(record);
    this.selectedRecord = record; // Set the clicked record as the selectedRecord
  }

  searchRecords() {
    if (this.selectedRegister === 'All Registers') {
      this.filteredRecords = [...this.records];
    } else {
      this.filteredRecords = this.records.filter(record => record.register === this.selectedRegister);
    }
  }

  getTotal(field: string) {
    return this.filteredRecords.reduce((acc, record) => acc + record[field], 0);
  }
}