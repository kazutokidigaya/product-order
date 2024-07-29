import { Injectable } from '@angular/core';
import { OrderItem } from './order-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private products = ['Pencil', 'Eraser', 'Pens'];
  private order: OrderItem[] = [];

  getProducts() {
    return this.products;
  }

  addProduct(product: string, quantity: number) {
    this.order.push({ product, quantity });
  }

  getOrder(): OrderItem[] {
    return this.order;
  }

  clearOrder() {
    this.order = [];
  }
}
