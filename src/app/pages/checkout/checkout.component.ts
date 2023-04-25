import { Component } from '@angular/core';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cartItem!: any[];
  fare: number = 100;
  total!:number;

  constructor(public datasvc: DataService) {

  }

  ngOnInit(): void {
    this.datasvc.getUserCart().subscribe((data) => {
      console.log('getUserCart', data.data);
      this.cartItem = data.data;
      this.cartItem = this.cartItem.map((item)=>{
        return {
          "productId": item[0],
          "orderQuantity": item[1],
          "name": item[2],
          "price": item[3],
          "inventories": item[4],
          "img": item[5],
        }
      })

      this.total = this.cartItem.map((item)=>{
        return item.price * item.orderQuantity;
      }).reduce((a,b)=>a+b)
    })

  }


}
