import { Component, OnInit } from '@angular/core';
import { PrioritiesService } from '../../api/priorities/priorities.service';
import { ToastService } from '../../component/toast/toast.service';

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.scss']
})

export class PriorityComponent implements OnInit {
  data: any[] = [];

  isContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: any = this.resetRow();

  currentDeleteID: string = '';
  isDeleteModal: boolean = false;

  constructor(
    private toastService: ToastService,
    private prioritiesService: PrioritiesService,
  ) { }

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
    this.onGetData();
  }

  onGetData() {
    this.prioritiesService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching priorities:', err);
        this.toastService.showToast('Faild!', 'error', 3000);
      },
    });
  }

  toggleContent(): void {
    this.isContentVisible = true; // Toggle the visibility
  }

  saveRow(): void {
    if (this.currentRow.name.trim() == '' || this.currentRow.description.trim() == '')
    {
      this.toastService.showToast('Invalid values!', 'warning', 3000);
      return;
    }

    if (this.currentRow?._id) {
      // Update existing row
      /* const index = this.rows.findIndex((row) => row.id === this.currentRow.id);
      if (index !== -1) {
        this.rows[index] = { ...this.currentRow }; // Update row
      } */
      this.prioritiesService.update(this.currentRow).subscribe({
        next: (data) => {
          console.log('onGetData', data);
          this.onGetData();
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          //
        },
        error: (err) => {
          console.error('Error fetching priorities:', err);
          this.toastService.showToast('Faild!', 'error', 3000);
        },
      });
    } else {
      // Add new row
      this.prioritiesService.create(this.currentRow).subscribe({
        next: (data) => {
          console.log('onGetData', data);
          this.onGetData();
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          //
        },
        error: (err) => {
          console.error('Error fetching priorities:', err);
          this.toastService.showToast('Faild!', 'error', 3000);
        },
      });
    }
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  editRow(row: any): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isContentVisible = true;
  }

  cancelEdit(): void {
    this.isContentVisible = false;
    this.currentRow = this.resetRow();
  }

  private resetRow() {
    return { name: '', description: '' };
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
    this.prioritiesService.delete({ _id: this.currentDeleteID }).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.toastService.showToast('Deleted Sucessfully!', 'success', 3000);
        this.onGetData();
        //
      },
      error: (err) => {
        console.error('Error fetching priorities:', err);
        this.toastService.showToast('Faild!', 'error', 3000);
      },
    });
    this.isDeleteModal = false;
  }

}
