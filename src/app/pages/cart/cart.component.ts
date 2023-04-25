import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  //icon
  faTrash = faTrash ;
  cartItem!:any[];
  counter!: number;
  fare: number = 100;
  total!:number;

  constructor(public datasvc: DataService){

  }


  ngOnInit(): void {
    this.datasvc.getUserCart().subscribe((data)=>{
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
      // this.cartItem = newItem;
      // console.log('newItem',newItem);
      // console.log('newItem_price',newItem.map((item)=>{
      //   return item.price * item.orderQuantity;
      // }));
      this.total = this.cartItem.map((item)=>{
        return item.price * item.orderQuantity;
      }).reduce((a,b)=>a+b)
      // console.log('itemPrice',this.total)

    })
  }

  add(e: any){
    //數量
    this.counter = parseInt(e.target.value);
    this.counter++;

    //產品ID
    let productId = e.target.id.split("-");
    console.log(productId[1]);

    this.datasvc.updateUserCart(productId[1],this.counter).subscribe((re)=>{
      console.log('re',re)
    })
    setTimeout(() => {
      this.datasvc.getUserCart().subscribe((data)=>{
        console.log('重新加載數量');
        this.cartItem = data.data.map((item: any[])=>{
          return {
            "productId": item[0],
            "orderQuantity": item[1],
            "name": item[2],
            "price": item[3],
            "inventories": item[4],
            "img": item[5],
          }
        });
        this.total = this.cartItem.map((item)=>{
          return item.price * item.orderQuantity;
        }).reduce((a,b)=>a+b)

      })
    }, 30);

  }
  reduce(e: any){
    //數量
    this.counter = parseInt(e.target.value);
    this.counter--;

    //產品ID
    let productId = e.target.id.split("-");
    console.log(productId[1]);

    this.datasvc.updateUserCart(productId[1],this.counter).subscribe((re)=>{
      console.log('re',re)
    })
    setTimeout(() => {
      this.datasvc.getUserCart().subscribe((data)=>{
        console.log('重新加載數量');
        this.cartItem = data.data.map((item: any[])=>{
          return {
            "productId": item[0],
            "orderQuantity": item[1],
            "name": item[2],
            "price": item[3],
            "inventories": item[4],
            "img": item[5],
          }
        });
        this.total = this.cartItem.map((item)=>{
          return item.price * item.orderQuantity;
        }).reduce((a,b)=>a+b)

      })
    }, 30);

  }
}

