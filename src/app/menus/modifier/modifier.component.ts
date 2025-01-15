import { Component, OnInit } from '@angular/core';
import { ModifierTypesService } from '../../api/modifiertypes/modifier-types.service';
import { ModifiersService } from '../../api/modifiers/modifiers.service';
import { ToastService } from '../../component/toast/toast.service';
// Declare the TableRow interface outside of the component
export interface TableRow {
  id: number;
  name: string;
  categoryname: string;
  touch: boolean;
};

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.component.html',
  styleUrls: ['./modifier.component.scss']
})

export class ModifierComponent implements OnInit {
  data: any[] = [];

  isContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: any = this.resetRow();

  currentDeleteID: string = '';
  isDeleteModal: boolean = false;

  dataType: any[] = [];

  constructor(
    private toastService: ToastService,
    private modifiersService: ModifiersService,
    private modifierTypesService: ModifierTypesService,
  ) { }

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
    this.onGetData();
    this.onGetType();
  }

  onGetType() {
    this.modifierTypesService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.dataType = data;
      },
      error: (err) => {
        console.error('Error fetching types:', err);
        this.toastService.showToast('Faild!', 'error', 3000);
      },
    });
  }

  onGetData() {
    this.modifiersService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching modifiers:', err);
        this.toastService.showToast('Faild!', 'error', 3000);
      },
    });
  }

  toggleContent(): void {
    this.isContentVisible = true; // Toggle the visibility
  }

  saveRow(): void {
    /* if (this.currentRow.id) {
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
    } */
    if (this.currentRow.name.trim() == '') {
      this.toastService.showToast('Invalid values!', 'warning', 3000);
      return;
    }

    if (this.currentRow?._id) {
      // Update existing row
      /* const index = this.rows.findIndex((row) => row.id === this.currentRow.id);
      if (index !== -1) {
        this.rows[index] = { ...this.currentRow }; // Update row
      } */
      this.modifiersService.update(this.currentRow).subscribe({
        next: (data) => {
          console.log('onGetData', data);
          this.onGetData();
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          //
        },
        error: (err) => {
          console.error('Error fetching modifiers:', err);
          this.toastService.showToast('Faild!', 'error', 3000);
        },
      });
    } else {
      // Add new row
      this.modifiersService.create(this.currentRow).subscribe({
        next: (data) => {
          console.log('onGetData', data);
          this.onGetData();
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          //
        },
        error: (err) => {
          console.error('Error fetching modifiers:', err);
          this.toastService.showToast('Faild!', 'error', 3000);
        },
      });
    }
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  editRow(row: any): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.currentRow.type = this.currentRow.type?._id;
    this.isContentVisible = true;
  }

  cancelEdit(): void {
    this.isContentVisible = false;
    this.currentRow = this.resetRow();
  }

  private resetRow(): any {
    return { name: '', slug: '', touch: false, cigarette: false, revenue: false, description: '' };
  }

  /* private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  } */
  showDeleteModal(id: string) {
    this.currentDeleteID = id;
    this.isDeleteModal = true;
  }

  closeDeleteModal() {
    this.isDeleteModal = false;
  }

  deleteRow() {
    /* this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id */
    //this.isContentVisible = false;
    this.modifiersService.delete({ _id: this.currentDeleteID }).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.toastService.showToast('Deleted Sucessfully!', 'success', 3000);
        this.onGetData();
        //
      },
      error: (err) => {
        console.error('Error fetching modifiers:', err);
        this.toastService.showToast('Faild!', 'error', 3000);
      },
    });
    this.isDeleteModal = false;
  }

}
