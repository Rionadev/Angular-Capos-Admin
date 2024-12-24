import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  activeTab: string = 'blog'; // Default active tab
  isAddBlogContentVisible: boolean = false; // Initially hidden for add or editing.
  isAddFAQContentVisible: boolean = false; // Initially hidden for add or editing.
  isAddMemberContentVisible: boolean = false; // Initially hidden for add or editing.
  constructor() { }

  ngOnInit(): void {
  }

  setActive(tab: string): void {
    this.activeTab = tab;
  }

  toggleAddBlogContent(): void {
    this.isAddBlogContentVisible = !this.isAddBlogContentVisible; // Toggle the visibility
  }

  toggleAddFAQContent(): void {
    this.isAddFAQContentVisible = !this.isAddFAQContentVisible; // Toggle the visibility
  }

  toggleAddMemberContent(): void {
    this.isAddMemberContentVisible = !this.isAddMemberContentVisible; // Toggle the visibility
  }
}
