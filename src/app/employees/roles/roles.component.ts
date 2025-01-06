import { Component, OnInit } from '@angular/core';

export interface TableRow {
  id: number;
  name: string;
  updated: string;
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})

export class RolesComponent implements OnInit {

  rows: TableRow[] = [
    { id: 1, name: 'John Doe', updated: '555-1234' },
    { id: 2, name: 'Jane Smith', updated: '555-5678' },
  ];

  isAddRoleContentVisible: boolean = false; // Initially hidden for add or editing.
  isDeleteModal: boolean = false;
  currentRow: TableRow = this.resetRow();
  currentDeleteID: number = 0;

  constructor() { }
  
  toggleAddRoleContent(): void {
    this.isAddRoleContentVisible = !this.isAddRoleContentVisible; // Toggle the visibility
  }

  ngOnInit(): void {
  }

  saveRow() {
    this.currentRow = this.resetRow();
    this.isAddRoleContentVisible = false;
  }

  editRow(row: TableRow) {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isAddRoleContentVisible = true;
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


  cancelEdit() {
    this.currentRow = this.resetRow();
    this.isAddRoleContentVisible = false;
  }

  private resetRow(): TableRow {
    return { id: 0, name: '', updated: '' };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }

  onSelectAll() {
    
  }

  onDeselectAll() {

  }
}
