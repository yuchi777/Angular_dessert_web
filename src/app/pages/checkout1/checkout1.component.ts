import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { Router } from '@angular/router'

export class Delivery{
  cardNumber!:number;
  lastName!:string;
  firstName!:string;
  month!:number;
  year!:number;
  code!:number
}
@Component({
  selector: 'app-checkout1',
  templateUrl: './checkout1.component.html',
  styleUrls: ['./checkout1.component.css']
})
export class Checkout1Component {
  faCheck = faCheck;

  cartItem!: any[];
  fare: number = 100;
  total!: number;

  form: FormGroup;
  delivery = new Delivery();

  constructor(
    public datasvc: DataService,
    fb: FormBuilder,
    private _router:Router,

  ){

    this.form = fb.group({
      cardNumber: ['', [Validators.required,Validators.minLength(16)]],
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      code: ['', [Validators.required,Validators.minLength(3)]],
    })

  }


  ngOnInit(): void {
    this.datasvc.getUserCart().subscribe((data) => {
      console.log('getUserCart', data.data);
      this.cartItem = data.data;
      this.cartItem = this.cartItem.map((item) => {
        return {
          "productId": item[0],
          "orderQuantity": item[1],
          "name": item[2],
          "price": item[3],
          "inventories": item[4],
          "img": item[5],
        }
      })

      this.total = this.cartItem.map((item) => {
        return item.price * item.orderQuantity;
      }).reduce((a, b) => a + b)
    })

  }

  submit(){
    console.log('delivery Info',this.delivery);
    this._router.navigate(['/checkout2']);
  }


}
