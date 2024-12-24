import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss']
})
export class PolicyComponent implements OnInit {

  activeTab: string = 'modules'; // Default active tab
  constructor() { }

  ngOnInit(): void {
  }

  setActive(tab: string): void {
    this.activeTab = tab;
  }
}
