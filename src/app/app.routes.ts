import { Routes } from '@angular/router';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list.component';

export const appRoutes: Routes = [
  { path: '', component: OrderFormComponent },
  { path: 'order-list', component: OrderListComponent },
];
