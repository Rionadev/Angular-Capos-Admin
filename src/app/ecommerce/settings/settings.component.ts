import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  activeTab: string = 'modules'; // Default to the 'Modules' tab
  isAddSliderContentVisible: boolean = false; // Initially hidden for add or editing.

  constructor() { }

  ngOnInit(): void {
  }
  
  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleAddSliderContent(): void {
    this.isAddSliderContentVisible = !this.isAddSliderContentVisible; // Toggle the visibility
  }
}
