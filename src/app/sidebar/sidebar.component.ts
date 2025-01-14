import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard/dashboard', title: 'Dashboard', icon: 'pe-7s-graph', class: '' },
  { path: '/dashboard/openclose', title: 'Open / Close', icon: 'pe-7s-map', class: '' },
  { path: '/dashboard/cashmanagement', title: 'Cash Management', icon: 'pe-7s-cash', class: '' },
  { path: '/dashboard/saleslegder', title: 'Sales Ledger', icon: 'pe-7s-shopbag', class: '' },
  { path: '/dashboard/salestransaction', title: 'Sales Transaction', icon: 'pe-7s-news-paper', class: '' },

  { path: '/dashboard/user', title: 'User Profile', icon: 'pe-7s-user', class: '' },
  { path: '/dashboard/table', title: 'Table List', icon: 'pe-7s-note2', class: '' },
  { path: '/dashboard/typography', title: 'Typography', icon: 'pe-7s-news-paper', class: '' },
  { path: '/dashboard/icons', title: 'Icons', icon: 'pe-7s-science', class: '' },
  // { path: '/maps', title: 'Maps', icon: 'pe-7s-map-marker', class: '' },
  { path: '/dashboard/notifications', title: 'Notifications', icon: 'pe-7s-bell', class: '' },
  // { path: '/employees', title: 'Employees', icon: 'pe-7s-users', class: '' },
  /* { path: '/user', title: 'User Profile', icon: 'pe-7s-user', class: '' },
  { path: '/table', title: 'Table List', icon: 'pe-7s-note2', class: '' },
  { path: '/typography', title: 'Typography', icon: 'pe-7s-news-paper', class: '' },
  { path: '/icons', title: 'Icons', icon: 'pe-7s-science', class: '' },
  { path: '/maps', title: 'Maps', icon: 'pe-7s-map-marker', class: '' },
  { path: '/notifications', title: 'Notifications', icon: 'pe-7s-bell', class: '' }, */
  //{ path: '/employees', title: 'Employees', icon: 'pe-7s-users', class: '' },
  // { path: '/upgrade', title: 'Upgrade to PRO', icon: 'pe-7s-rocket', class: '' }, //active-pro
  /* { path: '/setting', title: 'Setting', icon: 'pe-7s-config', class: '' }, */
];

export const EMPLOYEESROUTES: RouteInfo[] = [
  { path: '/dashboard/employees/employees', title: 'User/Employee', icon: 'pe-7s-credit', class: '' },
  { path: '/dashboard/employees/roles', title: 'User Roles', icon: 'pe-7s-albums', class: '' },
];

export const SETTINGROUTES: RouteInfo[] = [
  { path: '/dashboard/setting/billing', title: 'Billing & Subscriptions', icon: 'pe-7s-credit', class: '' },
  /* { path: '/setting/outlets', title: 'Outlets & Register', icon: 'pe-7s-albums', class: '' }, */
  /* { path: '/setting/payment', title: 'Payment Types', icon: 'pe-7s-calculator', class: '' }, */
  { path: '/dashboard/setting/customer', title: 'Customer Point & Gift', icon: 'pe-7s-note2', class: '' },
  { path: '/dashboard/setting/sales', title: 'Sales Taxes', icon: 'pe-7s-wallet', class: '' },
  /* { path: '/setting/station', title: 'Station', icon: 'pe-7s-shuffle', class: '' }, */
  /* { path: '/setting/store', title: 'Store Management', icon: 'pe-7s-shopbag', class: '' }, */
  { path: '/dashboard/setting/policy', title: 'Store Policy', icon: 'pe-7s-paperclip', class: '' },
  /* { path: '/setting/preferences', title: 'Preferences', icon: 'pe-7s-tools', class: '' }, */
];

export const REPOTINGROUTES: RouteInfo[] = [
  { path: '/dashboard/reporting/salesreport', title: 'Sales Reports', icon: '', class: '' },
  { path: '/dashboard/reporting/inventoryreports', title: 'Inventory Reports', icon: '', class: '' },
  { path: '/dashboard/reporting/paymentreports', title: 'Payment Reports', icon: '', class: '' },
  { path: '/dashboard/reporting/registerclosures', title: 'Register Cloures', icon: '', class: '' },
  { path: '/dashboard/reporting/storecreditreports', title: 'Store Credit Reports', icon: '', class: '' },
  { path: '/dashboard/reporting/taxesreports', title: 'Taxes Reports', icon: '', class: '' },
];

export const ECOMMERCEROUTES: RouteInfo[] = [
  { path: '/dashboard/ecommerce/dashboard', title: 'Dashboard', icon: 'pe-7s-credit', class: '' },
  { path: '/dashboard/ecommerce/collections', title: 'Collections', icon: 'pe-7s-albums', class: '' },
  { path: '/dashboard/ecommerce/products', title: 'Products', icon: 'pe-7s-calculator', class: '' },
  { path: '/dashboard/ecommerce/orders', title: 'Orders', icon: 'pe-7s-note2', class: '' },
  { path: '/dashboard/ecommerce/settings', title: 'Ecommerce Settings', icon: 'pe-7s-wallet', class: '' },
  { path: '/dashboard/ecommerce/pages', title: 'Ecommerce Pages', icon: 'pe-7s-shuffle', class: '' },
  { path: '/dashboard/', title: 'Visit Online Store', icon: 'pe-7s-shopbag', class: '' },
];
export const CUSTOMERROUTES: RouteInfo[] = [
  { path: '/dashboard/customers/customers', title: 'Customers', icon: '', class: '' },
  { path: '/dashboard/customers/groups', title: 'Groups', icon: '', class: '' },
];
export const STOCKCONTROLROUTES: RouteInfo[] = [
  { path: '/dashboard/stockcontrol/manageorders', title: 'Manage Orders', icon: '', class: '' },
  { path: '/dashboard/stockcontrol/receivestock', title: 'Recievie Stock', icon: '', class: '' },
  { path: '/dashboard/stockcontrol/returnstock', title: 'Return Stock', icon: '', class: '' },
];

// export const PRODUCTSROUTES: RouteInfo[] = [
//   // { path: '/products/product', title: 'Products', icon: 'pe-7s-cart', class: '' },
//   { path: '/dashboard/products/pricebooks', title: 'Price Books', icon: 'pe-7s-notebook', class: '' },
//   { path: '/dashboard/products/producttypes', title: 'Product Types', icon: 'pe-7s-keypad', class: '' },
//   { path: '/dashboard/products/supplliers', title: 'Suppliers', icon: 'pe-7s-albums', class: '' },
//   { path: '/dashboard/products/producttags', title: 'Product Tags', icon: 'pe-7s-ticket', class: '' },
//   { path: '/dashboard/products/productattributes', title: 'Product Attributes', icon: 'pe-7s-way', class: '' },
// ];

export const MENUSROUTES: RouteInfo[] = [
  { path: '/dashboard/menus/layout', title: 'Menus Layout', icon: 'pe-7s-cart', class: '' },
  /*  { path: '/menus/menusmodifiers', title: 'Menus with Forced Modifiers', icon: 'pe-7s-notebook', class: '' }, */
  { path: '/dashboard/menus/mix', title: 'Mix & Match', icon: 'pe-7s-keypad', class: '' },
  { path: '/dashboard/menus/price', title: 'Price Books', icon: 'pe-7s-albums', class: '' },
  { path: '/dashboard/menus/categories', title: 'Menu Categories', icon: 'pe-7s-ticket', class: '' },
  /*  { path: '/menus/attributes', title: 'Menu Attributes', icon: 'pe-7s-way', class: '' },
  { path: '/menus/priority', title: 'Menu Priority', icon: 'pe-7s-cart', class: '' },
  { path: '/menus/forcedmodifier', title: 'Forced Modifier', icon: 'pe-7s-notebook', class: '' },
  { path: '/menus/forcedmodifiergroup', title: 'Forced Modifier Group', icon: 'pe-7s-ticket', class: '' },
  { path: '/menus/modifier', title: 'Modifier', icon: 'pe-7s-keypad', class: '' },
  { path: '/menus/modifiertypes', title: 'Modifier Types', icon: 'pe-7s-albums', class: '' }, */
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
  reportingContentItems: any[];
  isReportingContentVisible: boolean = false;
  stockContentItems: any[];
  isStockContentVisible: boolean = false;
  customerContentItems: any[];
  isCustomerContentVisible: boolean = false;
  menusContentItems: any[];
  isMenusContentVisible: boolean = false;
  employeesContentItems: any[];
  isEmployeesContentVisible: boolean = false;
  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.settingMenuItems = SETTINGROUTES.filter(menuItem => menuItem);
    // this.productsgMenuItems = PRODUCTSROUTES.filter(menuItem => menuItem);
    this.ecommerceMenuItems = ECOMMERCEROUTES.filter(menuItem => menuItem);
    this.reportingContentItems = REPOTINGROUTES.filter(menuItems => menuItems);
    this.stockContentItems = STOCKCONTROLROUTES.filter(menuItems => menuItems);
    this.customerContentItems = CUSTOMERROUTES.filter(menuItems => menuItems);
    this.menusContentItems = MENUSROUTES.filter(menuItems => menuItems);
    this.employeesContentItems = EMPLOYEESROUTES.filter(menuItems => menuItems);
  }
  stockContent(): void {
    this.isStockContentVisible = !this.isStockContentVisible; // Toggle the visibility
  }
  customerContent(): void {
    this.isCustomerContentVisible = !this.isCustomerContentVisible; // Toggle the visibility
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
  reportingContent(): void {
    this.isReportingContentVisible = !this.isReportingContentVisible; // Toggle the visibility
  }
  menusContent(): void {
    this.isMenusContentVisible = !this.isMenusContentVisible; // Toggle the visibility
  }
  employeesContent(): void {
    this.isEmployeesContentVisible = !this.isEmployeesContentVisible; // Toggle the visibility
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  sidebarClose() {
    const body = document.getElementsByTagName('body')[0];
    const toggleButton = body.getElementsByClassName('navbar-toggle')[0];
    toggleButton.classList.remove('toggled');
    /* const navbar: HTMLElement = this.element.nativeElement;
    navbar.getElementsByClassName('navbar-toggle')[0].classList.remove('toggled'); */
    body.classList.remove('nav-open');
  };
}
