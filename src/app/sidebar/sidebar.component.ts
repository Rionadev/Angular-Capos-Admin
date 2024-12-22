import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: '' },
  { path: '/openclose', title: 'Open / Close', icon: 'pe-7s-map', class: '' },
  { path: '/cashmanagement', title: 'Cash Management', icon: 'pe-7s-cash', class: '' },
  { path: '/saleslegder', title: 'Sales Legder', icon: 'pe-7s-shopbag', class: '' },
  
  { path: '/user', title: 'User Profile', icon: 'pe-7s-user', class: '' },
  { path: '/table', title: 'Table List', icon: 'pe-7s-note2', class: '' },
  { path: '/typography', title: 'Typography', icon: 'pe-7s-news-paper', class: '' },
  { path: '/icons', title: 'Icons', icon: 'pe-7s-science', class: '' },
  { path: '/maps', title: 'Maps', icon: 'pe-7s-map-marker', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'pe-7s-bell', class: '' },
  { path: '/employees', title: 'Employees', icon: 'pe-7s-users', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'pe-7s-rocket', class: '' }, //active-pro
  { path: '/setting', title: 'Setting', icon: 'pe-7s-config', class: '' },
];

export const SETTINGROUTES: RouteInfo[] = [
  { path: '/setting/billing', title: 'Billing & Subscriptions', icon: 'pe-7s-credit', class: '' },
  { path: '/setting/outlets', title: 'Outlets & Register', icon: 'pe-7s-albums', class: '' },
  { path: '/setting/payment', title: 'Payment Types', icon: 'pe-7s-calculator', class: '' },
  { path: '/setting/customer', title: 'Customer Point & Gift', icon: 'pe-7s-note2', class: '' },
  { path: '/setting/sales', title: 'Sales Taxes', icon: 'pe-7s-wallet', class: '' },
  { path: '/setting/station', title: 'Station', icon: 'pe-7s-shuffle', class: '' },
  { path: '/setting/storemanagement', title: 'Store Management', icon: 'pe-7s-shopbag', class: '' },
  { path: '/setting/storepolicy', title: 'Store Policy', icon: 'pe-7s-paperclip', class: '' },
  { path: '/setting/preferences', title: 'Preferences', icon: 'pe-7s-tools', class: '' },
];

export const ECOMMERCEROUTES: RouteInfo[] = [
  { path: '/ecommerce/dashboard', title: 'Ecommerce Dashboard', icon: 'pe-7s-credit', class: '' },
  { path: '/ecommerce/collections', title: 'Collections', icon: 'pe-7s-albums', class: '' },
  { path: '/ecommerce/products', title: 'Products', icon: 'pe-7s-calculator', class: '' },
  { path: '/ecommerce/orders', title: 'Orders', icon: 'pe-7s-note2', class: '' },
  { path: '/ecommerce/settings', title: 'Settings', icon: 'pe-7s-wallet', class: '' },
  { path: '/ecommerce/pages', title: 'Pages', icon: 'pe-7s-shuffle', class: '' },
  { path: '/ecommerce/visit', title: 'Visit Online Store', icon: 'pe-7s-shopbag', class: '' },
];

export const PRODUCTSROUTES: RouteInfo[] = [
  { path: '/products/product', title: 'Products', icon: 'pe-7s-cart', class: '' },
  { path: '/products/pricebooks', title: 'Price Books', icon: 'pe-7s-notebook', class: '' },
  { path: '/products/producttypes', title: 'Product Types', icon: 'pe-7s-keypad', class: '' },
  { path: '/products/supplliers', title: 'Suppliers', icon: 'pe-7s-albums', class: '' },
  { path: '/products/producttags', title: 'Product Tags', icon: 'pe-7s-ticket', class: '' },
  { path: '/products/productattributes', title: 'Product Attributes', icon: 'pe-7s-way', class: '' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
  settingMenuItems: any[];
  productsgMenuItems: any[];
  isSettingContentVisible: boolean = false; // Initially hidden for add or editing.
  isProductsContentVisible: boolean = false; // Initially hidden for add or editing.
  ecommerceMenuItems: any[];
  isEcommerceContentVisible: boolean = false; // Initially hidden for add or editing.
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.settingMenuItems = SETTINGROUTES.filter(menuItem => menuItem);
    this.productsgMenuItems = PRODUCTSROUTES.filter(menuItem => menuItem);
    this.ecommerceMenuItems = ECOMMERCEROUTES.filter(menuItem => menuItem);
  }

  settingContent(): void {
    this.isSettingContentVisible = !this.isSettingContentVisible; // Toggle the visibility
  }
  productsContent(): void {
    this.isProductsContentVisible = !this.isProductsContentVisible; // Toggle the visibility
  }
  ecommerceContent(): void {
    this.isEcommerceContentVisible = !this.isEcommerceContentVisible; // Toggle the visibility
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
