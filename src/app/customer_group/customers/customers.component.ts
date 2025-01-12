import { Component, OnInit, Renderer2 } from '@angular/core';
import { CustomerService } from 'app/api/salesledger/api.service';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})


export class CustomersComponent implements OnInit {
  isVisibledel = false;
  selectedTransaction: any;
  groups: any;
  // List of countries
  countries: any;
  isModalOpen = false; // Control modal visibility
  constructor(private renderer: Renderer2, private customerService: CustomerService) {
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

  saveCustomer() {
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
  }
  confirmDelete() {

  }
  confirmCancel() {
    this.isVisibledel = false;
  }
}