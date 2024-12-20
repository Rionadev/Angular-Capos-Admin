import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { ProductsComponent } from './products/products.component';
// import { PricebooksComponent } from './pricebooks/pricebooks.component';
// import { ProducttypesComponent } from './producttypes/producttypes.component';
// import { SupplliersComponent } from './supplliers/supplliers.component';
// import { ProducttagsComponent } from './producttags/producttags.component';
// import { ProductattributesComponent } from './productattributes/productattributes.component';

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
    AppRoutingModule,

    // ProductsComponent,
    // PricebooksComponent,
    // ProducttypesComponent,
    // SupplliersComponent,
    // ProducttagsComponent,
    // ProductattributesComponent,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
   
    //OutletsComponent,
    //BillingComponent,
    //EmployeesComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
