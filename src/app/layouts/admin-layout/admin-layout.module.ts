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
import { BillingComponent } from '../../billing/billing.component';
import { OutletsComponent } from '../../outlets/outlets.component';
import { ToggleSwitchComponent } from '../../component/toggle-switch/toggle-switch.component';
import { PaymentComponent } from '../../payment/payment.component';
import { CustomerComponent } from '../../customer/customer.component';
import { SalesComponent } from '../../sales/sales.component';
import { StationComponent } from '../../station/station.component';
import { StoreComponent } from '../../store/store.component';

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
    ToggleSwitchComponent,
    PaymentComponent,
    CustomerComponent,
    SalesComponent,
    StationComponent,
    StoreComponent,
  ]
})

export class AdminLayoutModule { }
