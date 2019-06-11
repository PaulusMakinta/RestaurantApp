import { Injectable } from '@angular/core';
import { Order } from './order.model';
import { OrderItem } from './order-item.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  formData: Order;
  orderItems: OrderItem[];
  //Http: any;
  constructor(private http: HttpClient) { }
  saveOrUpdateOder() {
    const body = {
      ...this.formData,
      OrderItems: this.orderItems
    }
    return this.http.post(environment.apiUrl + '/Order', body);
  }

  getOrderList() {
    return this.http.get(environment.apiUrl + '/Order').toPromise();
    }

    getOrderById(id : number) : any {
      return this.http.get(environment.apiUrl + '/Order/' + id).toPromise();
      }
      deleteOrder(id : number) {
        return this.http.delete(environment.apiUrl + '/Order/' + id).toPromise();
        }
}
