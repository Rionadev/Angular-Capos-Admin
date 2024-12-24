import { Component, OnInit } from '@angular/core';
interface Product {
  id: number;
  name: string;
  category: string; // Product Type
  brand: string;
  supplier: string;
  attributes: string; // Comma-separated values for attributes
  tags: string; // Comma-separated values for tags
  status: string; // e.g., "Active", "Inactive"
  Barcode: string;
  retailPrice: number;
  inventory: string;
  active: boolean;
  touch: boolean;
  created: Date;
  isEditing?: boolean; // Add isEditing property
}

@Component({
  selector: 'app-manageorders',
  templateUrl: './manageorders.component.html',
  styleUrls: ['./manageorders.component.scss']
})
export class ManageordersComponent implements OnInit {
  allRows: any[] = [
    {
      id: 1,
      type: 'Purchase Order',
      number: 'PO-1001',
      from: 'Main Outlet',
      to: 'Sub Store',
      status: 'Pending',
      items: 5,
      cost: 150.00,
      created: new Date('2024-01-15'),
      dueDate: new Date('2024-01-30')
    },
    {
      id: 2,
      type: 'Return Order',
      number: 'RO-2001',
      from: 'Sub Store',
      to: 'Main Outlet',
      status: 'Completed',
      items: 2,
      cost: 50.00,
      created: new Date('2024-01-10'),
      dueDate: new Date('2024-01-20')
    },
    {
      id: 3,
      type: 'Receive Order',
      number: 'RO-3001',
      from: 'Supplier A',
      to: 'Main Outlet',
      status: 'In Transit',
      items: 10,
      cost: 300.00,
      created: new Date('2024-01-12'),
      dueDate: new Date('2024-01-25')
    },
    {
      id: 4,
      type: 'Purchase Order',
      number: 'PO-1002',
      from: 'Test Outlet1',
      to: 'Main Outlet',
      status: 'Pending',
      items: 8,
      cost: 200.00,
      created: new Date('2024-01-18'),
      dueDate: new Date('2024-02-02')
    },
    {
      id: 5,
      type: 'Return Order',
      number: 'RO-2002',
      from: 'Main Outlet',
      to: 'Supplier B',
      status: 'Completed',
      items: 3,
      cost: 75.00,
      created: new Date('2024-01-14'),
      dueDate: new Date('2024-01-22')
    },
    {
      id: 6,
      type: 'Receive Order',
      number: 'RO-3002',
      from: 'Supplier C',
      to: 'Sub Store',
      status: 'Pending',
      items: 15,
      cost: 450.00,
      created: new Date('2024-01-16'),
      dueDate: new Date('2024-01-28')
    },
    {
      id: 7,
      type: 'Purchase Order',
      number: 'PO-1003',
      from: 'Main Outlet',
      to: 'Test Outlet1',
      status: 'Completed',
      items: 4,
      cost: 120.00,
      created: new Date('2024-01-20'),
      dueDate: new Date('2024-02-05')
    },
    {
      id: 8,
      type: 'Return Order',
      number: 'RO-2003',
      from: 'Sub Store',
      to: 'Supplier A',
      status: 'In Transit',
      items: 1,
      cost: 25.00,
      created: new Date('2024-01-11'),
      dueDate: new Date('2024-01-21')
    }
  ];

  ngOnInit(): void {

  }
  constructor() { }
  searchInvoice: string = '';
  selectedOrderType: string = '';
  selectedOutlet: string = '';
  selectedSupplier: string = '';
  createdAtStart: Date | null = null;
  createdAtEnd: Date | null = null;
  dueDateStart: Date | null = null;
  dueDateEnd: Date | null = null;

  filteredRows: any[] = [];
  currentPage: number = 1;
  totalPages: number = 1;

  // Method to filter rows based on the criteria
  filterRows() {
    this.filteredRows = this.allRows.filter(row => {
      const matchesInvoice = !this.searchInvoice || row.number.includes(this.searchInvoice);
      const matchesOrderType = !this.selectedOrderType || row.type === this.selectedOrderType;
      const matchesOutlet = !this.selectedOutlet || row.from === this.selectedOutlet;
      const matchesSupplier = !this.selectedSupplier || row.from === this.selectedSupplier;

      const matchesCreatedAt = (!this.createdAtStart || new Date(row.created) >= new Date(this.createdAtStart)) &&
        (!this.createdAtEnd || new Date(row.created) <= new Date(this.createdAtEnd));

      const matchesDueDate = (!this.dueDateStart || new Date(row.dueDate) >= new Date(this.dueDateStart)) &&
        (!this.dueDateEnd || new Date(row.dueDate) <= new Date(this.dueDateEnd));

      return matchesInvoice && matchesOrderType && matchesOutlet && matchesSupplier && matchesCreatedAt && matchesDueDate;
    });
    this.updatePagination();
  }

  clearFilters() {
    this.searchInvoice = '';
    this.selectedOrderType = '';
    this.selectedOutlet = '';
    this.selectedSupplier = '';
    this.createdAtStart = null;
    this.createdAtEnd = null;
    this.dueDateStart = null;
    this.dueDateEnd = null;
    this.filterRows(); // Reapply filter to reset the displayed rows
  }

  updatePagination() {
    // Logic to update currentPage and totalPages based on filteredRows
  }
  getTotalItems(): number {
    return this.filteredRows.reduce((total, row) => total + row.items, 0);
  }

  getTotalCost(): number {
    return this.filteredRows.reduce((total, row) => total + row.cost, 0);
  }
  // Other methods...
}