import { Component, OnInit } from '@angular/core';
import { ToggleSwitchComponent } from 'app/component/toggle-switch/toggle-switch.component';


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
export class PreferencesComponent implements OnInit {

  isToggled: boolean = false; // Default state of the toggle
  
  constructor() { }

  ngOnInit(): void {
  }

}
