import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';
import { ToastService } from 'app/component/toast/toast.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})


export class CustomersComponent implements OnInit {
  isVisibledel = false;
  selectedTransaction: any;
  currentDeleteID: string = '';
  isDeleteModal: boolean = false;
  groups: any;
  // List of countries
  countries: any;
  isModalOpen = false; // Control modal visibility
  constructor(
    private renderer: Renderer2,
    private customerService: CustomerService,
    private toastService: ToastService,
    @Inject('APP_CONFIG') private config: any,
  ) {
    this.selectedCustomer = '';
    this.selectedGroup = 'all';
    this.selectedCountry = 'all';
    this.selectedTransaction = this.newCustomer;

  }
  formatCurrency(total: number): string {
    return `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  ngOnInit(): void {
    this.selectedTransaction = this.reset();

    this.fetchSearchItems();
  }
  differentAddress: boolean = false; // To track if postal address is different
  selectedCustomer: string = '';
  selectedGroup: string = 'all';
  selectedCountry: string = 'all';
  isContentVisible: boolean = false;
  isPayBalanceOpen: boolean = false;

  showPayAccountBalance() {
    this.isPayBalanceOpen = true;
  }
  customerSearch: string = ''; // Ensure this property is defined
  groupSearch: string = '';
  countrySearch: string = '';
  newCustomer: any = {};

  // Sample transaction data
  // Sample transaction data
  transactions: any = [
  ];

  filteredTransactions: any = [...this.transactions];

  addcustomer() {
    // console.log(this.newCustomer);
    this.selectedTransaction = this.reset();
    this.isContentVisible = !this.isContentVisible;
  }
  // scrollToTop() {
  //   // Using requestAnimationFrame for smooth scrolling
  //   const scrollStep = -window.scrollY / (500 / 15); // Adjust duration here
  //   const scrollInterval = setInterval(() => {
  //     if (window.scrollY !== 0) {
  //       window.scrollBy(0, scrollStep);
  //     } else {
  //       clearInterval(scrollInterval);
  //     }
  //   }, 15);
  // }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  fetchSearchItems() {
    this.customerService.fetchCoutries().subscribe(
      (res) => {
        this.countries = res;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
    this.customerService.fetchGroup().subscribe(
      (res) => {
        this.groups = res;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
    this.customerService.fetchCumtomerData().subscribe(
      (res) => {
        this.transactions = res;
        this.filteredTransactions = res;
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
  }
  closecustomer() {
    this.isContentVisible = false;
    this.scrollToTop();
  }
  searchTransactions() {


    this.filteredTransactions = this.transactions.filter(transaction => {
      return (
        (this.customerSearch ? transaction.email.includes(this.customerSearch) : true) &&
        (this.selectedGroup && this.selectedGroup !== 'all' ? transaction?.groupId?._id === this.selectedGroup : true)
        && (this.selectedCountry && this.selectedCountry !== 'all' ? (transaction?.physical_address?.country === this.selectedCountry || transaction?.postal_address?.country === this.selectedCountry) : true)
      );
    });
  }
  viewTransaction(transaction: any) {
    this.selectedTransaction = transaction;
    this.isModalOpen = true; // Open the modal
  }
  closeModal() {
    this.isPayBalanceOpen = false;
    this.isModalOpen = false; // Close the modal
  }

  clearFilters() {
    this.selectedCustomer = '';
    this.selectedGroup = '';
    this.selectedCountry = 'All Countries';
    this.customerSearch = ''; // Reset search
    this.filteredTransactions = [...this.transactions];
  }

  validateFields(): boolean {
    const requiredFields = [
      this.selectedTransaction.name,
      this.selectedTransaction.code,
      this.selectedTransaction.groupId,
      this.selectedTransaction.gender,
      this.selectedTransaction.email,
      this.selectedTransaction.physical_address.street,
      this.selectedTransaction.physical_address.city
    ];

    return requiredFields.every(field => field && field.trim() !== '');
  }

  saveCustomer() {
    console.log(this.selectedTransaction);
    if (!this.validateFields()) {
      // alert('Please fill in all required fields.');
      this.toastService.showToast('Please fill in all required fields.', 'warning', 3000);

      return;
    }

    if (this.selectedTransaction.name && this.selectedTransaction.email) {
      this.customerService.saveCumtomerData(this.selectedTransaction).subscribe(
        (res) => {
          // this.transactions.push({ ...res });
          // this.filteredTransactions = [...this.transactions]; // Update filtered transactions
          this.fetchSearchItems();
          this.closecustomer();
        },
        (error) => {
          console.error('Error fetching customer data:', error);
          // Handle the error as needed
        }
      );

      this.clearNewCustomer(); // Clear the form
    } else {
      // alert('Please fill in all required fields.');
    }
    // console.log(this.selectedTransaction);
  }

  clearNewCustomer() {
  }


  editTransaction(transaction: any) {
    // this.addcustomer();
    this.selectedTransaction = transaction;
    this.isContentVisible = !this.isContentVisible;

  }

  reset(): any {
    return {
      "physical_address": {
        "street": "",
        "city": "",
        "suburb": "",
        "postcode": "",
        "state": "",
        "country": '631fdb843e72cb53ad0a5ca4'
      },
      "postal_address": {
        "street": "",
        "city": "",
        "suburb": "",
        "postcode": "",
        "state": "",
        "country": "631fdb843e72cb53ad0a5ca4"
      },
      "custom_information": {
        "field1": "",
        "field2": ""
      },
      "gender": "Male",
      "mobile": "",
      "phone": "",
      "fax": "",
      "exist_postal_address": false,
      "total_spent": 0,
      "debit": 0,
      "credit": 0,
      "total_issued": 0,
      "total_redeemed": 0,
      "point": 0,
      "point_issued": 0,
      "point_redeemed": 0,
      "private_web_address": "",
      "name": "",
      "groupId": "",
      "email": "",
      "code": "",
      "company": "",
      "birthday": null,
      "website": "",
      "twitter": "",
      "note": "",
      "pay_balance_logs": [],
    };
  }
  deleteTransaction(transaction: any) {
    // this.filteredTransactions = this.filteredTransactions.filter(t => t !== transaction);
    this.selectedTransaction = transaction;
    this.isVisibledel = true;
    this.currentDeleteID = this.selectedTransaction._id;
    this.isDeleteModal = true;
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  deleteRow() {
    /* this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id */
    //this.isContentVisible = false;
    this.customerService.delCumtomerData(this.currentDeleteID).subscribe(
      (res) => {
        // this.transactions.push({ ...res });
        // this.filteredTransactions = [...this.transactions]; // Update filtered transactions
        this.fetchSearchItems();
        this.closecustomer();
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
    /* this.rows = this.rows.filter((row) => row.id !== this.currentDeleteID); // Remove row by id
    this.isDeleteModal = false; */
    this.isDeleteModal = false;
  }
  handleSelect(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const csvData = e.target.result;
        const customers = this.parseCSV(csvData);
        console.log('--------', customers);
        if (customers.length > 0) {
          this.importCustomers(customers);
        }
      };
      reader.readAsText(file);
    } else {
      // alert('Please select a valid CSV file.');
      this.toastService.showToast('Please select a valid CSV file.', 'warning', 3000);

    }
  }
  parseCSV(data: string) {
    const rows = data.split('\n').map(row => row.split(',').map(cell => cell.trim()));
    console.log(rows);

    // Get the header row (first row)
    const headers = rows[0];

    return rows.slice(1).map(row => {
      // Check if the row is empty
      if (row.every(cell => cell === '')) return null;

      // Create the new data structure
      const newData: { [key: string]: any } = {};
      const customInformation: { [key: string]: any } = {};
      const physicalAddress: { [key: string]: any } = {};
      const postalAddress: { [key: string]: any } = {};

      // Use the header row to create keys
      headers.forEach((header, index) => {
        if (index === 0) {
          // Use the first element as the unique identifier (e.g., 'name')
          newData['name'] = row[index]; // Change 'name' if you want a different key
        } else if (header.startsWith('custom_information.')) {
          // Handle custom_information fields
          const fieldName = header.split('custom_information.')[1];
          customInformation[fieldName] = row[index];
        } else if (header.startsWith('physical_address.')) {
          // Handle physical_address fields
          const fieldName = header.split('physical_address.')[1];
          physicalAddress[fieldName] = row[index];
        } else if (header.startsWith('postal_address.')) {
          // Handle postal_address fields
          const fieldName = header.split('postal_address.')[1];
          postalAddress[fieldName] = row[index];
        } else {
          // Map the header to the corresponding value
          newData[header] = row[index];
        }
      });

      // Add nested objects to newData if they have any fields
      if (Object.keys(customInformation).length > 0) {
        newData['custom_information'] = customInformation;
      }
      if (Object.keys(physicalAddress).length > 0) {
        newData['physical_address'] = physicalAddress;
      }
      if (Object.keys(postalAddress).length > 0) {
        newData['postal_address'] = postalAddress;
      }

      // Check if private_web_address is 'onestore'
      if (newData['private_web_address'] === this.config.private_web_address) {
        return newData; // Return the transformed object only if the condition is met
      }

      return null; // Return null if the condition is not met
    }).filter(customer => customer !== null); // Filter out any null items
  }

  importCustomers(customers: any[]) {


    const payload = {
      range: 'csv-import',
      // store_name: 'Your Store Name', // Replace with actual store name
      // user_id: 'Your User ID', // Replace with actual user ID
      data: customers
    };

    this.customerService.saveCumtomerData(payload).subscribe(
      (res) => {

        this.fetchSearchItems();
        this.closecustomer();
      },
      (error) => {
        console.error('Error fetching customer data:', error);
        // Handle the error as needed
      }
    );
    console.log('----------------------', payload);
  }
}