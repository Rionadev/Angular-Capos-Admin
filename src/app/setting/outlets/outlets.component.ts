import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data/data.service';
import { TableRow } from '../../data/table-row.model';

@Component({
  selector: 'app-outlets',
  templateUrl: './outlets.component.html',
  styleUrls: ['./outlets.component.scss']
})
export class OutletsComponent implements OnInit {

  rows: TableRow[] = [];
  isContentVisible: boolean = false; // Initially hidden for add or editing.
  selectedItemId: number | null = null; // Variable to track which row is expanded
  isToggled: boolean = false; // Default state of the toggle

  currentRow: TableRow = this.resetRow();
  constructor(private dataService: DataService) { }
  
  toggleDetails(itemId: number): void {
    console.log(itemId);
    this.selectedItemId = this.selectedItemId === itemId ? null : itemId; // Toggle selection //this.selectedItemId === itemId ? null : 
  }

  toggleContent(): void {
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
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
