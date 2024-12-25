import { Component, OnInit, Renderer2 } from '@angular/core';

interface Transaction {
  name: string;
  email: string;
  group: string;
  storeCredit: number;
  balance: number;
  points: number;
  country: string;
  mobile: string;
  phone: string;
  bal_account: number,
  bal_totalSpent: number,
  bal_sotreCredit: number,
  bal_sotreCredit_issued: number,
  bal_sotreCredit_redeemed: number,
  bal_point: number,
  bal_issued: number,
  bal_redeemed: number,

}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})


export class CustomersComponent implements OnInit {
  selectedTransaction: any;
  // List of countries
  countries: string[] = [
    'All Countries',
    'Afghanistan',
    'Albania',
    'Algeria',
    'Andorra',
    'Angola',
    'Antigua and Barbuda',
    'Argentina',
    'Armenia',
    'Australia',
    'Austria',
    'Azerbaijan',
    'Bahamas',
    'Bahrain',
    'Bangladesh',
    'Barbados',
    'Belarus',
    'Belgium',
    'Belize',
    'Benin',
    'Bhutan',
    'Bolivia',
    'Bosnia and Herzegovina',
    'Botswana',
    'Brazil',
    'Brunei',
    'Bulgaria',
    'Burkina Faso',
    'Burundi',
    'Cabo Verde',
    'Cambodia',
    'Cameroon',
    'Canada',
    'Central African Republic',
    'Chad',
    'Chile',
    'China',
    'Colombia',
    'Comoros',
    'Congo',
    'Costa Rica',
    'Croatia',
    'Cuba',
    'Cyprus',
    'Czech Republic',
    'Democratic Republic of the Congo',
    'Denmark',
    'Djibouti',
    'Dominica',
    'Dominican Republic',
    'Ecuador',
    'Egypt',
    'El Salvador',
    'Equatorial Guinea',
    'Eritrea',
    'Estonia',
    'Eswatini',
    'Ethiopia',
    'Fiji',
    'Finland',
    'France',
    'Gabon',
    'Gambia',
    'Georgia',
    'Germany',
    'Ghana',
    'Greece',
    'Grenada',
    'Guatemala',
    'Guinea',
    'Guinea-Bissau',
    'Guyana',
    'Haiti',
    'Honduras',
    'Hungary',
    'Iceland',
    'India',
    'Indonesia',
    'Iran',
    'Iraq',
    'Ireland',
    'Israel',
    'Italy',
    'Jamaica',
    'Japan',
    'Jordan',
    'Kazakhstan',
    'Kenya',
    'Kiribati',
    'Kuwait',
    'Kyrgyzstan',
    'Laos',
    'Latvia',
    'Lebanon',
    'Lesotho',
    'Liberia',
    'Libya',
    'Liechtenstein',
    'Lithuania',
    'Luxembourg',
    'Madagascar',
    'Malawi',
    'Malaysia',
    'Maldives',
    'Mali',
    'Malta',
    'Marshall Islands',
    'Mauritania',
    'Mauritius',
    'Mexico',
    'Micronesia',
    'Moldova',
    'Monaco',
    'Mongolia',
    'Montenegro',
    'Morocco',
    'Mozambique',
    'Myanmar',
    'Namibia',
    'Nauru',
    'Nepal',
    'Netherlands',
    'New Zealand',
    'Nicaragua',
    'Niger',
    'Nigeria',
    'North Macedonia',
    'Norway',
    'Oman',
    'Pakistan',
    'Palau',
    'Palestine',
    'Panama',
    'Papua New Guinea',
    'Paraguay',
    'Peru',
    'Philippines',
    'Poland',
    'Portugal',
    'Qatar',
    'Romania',
    'Russia',
    'Rwanda',
    'Saint Kitts and Nevis',
    'Saint Lucia',
    'Saint Vincent and the Grenadines',
    'Samoa',
    'San Marino',
    'Sao Tome and Principe',
    'Saudi Arabia',
    'Senegal',
    'Serbia',
    'Seychelles',
    'Sierra Leone',
    'Singapore',
    'Slovakia',
    'Slovenia',
    'Solomon Islands',
    'Somalia',
    'South Africa',
    'South Korea',
    'South Sudan',
    'Spain',
    'Sri Lanka',
    'Sudan',
    'Suriname',
    'Sweden',
    'Switzerland',
    'Syria',
    'Taiwan',
    'Tajikistan',
    'Tanzania',
    'Thailand',
    'Togo',
    'Tonga',
    'Trinidad and Tobago',
    'Tunisia',
    'Turkey',
    'Turkmenistan',
    'Tuvalu',
    'Uganda',
    'Ukraine',
    'United Arab Emirates',
    'United Kingdom',
    'United States',
    'Uruguay',
    'Uzbekistan',
    'Vanuatu',
    'Vatican City',
    'Venezuela',
    'Vietnam',
    'Yemen',
    'Zambia',
    'Zimbabwe'
  ];
  isModalOpen = false; // Control modal visibility
  constructor(private renderer: Renderer2) { }
  formatCurrency(total: number): string {
    return `$${total.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
  }
  ngOnInit(): void {
  }
  differentAddress: boolean = false; // To track if postal address is different
  selectedCustomer: string = '';
  selectedGroup: string = '';
  selectedCountry: string = 'All Countries';
  isContentVisible: boolean = false;
  isPayBalanceOpen: boolean = false;

  showPayAccountBalance() {
    this.isPayBalanceOpen = true;
  }
  customerSearch: string = ''; // Ensure this property is defined
  newCustomer: Transaction = {
    name: '',
    email: '',
    group: 'Regular',
    storeCredit: 0,
    balance: 0,
    points: 0,
    country: 'All Countries',
    mobile: '', // Add default value
    phone: '', // Add default value
    bal_account: 0, // Add default value
    bal_totalSpent: 0, // Add default value
    bal_sotreCredit: 0, // Add default value
    bal_sotreCredit_issued: 0, // Add default value
    bal_sotreCredit_redeemed: 0, // Add default value
    bal_point: 0, // Add default value
    bal_issued: 0, // Add default value
    bal_redeemed: 0, // Add default value
  };


  // Sample transaction data
  // Sample transaction data
  transactions: Transaction[] = [
    {
      name: 'John Doe',
      email: 'john@example.com',
      group: 'Regular',
      storeCredit: 150,
      balance: 300,
      points: 50,
      country: 'USA',
      mobile: '123-456-7890', // Add mobile number
      phone: '987-654-3210', // Add phone number
      bal_account: 300, // Provide a sample value
      bal_totalSpent: 100, // Provide a sample value
      bal_sotreCredit: 150, // Provide a sample value
      bal_sotreCredit_issued: 50, // Provide a sample value
      bal_sotreCredit_redeemed: 25, // Provide a sample value
      bal_point: 50, // Provide a sample value
      bal_issued: 100, // Provide a sample value
      bal_redeemed: 30, // Provide a sample value
    },
    {
      name: 'Jane Smith',
      email: 'jane@example.com',
      group: 'VIP',
      storeCredit: 200,
      balance: 400,
      points: 75,
      country: 'Canada',
      mobile: '234-567-8901', // Add mobile number
      phone: '876-543-2109', // Add phone number
      bal_account: 400,
      bal_totalSpent: 150,
      bal_sotreCredit: 200,
      bal_sotreCredit_issued: 60,
      bal_sotreCredit_redeemed: 30,
      bal_point: 75,
      bal_issued: 150,
      bal_redeemed: 50,
    },
    {
      name: 'Alice Johnson',
      email: 'alice@example.com',
      group: 'New',
      storeCredit: 100,
      balance: 250,
      points: 30,
      country: 'UK',
      mobile: '345-678-9012', // Add mobile number
      phone: '765-432-1098', // Add phone number
      bal_account: 250,
      bal_totalSpent: 80,
      bal_sotreCredit: 100,
      bal_sotreCredit_issued: 40,
      bal_sotreCredit_redeemed: 10,
      bal_point: 30,
      bal_issued: 80,
      bal_redeemed: 20,
    },
    {
      name: 'Bob Brown',
      email: 'bob@example.com',
      group: 'Regular',
      storeCredit: 50,
      balance: 100,
      points: 10,
      country: 'Australia',
      mobile: '456-789-0123', // Add mobile number
      phone: '654-321-0987', // Add phone number
      bal_account: 100,
      bal_totalSpent: 20,
      bal_sotreCredit: 50,
      bal_sotreCredit_issued: 10,
      bal_sotreCredit_redeemed: 5,
      bal_point: 10,
      bal_issued: 20,
      bal_redeemed: 5,
    },
    {
      name: 'Charlie Green',
      email: 'charlie@example.com',
      group: 'VIP',
      storeCredit: 300,
      balance: 500,
      points: 100,
      country: 'Germany',
      mobile: '567-890-1234', // Add mobile number
      phone: '543-210-9876', // Add phone number
      bal_account: 500,
      bal_totalSpent: 200,
      bal_sotreCredit: 300,
      bal_sotreCredit_issued: 80,
      bal_sotreCredit_redeemed: 40,
      bal_point: 100,
      bal_issued: 200,
      bal_redeemed: 60,
    },
  ];

  filteredTransactions: Transaction[] = [...this.transactions];

  addcustomer() {
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
  closecustomer() {
    this.isContentVisible = false;
    this.scrollToTop();
  }
  searchTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      return (
        (this.customerSearch ? transaction.email.includes(this.customerSearch) : true) &&
        (this.selectedGroup ? transaction.group === this.selectedGroup : true) &&
        (this.selectedCountry && this.selectedCountry !== 'All Countries' ? transaction.country === this.selectedCountry : true)
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
    if (this.newCustomer.name && this.newCustomer.email) {
      this.transactions.push({ ...this.newCustomer });
      this.filteredTransactions = [...this.transactions]; // Update filtered transactions
      this.clearNewCustomer(); // Clear the form
    } else {
      alert('Please fill in all required fields.');
    }
  }

  clearNewCustomer() {
    this.newCustomer = {
      name: '',
      email: '',
      group: 'Regular',
      storeCredit: 0,
      balance: 0,
      points: 0,
      country: 'All Countries',
      mobile: '', // Add default value
      phone: '', // Add default value
      bal_account: 0, // Add default value
      bal_totalSpent: 0, // Add default value
      bal_sotreCredit: 0, // Add default value
      bal_sotreCredit_issued: 0, // Add default value
      bal_sotreCredit_redeemed: 0, // Add default value
      bal_point: 0, // Add default value
      bal_issued: 0, // Add default value
      bal_redeemed: 0, // Add default value
    };
  }


  editTransaction(transaction: Transaction) {
    this.addcustomer();
    console.log('Editing transaction:', transaction);
  }

  deleteTransaction(transaction: Transaction) {
    console.log('Deleting transaction:', transaction);
    this.filteredTransactions = this.filteredTransactions.filter(t => t !== transaction);
  }
}