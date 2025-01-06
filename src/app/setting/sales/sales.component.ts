import { Component, OnInit } from '@angular/core';
import { TaxesService } from '../../api/taxes/taxes.service';

export interface TableRow {
  _id?: string;
  name?: string;
  rate?: number;
  private_web_address?: string;
  created_at?: string;
  _v?: number;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})

export class SalesComponent implements OnInit {

  data: TableRow[] = [];
  isContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();

  currentDeleteID: string = '';
  isDeleteModal = false;

  constructor(private taxesService: TaxesService) { }
  
  toggleContent(): void {
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
  }

  ngOnInit(): void {
    /* this.dataService.data$.subscribe((data) => {
      this.rows = data;
    }); */
    this.onGetTaxes();
  }

  onGetTaxes() {
    this.taxesService.read({}).subscribe({
      next: (data) => {
        console.log(data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching taxes:', err);
      },
    });
  }

  saveRow() {
    /* if (this.currentRow._id) {
      //this.dataService.updateRow(this.currentRow);
    } else {
      this.dataService.addRow({
        ...this.currentRow,
        id: this.generateId(),
      });
    } */
    if (this.currentRow.name.trim() == "" || this.currentRow.rate == 0)
    {
      console.log("Please check the fields.");
      return;
    }

    if(this.currentRow._id != '') {
      this.taxesService.update(this.currentRow).subscribe({
        next: (data) => {
          console.log(data);
          this.onGetTaxes();
        },
        error: (err) => {
          console.error('Error fetching taxes:', err);
        },
      });
    }
    else
    {
      const params = {
        name: this.currentRow.name,
        rate: this.currentRow.rate,
      };
  
      this.taxesService.create(params).subscribe({
        next: (data) => {
          console.log(data);
          this.onGetTaxes();
        },
        error: (err) => {
          console.error('Error fetching taxes:', err);
        },
      });
    }

    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  editRow(row: TableRow) {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isContentVisible = true;
  }

  showDeleteModal(id: string) {
    this.currentDeleteID = id;
    this.isDeleteModal = true;
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  deleteRow() {
    this.taxesService.delete({_id: this.currentDeleteID}).subscribe({
      next: (data) => {
        console.log(data);
        this.data = this.data.filter((row) => row._id !== this.currentDeleteID);
      },
      error: (err) => {
        console.error('Error fetching taxes:', err);
      },
    });
    this.isDeleteModal = false;
  }

  cancelEdit() {
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  private resetRow(): TableRow {
    return  { _id: '',
      name: '',
      rate: 0,
      private_web_address: '',
      created_at: '',
      _v: 0
    }
  }
}
