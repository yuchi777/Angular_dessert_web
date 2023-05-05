import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'

export class Delivery {
  lastName!: string;
  firstName!: string;
  phoneNumber!: string;
  city!: string;
  region!: string;
  address!: string;

}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  cartItem!: any[];
  fare: number = 100;
  total!: number;

  form: FormGroup;
  delivery = new Delivery();

  constructor(
    public datasvc: DataService,
    fb: FormBuilder,
    private _router:Router,

  ) {

    this.form = fb.group({
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      phoneNumber: ['', [Validators.required,Validators.minLength(10)]],
      city: ['', Validators.required],
      region: ['', Validators.required],
      address: ['', Validators.required],
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

      //加總金額
      this.total = this.cartItem.map((item) => {
        return item.price * item.orderQuantity;
      }).reduce((a, b) => a + b)
    })

  }

  submit(){
    console.log('delivery Info',this.delivery);
    localStorage.setItem('receiverName',this.delivery.lastName + this.delivery.firstName)
    localStorage.setItem('receiverPhone',this.delivery.phoneNumber)
    localStorage.setItem('receiverAddress',this.delivery.address)


    this._router.navigate(['/checkout1']);
  }


}
