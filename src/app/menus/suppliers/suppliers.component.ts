import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';
import { SuppliersService } from 'app/api/suppliers/suppliers.service';
import { ToastService } from 'app/component/toast/toast.service';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {


  totalItems: number = 100; // Total number of items
  countPerPage: number = 10; // Default items per page
  currentPage: number = 1;

  before_filteredTransactions: any;


  rows: any;
  currentRow: any;
  isContentVisible: boolean = false;
  searchQuery: string = '';
  paginatedRows: any = [];

  isPostalAddressDifferent: boolean = false;
  isDeleteModal = false;
  countries: any;


  constructor(
    private coutryService: CustomerService,
    private suppliersService: SuppliersService,
    private toastService: ToastService,

  ) { }
  fetchCountries() {
    this.coutryService.fetchCoutries().subscribe(
      (res) => {
        this.countries = res;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  ngOnInit(): void {
    // this.rows = [
    //   { id: 1, name: 'Product 1', description: 'Description 1', markup: 50, product: 'Product A' },
    //   { id: 2, name: 'Product 2', description: 'Description 2', markup: 54, product: 'Product B' },
    //   { id: 3, name: 'Product 3', description: 'Description 3', markup: 3, product: 'Product C' },
    //   { id: 4, name: 'Product 4', description: 'Description 4', markup: 30, product: 'Product D' },
    //   { id: 5, name: 'Product 5', description: 'Description 5', markup: 59, product: 'Product E' },
    //   { id: 6, name: 'Product 6', description: 'Description 6', markup: 97, product: 'Product F' },
    //   // Add more products as needed
    // ];
    // this.filterRows(); // Initialize pagination
    this.fetchCountries();
    this.fetchSuppliers();
    this.init_sel_row();
  }

  fetchSuppliers() {
    this.suppliersService.getAllSuppliers().subscribe(
      (res) => {
        if (res.length > 0) {
          this.rows = res;
          this.filterRows();
        }
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }

  toggleContent() {
    this.isContentVisible = !this.isContentVisible;
    // this.init_sel_row();
  }

  openEditModal(row: any) {
    this.currentRow = { ...row };
    // $('#editModal').show();
  }

  editRow(row: any) {
    // Set the row to editing mode
    this.currentRow = { ...row };
    // row.isEditing = true;
    this.isContentVisible = true;

    console.log(this.currentRow);
  }

  saveRow(row: any) {
    // Save changes (you can add your save logic here)
    row.isEditing = false; // Exit editing mode
  }

  cancelEdit(row: any) {
    // Reset the row to its original state
    // Here we would typically reload the original data from a service or store
    row.isEditing = false; // Exit editing mode
  }

  cancelSupplier() {
    this.toggleContent();
    this.init_sel_row();
  }
  deleteRow(row: any) {
    // Logic to delete the row
    // this.paginatedRows = this.paginatedRows.filter(row => row.id !== id);
    this.currentRow = { ...row };
    this.isDeleteModal = true;
  }
  deleteConfirm() {
    console.log(this.currentRow._id);
    if (!this.currentRow._id) { return; }
    this.suppliersService.deleteSupplier(this.currentRow._id).subscribe(
      (res) => {
        this.toastService.showToast('Supplier saved successfully.', 'success', 3000);
        this.fetchSuppliers();
        this.init_sel_row();
        this.isDeleteModal = false;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        this.toastService.showToast('Saving failed', 'warning', 3000);

        // Handle the error as needed
      }
    );
  }
  closeDeleteModal() {
    this.isDeleteModal = false;
  }
  filterRows() {
    const filtered = this.rows.filter(row =>
      row?.name?.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
    this.totalItems = filtered.length;
    // this.paginatedRows = filtered;
    this.before_filteredTransactions = filtered;
    this.onGetData();
  }


  updatePagination() {
    this.filterRows(); // Reapply filtering to ensure correct pagination
  }

  init_sel_row() {
    this.currentRow = {
      "physical_address": {
        "street": "",
        "city": "",
        "suburb": "",
        "postcode": "",
        "state": "",
        "country": ""
      },
      "postal_address": {
        "street": "",
        "city": "",
        "suburb": "",
        "postcode": "",
        "state": "",
        "country": ''
      },
      "markup": 0,
      "description": "",
      "exist_postal_address": false,
      "products": 0,
      // "_id": "",
      "name": "",
      "first_name": "",
      "last_name": "",
      "company": "",
      "email": "",
      "phone": "",
      "mobile": "",
      "fax": "",
      "website": "",
      "twitter": "",
      // "private_web_address": "",
    }

  }
  saveSupplier() {
    if (this.currentRow.name == '') {
      this.toastService.showToast('Please input the name', 'warning', 3000);

      return;
    }
    console.log(this.currentRow);
    this.toggleContent()
    if (this.currentRow?._id) {
      console.log('update');
      this.updateSupplier(this.currentRow);
    } else {
      console.log('create');
      this.createSupplier(this.currentRow);

    }
  }
  createSupplier(data: any): any {
    this.suppliersService.createSupplier(data).subscribe(
      (res) => {
        this.toastService.showToast('Supplier saved successfully.', 'success', 3000);

        this.fetchSuppliers();
        this.init_sel_row();
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        this.toastService.showToast('Saving failed', 'warning', 3000);

        // Handle the error as needed
      }
    );
  }
  updateSupplier(data: any): any {
    this.suppliersService.updateSupplier(data).subscribe(
      (res) => {
        if (res.status == 'already_exist') {
          this.toastService.showToast('Supplier alreay exist. Please input another name', 'warning', 3000);

        } else {
          this.toastService.showToast('Supplier updated successfully.', 'success', 3000);

          this.fetchSuppliers();
          this.init_sel_row();
        }
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        this.toastService.showToast('Updatingfailed', 'warning', 3000);

        // Handle the error as needed
      }
    );
  }

  onPageChanged(page: number) {
    this.paginateItems(page);
  }

  onCountPerPageChanged(count: number) {
    if (this.countPerPage != count) {
      this.countPerPage = count; // Update count per page
      this.paginateItems(1);
    }
  }
  paginateItems(page: number) {
    this.currentPage = page;
    /* const startIndex = (page - 1) * this.countPerPage; // Default items per page
    const endIndex = startIndex + this.countPerPage; */
    //this.paginatedItems = this.allItems.slice(startIndex, endIndex);
    this.onGetData();
  }
  onGetData() {
    const page = (this.currentPage - 1);
    const size = (this.countPerPage);

    // Convert the object values to an array
    const arr_data = //Object.entries
      (this.before_filteredTransactions);


    // Store the original array for recovery
    const originalTransactions = [...arr_data]; // Create a copy of the original array

    // Calculate the start and end indices for slicing
    const startIndex = page * size; // Starting index
    const endIndex = startIndex + size; // Ending index

    // Create the new array based on pagination
    this.paginatedRows = //Object.fromEntries
      (arr_data.slice(startIndex, endIndex));

  }
}
