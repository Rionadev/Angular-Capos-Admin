import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TablesComponent } from '../../tables/tables.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { EmployeesComponent } from '../../employees/employees.component';
import { BillingComponent } from '../../setting/billing/billing.component';
import { OutletsComponent } from '../../setting/outlets/outlets.component';
import { PaymentComponent } from '../../setting/payment/payment.component';
import { CustomerComponent } from '../../setting/customer/customer.component';
import { SalesComponent } from '../../setting/sales/sales.component';
import { StationComponent } from '../../setting/station/station.component';
import { StoreComponent } from '../../setting/store/store.component';
import { PolicyComponent } from '../../setting/policy/policy.component';
import { PreferencesComponent } from '../../setting/preferences/preferences.component';
import { ProductsComponent } from 'app/products/products.component';
import { PricebooksComponent } from 'app/pricebooks/pricebooks.component';
import { ProducttypesComponent } from 'app/producttypes/producttypes.component';
import { SupplliersComponent } from 'app/supplliers/supplliers.component';
import { ProducttagsComponent } from 'app/producttags/producttags.component';
import { ProductattributesComponent } from 'app/productattributes/productattributes.component';
import { OpencloseComponent } from 'app/openclose/openclose.component';
import { CarshmanagementComponent } from 'app/carshmanagement/carshmanagement.component';
import { SaleslegderComponent } from 'app/saleslegder/saleslegder.component';
import { SalesreportsComponent } from 'app/reporting/salesreports/salesreports.component';
import { InventoryreportsComponent } from 'app/reporting/inventoryreports/inventoryreports.component';
import { PaymentreportsComponent } from 'app/reporting/paymentreports/paymentreports.component';
import { RegisterclosuresComponent } from 'app/reporting/registerclosures/registerclosures.component';
import { StorecreditreportsComponent } from 'app/reporting/storecreditreports/storecreditreports.component';
import { TaxesreportsComponent } from 'app/reporting/taxesreports/taxesreports.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent },
    { path: 'openclose', component: OpencloseComponent },
    { path: 'cashmanagement', component: CarshmanagementComponent },
    { path: 'saleslegder', component: SaleslegderComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TablesComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'employees', component: EmployeesComponent },

    { path: 'reporting/salesreport', component: SalesreportsComponent},
    { path: 'reporting/inventoryreports', component: InventoryreportsComponent},
    { path: 'reporting/paymentreports', component: PaymentreportsComponent},
    { path: 'reporting/registerclosures', component: RegisterclosuresComponent},
    { path: 'reporting/storecreditreports', component: StorecreditreportsComponent},
    { path: 'reporting/taxesreports', component: TaxesreportsComponent},
   
    { path: 'setting/billing', component: BillingComponent },
    { path: 'setting/outlets', component: OutletsComponent },
    { path: 'setting/payment', component: PaymentComponent },
    { path: 'setting/customer', component: CustomerComponent },
    { path: 'setting/sales', component: SalesComponent },
    { path: 'setting/station', component: StationComponent },
    { path: 'setting/store', component: StoreComponent },
    { path: 'setting/policy', component: PolicyComponent },
    { path: 'setting/preferences', component: PreferencesComponent },

    { path: 'products/product', component: ProductsComponent },
    { path: 'products/pricebooks', component: PricebooksComponent },
    { path: 'products/producttypes', component: ProducttypesComponent },
    { path: 'products/supplliers', component: SupplliersComponent },
    { path: 'products/producttags', component: ProducttagsComponent },
    { path: 'products/productattributes', component: ProductattributesComponent },
];
