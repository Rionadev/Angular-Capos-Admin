import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../../api/employees/api.service';
import { RolesService } from '../../api/roles/roles.service';
import { CountriesService } from '../../api/countries/countries.service';
import { ToastService } from '../../component/toast/toast.service';
import { OutletsService } from '../../api/outlets/outlets.service';

export interface User {
  _id: string;
  private_web_address: string;
  user_id?: number; // Optional because it has a default value
  first_name: string;
  last_name: string;
  email: string;
  password?: string; // Optional because it doesn't have `required: true` in the schema
  birthday?: any; // Optional because it has a default value
  phone?: string;
  mobile?: string;
  email_verify?: boolean; // Optional because it has a default value
  outlet?: any | null; // Ref to 'Outlet', nullable
  register?: any | null; // Ref to 'Register', nullable
  physical_address: {
    street?: string; // Optional because it has a default value
    city?: string; // Optional because it has a default value
    suburb?: string; // Optional because it has a default value
    postcode?: string; // Optional because it has a default value
    state?: string; // Optional because it has a default value
    country?: any | null; // Ref to 'Country', nullable
  };
  commission?: number; // Optional because it isn't marked as `required`
  hour_salary?: number; // Optional because it isn't marked as `required`
  is_in_training?: boolean; // Optional because it has a default value
  ip_address?: string; // Optional because it isn't marked as `required`
  role?: any | null; // Ref to 'Role', nullable
  joined_date?: any; // Optional because it has a default value
  daily_target?: number; // Optional because it has a default value
  weekly_target?: number; // Optional because it has a default value
  monthly_target?: number; // Optional because it has a default value
}


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {

  isContentVisible: boolean = false; // Initially hidden for add or editing.
  isImportContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: User = this.resetRow();
  birthday: any;
  joined_date: any;
  roleForm: string = '';
  outletForm: string = '';

  role: string = '';
  roles: { name: string; value: string }[] = [{ name: 'All Roles', value: '' }];
  outlet: string = '';
  outlets: { name: string; value: string }[] = [{ name: 'All Outlets', value: '' }];
  keyword: string = '';

  isDeleteModal: boolean = false;
  currentDeleteID: string = '';
  users: any[] = [];
  countries: any[] = [];

  constructor(
    @Inject('APP_CONFIG') private config: any,
    private apiService: ApiService,
    private rolesService: RolesService,
    private countriesService: CountriesService,
    private toastService: ToastService,
    private outletsService: OutletsService,
  ) {
    console.log(this.config.apiUrl);
  }

  ngOnInit(): void {
    this.onGetRoles();
    this.onGetUsers();
    this.onGetCountries();
    this.onGetOutlets();
  }

  onGetOutlets() {
    this.outletsService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        data.forEach(item => {
          this.outlets.push({ name: item.name, value: item._id });
        });
      },
      error: (err) => {
        console.error('Error fetching outlets:', err);
      },
    });
  }

  toggleContent(): void {
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
  }

  onGetUsers(): void {
    const params = {
      /* name: this.keyword, */
      role: this.role, // Example role
      outlet: this.outlet, // Example outlet
    };

    this.apiService.getUsers(params).subscribe({
      next: (data) => {
        this.users = data;
        console.log("user", data);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
  }

  onGetRoles() {
    this.rolesService.read({}).subscribe({
      next: (data) => {
        console.log(data);
        // Push all items from data into roles
        data.forEach(item => {
          this.roles.push({ name: item.name, value: item._id });
        });
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      },
    });
  }

  onGetCountries() {
    this.countriesService.read({}).subscribe({
      next: (data) => {
        console.log(data);
        this.countries = data;
      },
      error: (err) => {
        console.error('Error fetching countries:', err);
      },
    });
  }

  toggleImportContent(): void {
    this.isImportContentVisible = !this.isImportContentVisible; // Toggle the visibility
    this.isContentVisible = false;
  }
  handleSelect(event: any) {
    const file = event.target.files[0];
    if (file && file.type === 'text/csv') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const csvData = e.target.result;
        const customers = this.parseCSV(csvData);
        console.log('--------', customers);

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
        } 
        else if (header.startsWith('defaultTax.')) {
          // Handle custom_information fields
          // const fieldName = header.split('custom_information.')[1];
          // customInformation[fieldName] = row[index];
        } 
        else if (header.startsWith('regisgter.')) {
          // Handle custom_information fields
          // const fieldName = header.split('custom_information.')[1];
          // customInformation[fieldName] = row[index];
        } 
        else if (header.startsWith('physical_address.')) {
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

  saveRow(): void {
    if (this.currentRow._id) {
      // Update existing row
      this.currentRow.joined_date = this.joined_date;
      this.currentRow.birthday = this.birthday;
      this.currentRow.role = this.roleForm;
      this.currentRow.outlet = this.currentRow?.outlet?._id;
      this.apiService.update(this.currentRow).subscribe({
        next: (data) => {
          console.log(data);
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          this.onGetUsers();
        },
        error: (err) => {
          console.error('Error fetching roles:', err);
        },
      });
    } else {
      // Add new row
      const params = {
        first_name: this.currentRow.first_name,
        last_name: this.currentRow.last_name,
        email: this.currentRow.email,
        password: this.currentRow.password, // Optional
        birthday: this.birthday, // Optional
        phone: this.currentRow.phone,
        mobile: this.currentRow.mobile,
        email_verify: false,
        outlet: null,
        register: null,
        physical_address: {
          street: this.currentRow.physical_address.street,
          city: this.currentRow.physical_address.city,
          suburb: '',
          postcode: this.currentRow.physical_address.postcode,
          state: this.currentRow.physical_address.state,
          country: this.currentRow.physical_address.country,
        },
        commission: this.currentRow.commission, // Optional
        hour_salary: this.currentRow.hour_salary, // Optional
        is_in_training: false,
        ip_address: '',
        role: this.roleForm,
        joined_date: this.joined_date, // Optional
        daily_target: 0,
        weekly_target: 0,
        monthly_target: 0,
      };

      this.apiService.create(params).subscribe({
        next: (data) => {
          console.log(data);
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          this.onGetUsers();
        },
        error: (err) => {
          console.error('Error fetching roles:', err);
        },
      });
    }
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  editRow(row: any): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits

    this.birthday = this.formatDate(this.currentRow.birthday);
    this.joined_date = this.formatDate(this.currentRow.joined_date);
    this.roleForm = this.currentRow.role?._id;
    this.outletForm = this.currentRow.outlet?._id;
    console.log('roleForm', this.roleForm);
    console.log('outletForm', this.outletForm);
    this.isContentVisible = true;
  }

  formatDate(temp: Date): string {
    const date = new Date(temp);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // 'yyyy-MM-dd'
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  showDeleteModal(id: string) {
    this.currentDeleteID = id;
    this.isDeleteModal = true;
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  deleteRow() {
    this.apiService.delete({ _id: this.currentDeleteID }).subscribe({
      next: (data) => {
        console.log(data);
        this.onGetUsers();
        this.isDeleteModal = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
    });
    this.isDeleteModal = false;
    /* this.rows = this.rows.filter((row) => row.id !== this.currentDeleteID); // Remove row by id
    this.isDeleteModal = false; */
  }

  private resetRow(): User {
    return {
      _id: '',
      private_web_address: '',
      user_id: 0,
      first_name: '',
      last_name: '',
      email: '',
      password: undefined, // Optional
      birthday: undefined, // Optional
      phone: '',
      mobile: '',
      email_verify: false,
      outlet: null,
      register: null,
      physical_address: {
        street: '',
        city: '',
        suburb: '',
        postcode: '',
        state: '',
        country: null,
      },
      commission: undefined, // Optional
      hour_salary: undefined, // Optional
      is_in_training: false,
      ip_address: '',
      role: null,
      joined_date: undefined, // Optional
      daily_target: 0,
      weekly_target: 0,
      monthly_target: 0,
    };
  }

  onClearFilters() {
    this.keyword = '';
    this.role = '';
    this.outlet = '';
    this.onGetUsers();
  }

  onSearch() {
    this.onGetUsers();
    this.toastService.showToast('Filtered Successfully!', 'success', 3000);
    /* this.toastService.showToast('This is a success message!', 'success', 3000);
    this.toastService.showToast('This is a info message!', 'info', 3000);
    this.toastService.showToast('This is a warning message!', 'warning', 3000);
    this.toastService.showToast('This is a error message!', 'error', 3000); */
  }
}

