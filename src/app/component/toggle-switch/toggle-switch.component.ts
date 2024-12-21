import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent {
  @Input() checked = false; // Input for toggle state
  @Output() checkedChange = new EventEmitter<boolean>(); // Output for two-way binding

  toggle(): void {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked); // Emit the updated value
  }
}

