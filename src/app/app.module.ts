import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
//import { PreferencesComponent } from './preferences/preferences.component';
//import { PolicyComponent } from './policy/policy.component';
//import { StoreComponent } from './store/store.component';
//import { StationComponent } from './station/station.component';
//import { SalesComponent } from './sales/sales.component';
//import { CustomerComponent } from './customer/customer.component';
//import { PaymentComponent } from './payment/payment.component';
//import { OutletsComponent } from './outlets/outlets.component';
//import { BillingComponent } from './billing/billing.component';
//import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    //PreferencesComponent,
    //PolicyComponent,
    //StoreComponent,
    //StationComponent,
    //SalesComponent,
    //CustomerComponent,
    //OutletsComponent,
    //BillingComponent,
    //EmployeesComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
