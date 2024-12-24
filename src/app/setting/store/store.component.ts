import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  activeTab: string = 'payment'; // Default to the 'Modules' tab
  activeSubTab: string = 'header';

  constructor() { }

  ngOnInit(): void {
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  setActiveSubTab(tab: string): void {
    this.activeSubTab = tab;
  }

}
