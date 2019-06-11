import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/shared/order.service';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OrderItemsComponent } from '../order-items/order-items.component';
import { CustomerService } from './../../shared/customer.service';
import { Customer } from 'src/app/shared/customer.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styles: []
})
export class OrderComponent implements OnInit {
  customerList: Customer[];
  // tslint:disable-next-line:no-inferrable-types
  isValid: boolean = true;

  constructor(private service: OrderService,
              private dialog: MatDialog,
              private customerService: CustomerService,
              private toastr: ToastrService,
              private router: Router,
              private currentRoute : ActivatedRoute) { }
  ngOnInit() {
    let orderId = this.currentRoute.snapshot.paramMap.get('id');
    if(orderId == null)
    this.resetForm();
    else{
      this.service.getOrderById(parseInt(orderId)).then(res => {
      this.service.formData = res.order;
      this.service.orderItems = res.orderDetails
      });
    }
    this.customerService.getCustomerList().then(res => this.customerList = res as Customer[]);
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
      GTotal: 0,
      DeletedOderItemIds: ''
    };
    this.service.orderItems = [];
  }
  playWithActions(orderItemIndex, OrderId) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = '50%';
    dialogConfig.data = {orderItemIndex, OrderId};
    this.dialog.open(OrderItemsComponent, dialogConfig).afterClosed().subscribe(res => {
      this.updateGrandTotal();
    });
  }
  onDeleteOrderItem(orderItemId: number, i: number) {
    if (orderItemId != null)
    this.service.formData.DeletedOderItemIds += orderItemId + ",";
   this.service.orderItems.splice(i, 1);
   this.updateGrandTotal();
  }

  updateGrandTotal() {
    this.service.formData.GTotal = this.service.orderItems.reduce((prev, curr) => {
      return prev + curr.Total;
    }, 0);
    this.service.formData.GTotal = parseFloat(this.service.formData.GTotal.toFixed(2));
  }

  validateForm() {
 // tslint:disable-next-line:triple-equals
 if (this.service.formData.CustomerId == 0) {
   this.isValid = false;
 // tslint:disable-next-line:triple-equals
 } else if (this.service.orderItems.length == 0) {
   this.isValid = false;
 }  else {
return this.isValid;
 }
  }

  onSubmitForm(form: NgForm) {
    if (this.validateForm()) {
    this.service.saveOrUpdateOder().subscribe(res => {
      this.resetForm();
      this.toastr.success('Submitted Successfully', 'Restaurent App.');
      this.router.navigate(['/orders']);
    });
    }
  }

}
