import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-product-edit-modal',
    templateUrl: './product-edit-modal.component.html',
    styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent {
    @Input() currentRow: any;
    @Output() save = new EventEmitter<any>();
    @Output() close = new EventEmitter<void>();

    saveRow() {
        this.save.emit(this.currentRow);
        this.closeModal();
    }

    closeModal() {
        this.close.emit();
        this.currentRow = {}; // Reset currentRow
    }
}
