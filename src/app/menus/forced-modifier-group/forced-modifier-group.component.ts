import { Component, OnInit } from '@angular/core';
import { ForcedModifierGroupsService } from '../../api/forcedmodifiergroups/forced-modifier-groups.service';
import { ToastService } from '../../component/toast/toast.service';

@Component({
  selector: 'app-forced-modifier-group',
  templateUrl: './forced-modifier-group.component.html',
  styleUrls: ['./forced-modifier-group.component.scss']
})

export class ForcedModifierGroupComponent implements OnInit {

  data: any[] = [];

  isContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: any = this.resetRow();

  currentDeleteID: string = '';
  isDeleteModal: boolean = false;

  constructor(
    private toastService: ToastService,
    private forcedModifierGroupsService: ForcedModifierGroupsService,
  ) { }

  ngOnInit(): void {
    // No dataService to subscribe to; rows are managed directly.
    this.onGetData();
  }

  onGetData() {
    this.forcedModifierGroupsService.read({}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data;
      },
      error: (err) => {
        console.error('Error fetching categories:', err);
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
    if (this.currentRow.name.trim() == '')
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
      this.forcedModifierGroupsService.update(this.currentRow).subscribe({
        next: (data) => {
          console.log('onGetData', data);
          this.onGetData();
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          //
        },
        error: (err) => {
          console.error('Error fetching collections:', err);
          this.toastService.showToast('Faild!', 'error', 3000);
        },
      });
    } else {
      // Add new row
      this.forcedModifierGroupsService.create(this.currentRow).subscribe({
        next: (data) => {
          console.log('onGetData', data);
          this.onGetData();
          this.toastService.showToast('Saved Sucessfully!', 'success', 3000);
          //
        },
        error: (err) => {
          console.error('Error fetching collections:', err);
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

  private resetRow(): any {
    return {name: '', touch: false, multiple_choice: false, pizza_size_style: false, pizza_topping: false, pizza_full_half: false, not_display_kitchen_monitor: false };
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
    this.forcedModifierGroupsService.delete({ _id: this.currentDeleteID }).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.toastService.showToast('Deleted Sucessfully!', 'success', 3000);
        this.onGetData();
        //
      },
      error: (err) => {
        console.error('Error fetching collections:', err);
        this.toastService.showToast('Faild!', 'error', 3000);
      },
    });
    this.isDeleteModal = false;
  }

}
