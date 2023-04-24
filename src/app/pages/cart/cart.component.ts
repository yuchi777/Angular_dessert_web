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

  constructor(public datasvc: DataService){

  }


  ngOnInit(): void {
    this.datasvc.getUserCart().subscribe((data)=>{
      console.log('getUserCart', data.data);
      this.cartItem = data.data;
    })
  }

  add(e: any){

    //數量
    this.counter = parseInt(e.target.value);
    this.counter++;

    //產品ID
    let productId = e.target.id.split("-");
    console.log(productId[1]);

    //有產品ID找尋產品數量綁定到view??


    this.datasvc.updateUserCart(productId[1],this.counter).subscribe((re)=>{
      console.log('re',re)
    })
  }

}
