import { Component, OnInit } from '@angular/core';

interface Transaction {
  name: string;
  email: string;
  group: string;
  storeCredit: number;
  balance: number;
  points: number;
  country: string;
}

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})


export class CustomersComponent implements OnInit {

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

  constructor() { }

  ngOnInit(): void {
  }

  selectedCustomer: string = '';
  selectedGroup: string = '';
  selectedCountry: string = 'All Countries';

  customerSearch: string = ''; // Ensure this property is defined
  newCustomer: Transaction = {
    name: '',
    email: '',
    group: 'Regular',
    storeCredit: 0,
    balance: 0,
    points: 0,
    country: 'All Countries'
  };

  // Sample transaction data
  // Sample transaction data

  transactions: Transaction[] = [
    { name: 'John Doe', email: 'john@example.com', group: 'Regular', storeCredit: 150, balance: 300, points: 50, country: 'USA' },
    { name: 'Jane Smith', email: 'jane@example.com', group: 'VIP', storeCredit: 200, balance: 400, points: 75, country: 'Canada' },
    { name: 'Alice Johnson', email: 'alice@example.com', group: 'New', storeCredit: 100, balance: 250, points: 30, country: 'UK' },
    { name: 'Bob Brown', email: 'bob@example.com', group: 'Regular', storeCredit: 50, balance: 100, points: 10, country: 'Australia' },
    { name: 'Charlie Green', email: 'charlie@example.com', group: 'VIP', storeCredit: 300, balance: 500, points: 100, country: 'Germany' },
  ];

  filteredTransactions: Transaction[] = [...this.transactions];

  searchTransactions() {
    this.filteredTransactions = this.transactions.filter(transaction => {
      return (
        (this.customerSearch ? transaction.email.includes(this.customerSearch) : true) &&
        (this.selectedGroup ? transaction.group === this.selectedGroup : true) &&
        (this.selectedCountry && this.selectedCountry !== 'All Countries' ? transaction.country === this.selectedCountry : true)
      );
    });
  }

  clearFilters() {
    this.selectedCustomer = '';
    this.selectedGroup = '';
    this.selectedCountry = 'All Countries';
    this.customerSearch = ''; // Reset search
    this.filteredTransactions = [...this.transactions];
  }

  addCustomer() {
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
      country: 'All Countries'
    };
  }

  viewTransaction(transaction: Transaction) {
    console.log('Viewing transaction:', transaction);
  }

  editTransaction(transaction: Transaction) {
    console.log('Editing transaction:', transaction);
  }

  deleteTransaction(transaction: Transaction) {
    console.log('Deleting transaction:', transaction);
    this.filteredTransactions = this.filteredTransactions.filter(t => t !== transaction);
  }
}