import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {

  @Input() title!: string; 
  @Input() description!: string; 
  @Input() confirmButtonCaption!: string;
  @Input() cancelButtonCaption!: string;
  // The name or details of the item to be removed
  /* (Definite Assignment Assertion):
  The exclamation mark ! is a TypeScript feature called the Definite Assignment Assertion.
  It tells TypeScript, "Trust me, this property will be assigned a value before it's used," even though there's no immediate initialization.
  Without the !, TypeScript would complain because it doesn't see an initial value being assigned to itemName. */

  @Output() confirmed  = new EventEmitter<void>();
  @Output() cancelled  = new EventEmitter<void>();

  onConfirm() {
    this.confirmed.emit();
  }

  onCancel() {
    this.cancelled.emit();
  }

}

// Usage
/*
<app-confirm-modal *ngIf="isDeleteModal" 
    [title]="'Remove User Role'"
    [description]="'Do you really want to remove this User Role ?'"
    [confirmButtonCaption]="'Delete'"
    [cancelButtonCaption]="'Cancel'"
    (confirmed)="deleteRow()" 
    (cancelled)="deleteRow()">
</app-confirm-modal>
*/