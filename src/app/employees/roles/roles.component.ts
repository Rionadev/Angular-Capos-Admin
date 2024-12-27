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

  isContentVisible: boolean = false; // Initially hidden for add or editing.
  isImportContentVisible: boolean = false; // Initially hidden for add or editing.
  isDeleteModal: boolean = false;
  currentRow: TableRow = this.resetRow();
  currentID: number = 0;

  constructor() { }
  
  toggleContent(): void {
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
  }

  toggleImportContent(): void {
    this.isImportContentVisible = !this.isImportContentVisible; // Toggle the visibility
    this.isContentVisible = false;
  }

  ngOnInit(): void {
  }

  saveRow() {
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  editRow(row: TableRow) {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isContentVisible = true;
  }

  deleteModal(id: number) {
    this.currentID = id;
    this.isDeleteModal = true;
  }

  deleteRow() {
    this.isDeleteModal = false;
  }

  cancelEdit() {
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  private resetRow(): TableRow {
    return { id: 0, name: '', updated: '' };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }

}
