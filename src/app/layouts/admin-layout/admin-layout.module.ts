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
import { ProductsComponent } from 'app/products/products.component';
import { PricebooksComponent } from 'app/pricebooks/pricebooks.component';
import { ProducttypesComponent } from 'app/producttypes/producttypes.component';
import { SupplliersComponent } from 'app/supplliers/supplliers.component';
import { ProductattributesComponent } from 'app/productattributes/productattributes.component';
import { ProducttagsComponent } from 'app/producttags/producttags.component';
import { ToggleSwitchComponent } from 'app/component/toggle-switch/toggle-switch.component';
import { ProductEditModalComponent } from 'app/product-edit-modal/product-edit-modal.component';
import { PreferencesComponent } from 'app/setting/preferences/preferences.component';
import { OpencloseComponent } from 'app/openclose/openclose.component';

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
    
    PreferencesComponent,

    ToggleSwitchComponent,
    ProductEditModalComponent,

    ProductsComponent,
    PricebooksComponent,
    ProducttypesComponent,
    SupplliersComponent,
    ProducttagsComponent,
    ProductattributesComponent,
  ]
})

export class AdminLayoutModule { }
