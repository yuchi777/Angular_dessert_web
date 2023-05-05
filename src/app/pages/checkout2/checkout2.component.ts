import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export class Delivery {
  invoice!: string;
  email!: string;
  companyNumber!: number;
}

@Component({
  selector: 'app-checkout2',
  templateUrl: './checkout2.component.html',
  styleUrls: ['./checkout2.component.css']
})
export class Checkout2Component {
  faCheck = faCheck;

  cartItem!: any[];
  fare: number = 100;
  total!: number;

  form: FormGroup;
  delivery = new Delivery();

  item: boolean = true;

  constructor(
    public datasvc: DataService,
    fb: FormBuilder,
    private _router: Router,
    private http: HttpClient
  ) {
    this.form = fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      companyNumber: ['', [Validators.required, Validators.minLength(8)]],
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

  //發票種類切換
  tabClick() {
    this.item = !this.item;
  }



  submit() {
    console.log('delivery Info', this.delivery);


    this.datasvc.getUserCart().subscribe((data) => {

      const token = localStorage.getItem('token');
      this.cartItem = data.data;

      this.cartItem.map((item) => {

        console.log('item', item[0])
        //清空購物車
        this.datasvc.deleteFromUserCart(item[0]).subscribe((re) => {
          console.log('del all', re)
        })

      })
      this.cartItem = [];
      this.total = 0;
      this.fare = 0;
    })

    this.datasvc.checkoutUserCart().subscribe((re) => {
      console.log('checkoutUserCart', re)
      localStorage.removeItem('receiverName')
      localStorage.removeItem('receiverPhone')
      localStorage.removeItem('receiverAddress')
    })




    this._router.navigate(['/success']);
  }

}
