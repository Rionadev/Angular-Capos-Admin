import { Component, OnInit } from '@angular/core';
import { DataService } from '../data/data.service';
import { TableRow } from '../data/table-row.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})

export class EmployeesComponent implements OnInit {

  rows: TableRow[] = [];
  isContentVisible: boolean = false; // Initially hidden for add or editing.
  isImportContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();
  constructor(private dataService: DataService) { }
  
  toggleContent(): void {
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
  }

  toggleImportContent(): void {
    this.isImportContentVisible = !this.isImportContentVisible; // Toggle the visibility
    this.isContentVisible = false;
  }

  ngOnInit(): void {
    this.dataService.data$.subscribe((data) => {
      this.rows = data;
    });
  }

  saveRow() {
    if (this.currentRow.id) {
      this.dataService.updateRow(this.currentRow);
    } else {
      this.dataService.addRow({
        ...this.currentRow,
        id: this.generateId(),
      });
    }
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  editRow(row: TableRow) {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isContentVisible = true;
  }

  deleteRow(id: number) {
    this.dataService.deleteRow(id);
    this.isContentVisible = false;
  }

  cancelEdit() {
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  private resetRow(): TableRow {
    return { id: 0, name: '', email: '', phone: '' };
  }

  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  }
}

