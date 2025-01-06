import { Component, OnInit, Inject  } from '@angular/core';
import { ApiService } from '../../api/employees/api.service';

export interface TableRow {
  id: number;
  name: string;
  email: string;
  role: string;
  outlet: string;
  dailytarget: string;
  weeklytarget: string;
  monthlytarget: string;
}

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {

  rows: TableRow[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'Manager',
      outlet: 'Outlet A',
      dailytarget: '100',
      weeklytarget: '500',
      monthlytarget: '2000',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Salesperson',
      outlet: 'Outlet B',
      dailytarget: '80',
      weeklytarget: '400',
      monthlytarget: '1600',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      role: 'Supervisor',
      outlet: 'Outlet C',
      dailytarget: '120',
      weeklytarget: '600',
      monthlytarget: '2400',
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Clerk',
      outlet: 'Outlet D',
      dailytarget: '70',
      weeklytarget: '350',
      monthlytarget: '1400',
    },
    {
      id: 5,
      name: 'William Brown',
      email: 'william.brown@example.com',
      role: 'Assistant Manager',
      outlet: 'Outlet A',
      dailytarget: '90',
      weeklytarget: '450',
      monthlytarget: '1800',
    },
  ];

  isContentVisible: boolean = false; // Initially hidden for add or editing.
  isImportContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();

  selectedRole: string = 'All Roles';
  roles: string[] = ['All Roles', 'Free', 'Cashier', 'Admin'];
  selectedOutlet: string = 'All Outlets';
  outlets: string[] = ['All Outlets', 'Free', 'Cashier', 'Admin'];
  search: string = '';

  isDeleteModal: boolean = false;
  loading:boolean = true;
  currentDeleteID: number = 0;
  users: any[] = [];

  constructor(@Inject('APP_CONFIG') private config: any, private apiService: ApiService) { 
    console.log(this.config.apiUrl);

  }

  ngOnInit(): void {
    this.fetchUsers();
  }
  
  toggleContent(): void {
    /* this.apiService.getUsers().subscribe({
      next: (data) => {
        //this.users = data;
        console.log('Response:', data);
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      },
    }); */
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
  }

  fetchUsers(): void {
    const params = {
      role: '', // Example role
      outlet: '', // Example outlet
      private_web_address: this.config.private_web_address, // Example private_web_address
    };

    this.apiService.getUsers(params).subscribe({
      next: (data) => {
        this.users = data;
        console.log(data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.loading = false;
      },
    });
  }

  toggleImportContent(): void {
    this.isImportContentVisible = !this.isImportContentVisible; // Toggle the visibility
    this.isContentVisible = false;
  }

  saveRow(): void {
    if (this.currentRow.id) {
      // Update existing row
      const index = this.rows.findIndex((row) => row.id === this.currentRow.id);
      if (index !== -1) {
        this.rows[index] = { ...this.currentRow }; // Update row
      }
    } else {
      // Add new row
      this.rows.push({
        ...this.currentRow,
        id: this.generateId(),
      });
    }
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  editRow(row: TableRow): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isContentVisible = true;
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  showDeleteModal(id: number) {
    this.currentDeleteID = id;
    this.isDeleteModal = true;
  }

  closeDeleteModal(){
    this.isDeleteModal = false;
  }

  deleteRow() {
    this.rows = this.rows.filter((row) => row.id !== this.currentDeleteID); // Remove row by id
    this.isDeleteModal = false;
  }

  private resetRow(): TableRow {
    return { id: 0, name: '', email: '', role: '', outlet: '', dailytarget: '', weeklytarget: '', monthlytarget:'' };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }

  onClearFilters() {
    this.search = '';
    this.selectedRole = 'All Roles';
    this.selectedOutlet = 'All Outlets';
  }

  onSearch() {

  }
}

