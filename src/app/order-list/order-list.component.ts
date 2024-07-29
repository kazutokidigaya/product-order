import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderService } from '../order.service';
import { OrderItem } from '../order-item.model';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent implements OnInit {
  order: OrderItem[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.order = this.orderService.getOrder();
  }

  readOrder() {
    if (this.order.length === 0) {
      alert('No order to read');
      return;
    }

    const orderText = this.order
      .map((item) => `${item.product}: ${item.quantity}`)
      .join(', ');
    const apiKey = 'dd578099351a469f89b08baf31fe3bfc'; // Replace with your API key
    const url = `https://api.voicerss.org/?key=dd578099351a469f89b08baf31fe3bfc&hl=en-us&src=${encodeURIComponent(
      orderText
    )}`;

    new Audio(url).play();
  }
}
