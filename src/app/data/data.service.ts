import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableRow } from './table-row.model';

@Injectable({
  providedIn: 'root',
})

export class DataService {
  private data: TableRow[] = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', phone: '555-1234' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', phone: '555-5678' },
  ];

  private dataSubject = new BehaviorSubject<TableRow[]>(this.data);
  data$ = this.dataSubject.asObservable();

  addRow(row: TableRow) {
    this.data.push(row);
    this.dataSubject.next(this.data);
  }

  updateRow(updatedRow: TableRow) {
    const index = this.data.findIndex((row) => row.id === updatedRow.id);
    if (index > -1) {
      this.data[index] = updatedRow;
      this.dataSubject.next(this.data);
    }
  }

  deleteRow(id: number) {
    this.data = this.data.filter((row) => row.id !== id);
    this.dataSubject.next(this.data);
  }
}