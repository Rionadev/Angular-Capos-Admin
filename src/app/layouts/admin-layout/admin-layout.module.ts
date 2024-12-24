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
import { BillingComponent } from 'app/setting/billing/billing.component';
import { OutletsComponent } from 'app/setting/outlets/outlets.component';
import { ProductsComponent } from 'app/Old_product/products/products.component';
import { PricebooksComponent } from 'app/pricebooks/pricebooks.component';
import { ProducttypesComponent } from 'app/Old_product/producttypes/producttypes.component';
import { SupplliersComponent } from 'app/Old_product/supplliers/supplliers.component';
import { ProductattributesComponent } from 'app/Old_product/productattributes/productattributes.component';
import { ProducttagsComponent } from 'app/Old_product/producttags/producttags.component';
import { ToggleSwitchComponent } from 'app/component/toggle-switch/toggle-switch.component';
import { ProductEditModalComponent } from 'app/Old_product/product-edit-modal/product-edit-modal.component';
import { PreferencesComponent } from 'app/setting/preferences/preferences.component';
import { OpencloseComponent } from 'app/openclose/openclose.component';
import { CarshmanagementComponent } from 'app/carshmanagement/carshmanagement.component';
import { SalesComponent } from 'app/setting/sales/sales.component';
import { SaleslegderComponent } from 'app/saleslegder/saleslegder.component';
import { SalesreportsComponent } from 'app/reporting/salesreports/salesreports.component';
import { InventoryreportsComponent } from 'app/reporting/inventoryreports/inventoryreports.component';
import { PaymentreportsComponent } from 'app/reporting/paymentreports/paymentreports.component';
import { RegisterclosuresComponent } from 'app/reporting/registerclosures/registerclosures.component';
import { StorecreditreportsComponent } from 'app/reporting/storecreditreports/storecreditreports.component';
import { TaxesreportsComponent } from 'app/reporting/taxesreports/taxesreports.component';
import { CustomersComponent } from 'app/customer_group/customers/customers.component';
import { GroupsComponent } from 'app/customer_group/groups/groups.component';
import { ManageordersComponent } from 'app/stockcontrol/manageorders/manageorders.component';
import { ReceivestockComponent } from 'app/stockcontrol/receivestock/receivestock.component';
import { ReturnstockComponent } from 'app/stockcontrol/returnstock/returnstock.component';

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
    BillingComponent,
    OutletsComponent,
    SaleslegderComponent,

    SalesreportsComponent,
    PreferencesComponent,
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
  ]
})

export class AdminLayoutModule { }
