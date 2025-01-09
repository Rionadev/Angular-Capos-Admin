import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent {
  @Input() checked = false; // Input for toggle state
  @Input() readOnly = false; // Input to enable/disable toggle
  @Output() checkedChange = new EventEmitter<boolean>(); // Output for two-way binding

  toggle(): void {
    if (!this.readOnly) { // Prevent toggling if readOnly is true
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked); // Emit the updated value
    }
  }
}

/* <!-- Editable toggle -->
<app-toggle-switch [(checked)]="row.enabled"></app-toggle-switch>

<!-- Read-only toggle -->
<app-toggle-switch [(checked)]="row.enabled" [readOnly]="true"></app-toggle-switch> */