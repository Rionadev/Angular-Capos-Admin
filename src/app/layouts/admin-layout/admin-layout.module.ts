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
import { ProductsComponent } from 'app/products/products.component';
import { PricebooksComponent } from 'app/pricebooks/pricebooks.component';
import { ProducttypesComponent } from 'app/producttypes/producttypes.component';
import { SupplliersComponent } from 'app/supplliers/supplliers.component';
import { ProductattributesComponent } from 'app/productattributes/productattributes.component';
import { ProducttagsComponent } from 'app/producttags/producttags.component';
import { ToggleSwitchComponent } from 'app/component/toggle-switch/toggle-switch.component';
import { ProductEditModalComponent } from 'app/product-edit-modal/product-edit-modal.component';
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

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    LbdModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE' })
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

    ToggleSwitchComponent,
    ProductEditModalComponent,

    ProductsComponent,
    PricebooksComponent,
    ProducttypesComponent,
    SupplliersComponent,
    ProducttagsComponent,
    ProductattributesComponent,
    
    // Ecommerce
    DashboardComponent,
    CollectionsComponent,
  ]
})

export class AdminLayoutModule { }
