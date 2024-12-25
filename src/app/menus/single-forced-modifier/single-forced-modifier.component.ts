import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-forced-modifier',
  templateUrl: './single-forced-modifier.component.html',
  styleUrls: ['./single-forced-modifier.component.scss']
})
export class SingleForcedModifierComponent implements OnInit {

  isProductContentVisible: boolean = false; // Initially hidden for add or editing.
  cities: string[] = ['London', 'New York', 'Paris', 'Tokyo'];
  constructor() { }

  ngOnInit(): void {
  }
  
  toggleProductContent(): void {
    this.isProductContentVisible = !this.isProductContentVisible;
  }
}
