import { Component, OnInit } from '@angular/core';
import { CollectionsService } from '../../api/collections/collections.service';

// Declare the TableRow interface outside of the component
export interface TableRow {
  private_web_address: string;
  name: string;
  image: any;
  active: boolean;
  parent: any | null; // Reference to another collection or null
  products: any | null;    // Array of Product references
  created_at: any;
  children: any | null;  // Array of child collections
  _id: any;
}

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})

export class CollectionsComponent implements OnInit {

  data: any[] = [];

  isContentVisible: boolean = false; // Initially hidden for add or editing.
  currentRow: TableRow = this.resetRow();

  parents: { name: string; value: string }[] = [{ name: 'Root', value: null }];
  selectedParent: string = null; // Default selected value
  name: string = '';
  active: boolean = true;
  file: any = null;

  currentDeleteID: string = '';
  isDeleteModal: boolean = false;

  constructor(private collectionsService: CollectionsService) { }

  ngOnInit(): void {
    this.onGetData();
    // No dataService to subscribe to; rows are managed directly.
  }

  toggleContent(): void {
    this.isContentVisible = !this.isContentVisible; // Toggle the visibility
  }

  onGetData(): void {
    this.collectionsService.read({
    }).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.data = data;
        //
        this.parents = [{ name: 'Root', value: null }];
        data.forEach(item => {
          this.parents.push({ name: item.name, value: item._id });
        });

      },
      error: (err) => {
        console.error('Error fetching collections:', err);
      },
    });
  }

  saveRow(): void {
    if (this.currentRow?._id) {
      // Update existing row
      /* const index = this.rows.findIndex((row) => row.id === this.currentRow.id);
      if (index !== -1) {
        this.rows[index] = { ...this.currentRow }; // Update row
      } */
        this.collectionsService.update(this.currentRow).subscribe({
          next: (data) => {
            console.log('onGetData', data);
            this.onGetData();
            //
          },
          error: (err) => {
            console.error('Error fetching collections:', err);
          },
        });
    } else {
      // Add new row
      this.collectionsService.create({
        name: this.currentRow.name,    
        image: this.currentRow.image,
        active: this.currentRow.active,
        parent: this.currentRow.parent,    
      }).subscribe({
        next: (data) => {
          console.log('onGetData', data);
          this.onGetData();
          //
        },
        error: (err) => {
          console.error('Error fetching collections:', err);
        },
      });
    }
    this.currentRow = this.resetRow();
    this.name = '';
    this.selectedParent = null;
    this.active = true;
    this.isContentVisible = false;
  }

  getDate(dateTimeString: string): string {
    // Split the string by 'T' and return the first part (date)
    return dateTimeString.split("T")[0];
  }

  editRow(row: TableRow): void {
    this.currentRow = { ...row }; // Clone the row to avoid direct edits
    this.isContentVisible = true;
  }

  showDeleteModal(id: string) {
    this.currentDeleteID = id;
    this.isDeleteModal = true;
  }

  closeDeleteModal(){
    this.isDeleteModal = false;
  }

  deleteRow() {
    /* this.rows = this.rows.filter((row) => row.id !== id); // Remove row by id */
    //this.isContentVisible = false;
    this.collectionsService.delete({_id: this.currentDeleteID}).subscribe({
      next: (data) => {
        console.log('onGetData', data);
        this.onGetData();
        //
      },
      error: (err) => {
        console.error('Error fetching collections:', err);
      },
    });
    /* this.rows = this.rows.filter((row) => row.id !== this.currentDeleteID); // Remove row by id
    this.isDeleteModal = false; */
    this.isDeleteModal = false;
  }

  cancelEdit(): void {
    this.currentRow = this.resetRow();
    this.isContentVisible = false;
  }

  private resetRow(): TableRow {
    return {
      active: true,
      children:[],
      created_at: '',
      image : null,
      name: '',
      parent : null,
      private_web_address : '',
      products : [],
      _id : '',
    }
  }

  /* 
  private generateId(): number {
    return Math.max(...this.rows.map((r) => r.id), 0) + 1;
  } */
}
