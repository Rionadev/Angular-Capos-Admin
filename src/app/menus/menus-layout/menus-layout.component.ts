import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menus-layout',
  templateUrl: './menus-layout.component.html',
  styleUrls: ['./menus-layout.component.scss']
})
export class MenusLayoutComponent implements OnInit {
  isProductContentVisible: boolean = false; // Initially hidden for add or editing.
  cities: string[] = ['London', 'New York', 'Paris', 'Tokyo'];
  constructor() { }

  ngOnInit(): void {
  }
  
  toggleProductContent(): void {
    this.isProductContentVisible = !this.isProductContentVisible;
  }
}
