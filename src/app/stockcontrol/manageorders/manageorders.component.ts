import { Component, OnInit } from '@angular/core';
import { StockService } from 'app/api/stockcontrol/api.service';

@Component({
  selector: 'app-manageorders',
  templateUrl: './manageorders.component.html',
  styleUrls: ['./manageorders.component.scss']
})
export class ManageordersComponent implements OnInit {
  allRows: any;
  isOrderModal = false;

  ngOnInit(): void {
    this.setDateFromTo();
    this.fetchSearchItems();

  }
  constructor(private stockService: StockService) { }

  ordersTypes: any;
  outlets: any;
  suppliers: any;


  searchInvoice: string = '';
  selectedOrderType: string = '';
  selectedOutlet: string = '';
  selectedSupplier: string = '';
  createdAtStart: string | null = null;
  createdAtEnd: string | null = null;
  dueDateStart: string | null = null;
  dueDateEnd: string | null = null;

  filteredRows: any;
  currentPage: number = 1;
  totalPages: number = 1;

  setDateFromTo() {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    const oneDayAfter = new Date(today);

    sevenDaysAgo.setDate(today.getDate() - 1000); // Subtract 7 days
    oneDayAfter.setDate(today.getDate() + 1); // Subtract 7 days


    this.createdAtStart = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.createdAtEnd = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today

    this.dueDateStart = sevenDaysAgo.toISOString().split('T')[0]; // Set the start date to 7 days ago
    this.dueDateEnd = oneDayAfter.toISOString().split('T')[0]; // Set the end date to today
  }

  // Method to filter rows based on the criteria
  filterRows() {
    this.filteredRows = this.allRows.filter(row => {
      const matchesInvoice = !this.searchInvoice || row.number.includes(this.searchInvoice);
      const matchesOrderType = !this.selectedOrderType || row.type === this.selectedOrderType;
      const matchesOutlet = !this.selectedOutlet || row.from === this.selectedOutlet;
      const matchesSupplier = !this.selectedSupplier || row.from === this.selectedSupplier;

      // const matchesCreatedAt = (!this.createdAtStart || new Date(row.created) >= new Date(this.createdAtStart)) &&
      //   (!this.createdAtEnd || new Date(row.created) <= new Date(this.createdAtEnd));

      // const matchesDueDate = (!this.dueDateStart || new Date(row.dueDate) >= new Date(this.dueDateStart)) &&
      //   (!this.dueDateEnd || new Date(row.dueDate) <= new Date(this.dueDateEnd));

      return matchesInvoice && matchesOrderType && matchesOutlet && matchesSupplier;
      //  && matchesCreatedAt && matchesDueDate;
    });
    this.updatePagination();
  }

  fetchSearchItems() {

    let params: any = {
      date_from: this.createdAtStart,
      date_to: this.createdAtEnd,
      due_from: this.dueDateStart,
      due_to: this.dueDateEnd,
    };
    if (this.selectedOrderType != '') {
      params = {
        ...params,
        type: this.selectedOrderType,
      };
    }
    if (this.selectedOutlet != '') {
      params = {
        ...params,
        outlet: this.selectedOutlet,
      };
    }
    if (this.selectedSupplier != '') {
      params = {
        ...params,
        supplier: this.selectedSupplier,
      };
    }
    if (this.searchInvoice != '') {
      params = {
        ...params,
        kewyword: this.searchInvoice,
      };
    }
    this.stockService.fetchSupplier().subscribe(
      (res) => {
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
    this.stockService.readOrderProduct(params).subscribe(
      (res) => {
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  clearFilters() {
    this.searchInvoice = '';
    this.selectedOrderType = '';
    this.selectedOutlet = '';
    this.selectedSupplier = '';
    this.setDateFromTo();

    this.filterRows(); // Reapply filter to reset the displayed rows
  }

  updatePagination() {
    // Logic to update currentPage and totalPages based on filteredRows
  }
  getTotalItems(): number {
    return this.filteredRows?.reduce((total, row) => total + row.items, 0);
  }

  getTotalCost(): number {
    return this.filteredRows?.reduce((total, row) => total + row.cost, 0);
  }
  // Other methods...
  showModal(): void {
    this.isOrderModal = true;
  }
}