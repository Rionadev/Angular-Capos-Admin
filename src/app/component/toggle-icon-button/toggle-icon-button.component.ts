import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-icon-button',
  templateUrl: './toggle-icon-button.component.html',
  styleUrls: ['./toggle-icon-button.component.scss']
})

export class ToggleIconButtonComponent{

  @Input() checked = false; // Input for toggle state
  @Input() title = '';
  @Output() checkedChange = new EventEmitter<boolean>(); // Output for two-way binding

  toggle(): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked); // Emit the updated value
  }

}
