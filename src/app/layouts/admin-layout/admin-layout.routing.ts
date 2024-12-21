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
import { PaymentComponent } from '../../payment/payment.component';
import { CustomerComponent } from '../../customer/customer.component';
import { SalesComponent } from '../../sales/sales.component';
import { StationComponent } from '../../station/station.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TablesComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'employees',      component: EmployeesComponent },
    { path: 'setting/billing',     component: BillingComponent },
    { path: 'setting/outlets',     component: OutletsComponent },
    { path: 'setting/payment',     component: PaymentComponent },
    { path: 'setting/customer',    component: CustomerComponent },
    { path: 'setting/sales',       component: SalesComponent },
    { path: 'setting/station',     component: StationComponent },
];
