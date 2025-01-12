import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild, ElementRef,   } from '@angular/core';

@Component({
  selector: 'app-editable-select',
  templateUrl: './editable-select.component.html',
  styleUrls: ['./editable-select.component.scss']
})

export class EditableSelectComponent {
  @Input() options: { name: string; value: string }[] = []; // List of options
  @Input() currentValue: string = ''; // Selected option in the current row
  @Output() newOptionAdded = new EventEmitter<{ name: string; value: string }>(); // Emits when a new option is added
  @Output() valueChanged = new EventEmitter<string>(); // Emit page changes

  @ViewChild('newOptionInput') newOptionInput!: ElementRef<HTMLInputElement>; // Access input element

  isAddingNew: boolean = false; // Controls input visibility
  newOptionName: string = ''; // Holds the new option name entered

  ngOnInit(): void {
    // Ensure "Add new item..." is included in the options array
    this.updateOptions();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options']) {
      this.updateOptions(); // Call updatePagination() whenever totalCount changes
    }
  }

  // Update total pages when countPerPage changes
  updateOptions() {
    // Ensure "Add new item..." is included in the options array
    if (!this.options.some(option => option.value === 'add_new_item')) {
      this.options.push({ name: 'Add new item...', value: 'add_new_item' });
    }
  }

  // Handle selection change
  onSelectionChange(selectedValue: string): void {
    if (selectedValue === 'add_new_item') {
      this.isAddingNew = true; // Switch to input field
      this.newOptionName = ''; // Clear input field
      setTimeout(() => {
        this.newOptionInput.nativeElement.focus();
      });
    }
    else{
      this.currentValue = selectedValue;
      this.valueChanged.emit(selectedValue);
    }
  }
  
  // Handle adding a new option
  onNewOptionEntered(event: KeyboardEvent): void {
    event.preventDefault();
    const trimmedName = this.newOptionName.trim();
    if (trimmedName && !this.options.some(option => option.name == trimmedName)) {
      const newOption = { name: trimmedName, value: trimmedName.toLowerCase().replace(/\s+/g, '_') };
      // Add new option to the list
      // this.options.splice(this.options.length - 1, 0, newOption); // Add before "Add new item"
      this.currentValue = newOption.value; // Update selected option
      this.newOptionAdded.emit(newOption); // Emit the new option
      this.isAddingNew = false; // Switch back to select component
    } else {
      this.isAddingNew = false; // Cancel adding new
      this.currentValue = '';
    }
  }

  onCancelNewOption(event: KeyboardEvent): void {
    event.preventDefault();
    this.isAddingNew = false; // Switch back to select component
    this.currentValue = ''; // Reset current option selection
  }

}

/* <app-custom-select
  [options]="optionsList"
  [currentValue]="selectedOption"
  (newOptionAdded)="handleNewOption($event)"
  (valueChanged)="selectedOption = $event"
></app-custom-select> */