import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Home',  icon: 'pe-7s-graph', class: '' },
    { path: '/user', title: 'User Profile',  icon:'pe-7s-user', class: '' },
    { path: '/table', title: 'Table List',  icon:'pe-7s-note2', class: '' },
    { path: '/typography', title: 'Typography',  icon:'pe-7s-news-paper', class: '' },
    { path: '/icons', title: 'Icons',  icon:'pe-7s-science', class: '' },
    { path: '/maps', title: 'Maps',  icon:'pe-7s-map-marker', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'pe-7s-bell', class: '' },
    { path: '/employees', title: 'Employees',  icon:'pe-7s-users', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO',  icon:'pe-7s-rocket', class: '' }, //active-pro
    //{ path: '/setting', title: 'Setting',  icon:'pe-7s-config', class: '' },
];

export const SETTINGROUTES: RouteInfo[] = [
  { path: '/setting/billing', title: 'Billing & Subscriptions',  icon: 'pe-7s-credit', class: '' },
  { path: '/setting/outlets', title: 'Outlets & Register',  icon:'pe-7s-albums', class: '' },
  { path: '/setting/payment', title: 'Payment Types',  icon:'pe-7s-calculator', class: '' },
  { path: '/setting/customer', title: 'Customer Point & Gift',  icon:'pe-7s-note2', class: '' },
  { path: '/setting/sales', title: 'Sales Taxes',  icon:'pe-7s-wallet', class: '' },
  { path: '/setting/station', title: 'Station Management',  icon:'pe-7s-shuffle', class: '' },
  { path: '/setting/store', title: 'Store Management',  icon:'pe-7s-shopbag', class: '' },
  { path: '/setting/policy', title: 'Store Policy',  icon:'pe-7s-paperclip', class: '' },
  { path: '/setting/preferences', title: 'Preferences',  icon:'pe-7s-tools', class: '' },
];

export const ECOMMERCEROUTES: RouteInfo[] = [
  { path: '/ecommerce/dashboard', title: 'Ecommerce Dashboard',  icon: 'pe-7s-credit', class: '' },
  { path: '/ecommerce/collections', title: 'Collections',  icon:'pe-7s-albums', class: '' },
  { path: '/ecommerce/products', title: 'Products',  icon:'pe-7s-calculator', class: '' },
  { path: '/ecommerce/orders', title: 'Orders',  icon:'pe-7s-note2', class: '' },
  { path: '/ecommerce/settings', title: 'Settings',  icon:'pe-7s-wallet', class: '' },
  { path: '/ecommerce/pages', title: 'Pages',  icon:'pe-7s-shuffle', class: '' },
  { path: '/ecommerce/visit', title: 'Visit Online Store',  icon:'pe-7s-shopbag', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  settingMenuItems: any[];
  isSettingContentVisible: boolean = false; // Initially hidden for add or editing.

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.settingMenuItems = SETTINGROUTES.filter(menuItem => menuItem);
  }

  settingContent(): void {
    this.isSettingContentVisible = !this.isSettingContentVisible; // Toggle the visibility
  }

  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
