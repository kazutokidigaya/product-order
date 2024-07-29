import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { OrderItem } from '../order-item.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit, OnDestroy {
  products: string[];
  newProduct: string = '';
  orderRows: OrderItem[] = [{ product: '', quantity: null }];
  customProducts: string[] = [];
  routerSubscription: Subscription;

  constructor(private orderService: OrderService, private router: Router) {
    this.products = this.orderService.getProducts();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/') {
        this.resetForm();
      }
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  addRow(index: number) {
    if (
      this.orderRows.length < 8 &&
      this.orderRows[index].product &&
      this.orderRows[index].quantity !== null
    ) {
      this.orderService.addProduct(
        this.orderRows[index].product,
        this.orderRows[index].quantity as number
      );
      this.orderRows.push({ product: '', quantity: null });
    }
  }

  showOrder() {
    this.router.navigate(['/order-list']);
  }

  canAddRow(index: number): boolean {
    return (
      this.orderRows[index].product !== '' &&
      this.orderRows[index].quantity !== null
    );
  }

  getAvailableProducts(index: number): string[] {
    const selectedProducts = this.orderRows.map((row) => row.product);
    const availableProducts = this.products
      .concat(this.customProducts)
      .filter(
        (product) =>
          product === this.orderRows[index].product ||
          !selectedProducts.includes(product)
      );
    return availableProducts;
  }

  addCustomProduct() {
    if (
      this.newProduct &&
      !this.products.includes(this.newProduct) &&
      !this.customProducts.includes(this.newProduct)
    ) {
      this.customProducts.push(this.newProduct);
      this.newProduct = '';
    }
  }

  deleteCustomProduct(product: string) {
    const index = this.customProducts.indexOf(product);
    if (index !== -1) {
      this.customProducts.splice(index, 1);
    }
  }

  private resetForm() {
    this.orderRows = [{ product: '', quantity: null }];
    this.orderService.clearOrder();
  }
}
