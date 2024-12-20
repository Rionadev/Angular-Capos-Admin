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
import { BillingComponent } from '../../billing/billing.component';
import { OutletsComponent } from '../../outlets/outlets.component';
import { ProductsComponent } from 'app/products/products.component';
import { PricebooksComponent } from 'app/pricebooks/pricebooks.component';
import { ProducttypesComponent } from 'app/producttypes/producttypes.component';
import { SupplliersComponent } from 'app/supplliers/supplliers.component';
import { ProductattributesComponent } from 'app/productattributes/productattributes.component';
import { ProducttagsComponent } from 'app/producttags/producttags.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TablesComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'maps', component: MapsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'upgrade', component: UpgradeComponent },
    { path: 'employees', component: EmployeesComponent },
    { path: 'setting/billing', component: BillingComponent },
    { path: 'setting/outlets', component: OutletsComponent },

    { path: 'products/product', component: ProductsComponent },
    { path: 'products/pricebooks', component: PricebooksComponent },
    { path: 'products/producttypes', component: ProducttypesComponent },
    { path: 'products/supplliers', component: SupplliersComponent },
    { path: 'products/producttags', component: ProducttagsComponent },
    { path: 'products/productattributes', component: ProductattributesComponent },



];
