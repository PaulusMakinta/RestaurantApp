import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { NgForm } from '@angular/forms';
import { Order } from './../shared/order.model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from './order-items/order-items.component';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  constructor(private service: OrderService,
              private dialog: MatDialog) { }
  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    // tslint:disable-next-line:no-conditional-assignment
    if (form = null) {
        form.resetForm();
    }
    this.service.formData = {
      OrderId: null,
      OrderNo: Math.floor(100000 + Math.random() * 900000).toString(),
      CustomerId: 0,
      PMethod: '',
      GTotal: 0
    };
    this.service.orderItems = [];
  }

  playWithActions(orderItemIndex, OrderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {orderItemIndex, OrderId};
    this.dialog.open(OrderItemsComponent, dialogConfig);
  }
}
