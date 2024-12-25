import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule } from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EmployeesComponent } from '../../employees/employees.component';
import { PricebooksComponent } from 'app/pricebooks/pricebooks.component';
import { ProductsComponent } from 'app/Old_product/products/products.component';
import { ProductEditModalComponent } from 'app/Old_product/product-edit-modal/product-edit-modal.component';
import { ProducttypesComponent } from 'app/Old_product/producttypes/producttypes.component';
import { SupplliersComponent } from 'app/Old_product/supplliers/supplliers.component';
import { ProductattributesComponent } from 'app/Old_product/productattributes/productattributes.component';
import { ProducttagsComponent } from 'app/Old_product/producttags/producttags.component';
import { ToggleSwitchComponent } from 'app/component/toggle-switch/toggle-switch.component';

import { OpencloseComponent } from 'app/openclose/openclose.component';
import { CarshmanagementComponent } from 'app/carshmanagement/carshmanagement.component';
import { SaleslegderComponent } from 'app/saleslegder/saleslegder.component';
import { SalesreportsComponent } from 'app/reporting/salesreports/salesreports.component';
import { InventoryreportsComponent } from 'app/reporting/inventoryreports/inventoryreports.component';
import { PaymentreportsComponent } from 'app/reporting/paymentreports/paymentreports.component';
import { RegisterclosuresComponent } from 'app/reporting/registerclosures/registerclosures.component';
import { StorecreditreportsComponent } from 'app/reporting/storecreditreports/storecreditreports.component';
import { TaxesreportsComponent } from 'app/reporting/taxesreports/taxesreports.component';

// Setting
import { BillingComponent } from '../../setting/billing/billing.component';
import { OutletsComponent } from '../../setting/outlets/outlets.component';
import { PaymentComponent } from '../../setting/payment/payment.component';
import { CustomerComponent } from '../../setting/customer/customer.component';
import { SalesComponent } from '../../setting/sales/sales.component';
import { StationComponent } from '../../setting/station/station.component';
import { StoreComponent } from '../../setting/store/store.component';
import { PolicyComponent } from '../../setting/policy/policy.component';
import { PreferencesComponent } from '../../setting/preferences/preferences.component';

// Ecommerce
import { DashboardComponent } from '../../ecommerce/dashboard/dashboard.component';
import { CollectionsComponent } from '../../ecommerce/collections/collections.component';
import { EcommerceProductsComponent } from '../../ecommerce/products/products.component';
import { OrdersComponent } from '../../ecommerce/orders/orders.component';
import { SettingsComponent } from '../../ecommerce/settings/settings.component';
import { PagesComponent } from '../../ecommerce/pages/pages.component';

import { CustomersComponent } from 'app/customer_group/customers/customers.component';
import { GroupsComponent } from 'app/customer_group/groups/groups.component';
import { ManageordersComponent } from 'app/stockcontrol/manageorders/manageorders.component';
import { ReceivestockComponent } from 'app/stockcontrol/receivestock/receivestock.component';
import { ReturnstockComponent } from 'app/stockcontrol/returnstock/returnstock.component';

import { MenusLayoutComponent } from '../../menus/menus-layout/menus-layout.component';
import { ForcedModifiersComponent } from '../../menus/forced-modifiers/forced-modifiers.component';
import { MixComponent } from '../../menus/mix/mix.component';
import { PriceBooksComponent } from '../../menus/price-books/price-books.component';
import { CategoriesComponent } from '../../menus/categories/categories.component';
import { AttributesComponent } from '../../menus/attributes/attributes.component';
import { PriorityComponent } from '../../menus/priority/priority.component';
import { ForcedModifierGroupComponent } from '../../menus/forced-modifier-group/forced-modifier-group.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyC-NyZbxHv2o8wQMF5lzNqH7pevCakZbuo' })
  ],
  declarations: [
    HomeComponent,
    OpencloseComponent,
    UserComponent,
    TablesComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    EmployeesComponent,
    SaleslegderComponent,
    
    BillingComponent,
    OutletsComponent,
    PreferencesComponent,
    PaymentComponent,
    CustomerComponent,
    SalesComponent,
    StationComponent,
    StoreComponent,
    PolicyComponent,

    SalesreportsComponent,
    CarshmanagementComponent,
    InventoryreportsComponent,
    PaymentreportsComponent,
    RegisterclosuresComponent,
    StorecreditreportsComponent,
    TaxesreportsComponent,

    CustomersComponent,
    ToggleSwitchComponent,
    ProductEditModalComponent,

    GroupsComponent,

    ManageordersComponent,
    ReceivestockComponent,
    ReturnstockComponent,

    ProductsComponent,
    PricebooksComponent,
    ProducttypesComponent,
    SupplliersComponent,
    ProducttagsComponent,
    ProductattributesComponent,
    
    // Ecommerce
    DashboardComponent,
    CollectionsComponent,
    EcommerceProductsComponent,
    OrdersComponent,
    SettingsComponent,
    PagesComponent,

    //Menus
    MenusLayoutComponent,
    ForcedModifiersComponent,
    MixComponent,
    PriceBooksComponent,
    CategoriesComponent,
    AttributesComponent,
    PriorityComponent,
    ForcedModifierGroupComponent,
  ]
})

export class AdminLayoutModule { }
