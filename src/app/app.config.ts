import { provideRouter } from '@angular/router';
import { ApplicationConfig } from '@angular/core';
import { OrderFormComponent } from './order-form/order-form.component';
import { OrderListComponent } from './order-list/order-list.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: '', component: OrderFormComponent },
      { path: 'order-list', component: OrderListComponent },
    ]),
  ],
};
