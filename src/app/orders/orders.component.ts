import { Component, OnInit } from '@angular/core';
import { OrderService } from '../shared/order.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  orderList;

  constructor(private service: OrderService,
    private router : Router,
    private toaster : ToastrService
    ) { }

  ngOnInit() {
   this.refreshList();
  }

  refreshList(){
    this.service.getOrderList().then(res => this.orderList = res);
  }

  openForEdit(orderId : number){
this.router.navigate(['/order/edit/' + orderId])
  }

  onOrderDelete(id : number) {
    if (confirm('Are you sure you want to delete this record?')){
   this.service.deleteOrder(id).then(res => {
    this.refreshList();
    this.toaster.warning("Deleted Successfully","Restaurant App.");
   });
  }
}

}
