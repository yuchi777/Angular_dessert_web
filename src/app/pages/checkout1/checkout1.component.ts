import { Component } from '@angular/core';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../data.service';
import { Router } from '@angular/router'

export class Delivery{
  public cardNumber!:number;
  public lastName!:string;
  public firstName!:string;
  public month!:number;
  public year!:number;
  public code!:number
}

@Component({
  selector: 'app-checkout1',
  templateUrl: './checkout1.component.html',
  styleUrls: ['./checkout1.component.css']
})
export class Checkout1Component {
  readonly faCheck = faCheck;

  protected cartItem!: any[];
  protected fare: number = 100; //運費
  protected total!: number;

  protected form: FormGroup;
  protected delivery = new Delivery();
  private fieldIndex!: { productId: string | number; orderQuantity: string | number; name: string | number; price: string | number; inventories: string | number; img: string | number; };

  constructor(
    public datasvc: DataService,
    public fb: FormBuilder,
    private _router:Router,

  ){

    this.form = fb.group({
      cardNumber: ['', [Validators.required,Validators.minLength(16)]], //信用卡號
      lastName: ['', Validators.required],
      firstName: ['', Validators.required],
      month: ['', Validators.required],
      year: ['', Validators.required],
      code: ['', [Validators.required,Validators.minLength(3)]], //安全碼
    })

  }


  ngOnInit(): void {
    this.datasvc.getUserCart().subscribe((data) => {
      console.log('getUserCart', data.data);
      this.fieldIndex = data.fieldIndex;
      this.cartItem = data.data;
      this.cartItem = this.cartItem.map((item) => {
        return {
          "productId": item[this.fieldIndex.productId],
          "orderQuantity": item[this.fieldIndex.orderQuantity],
          "name": item[this.fieldIndex.name],
          "price": item[this.fieldIndex.price],
          "inventories": item[this.fieldIndex.inventories],
          "img": item[this.fieldIndex.img],
        }
      })

      this.total = this.cartItem.map((item) => {
        return item.price * item.orderQuantity;
      }).reduce((a, b) => a + b)
    })

  }

  protected submit(){
    // console.log('delivery Info',this.delivery);
    this._router.navigate(['/checkout2']);
  }


}
