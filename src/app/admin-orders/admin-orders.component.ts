import { Component, OnInit } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

    orders
  constructor(private _OrderService:OrderService) {
    this._OrderService.getAllOrders().subscribe((res:[])=>{
      this.orders = [...res];
      console.log(this.orders)
    })
  }

  ngOnInit(): void {

  }

  changeState(id , status){

    console.log(this.orders,id)
    this.orders.map((order)=>{
      if(order._id == id){
        order.status =status
      }})
    // this.orders[id].status=status
    this._OrderService.changeOrderStatus(id,status).subscribe((res)=>{
      console.log(res)
    })
  }
}
