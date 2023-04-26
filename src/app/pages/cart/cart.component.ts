import { Component } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  //icon
  faTrash = faTrash ;
  cartItem!: any[];
  fare: number = 100;
  total!:number;

  constructor(public datasvc: DataService,private router: Router,){

  }


  ngOnInit(): void {
    this.datasvc.getUserCart().subscribe((data)=>{
      console.log('getUserCart_status', data);
      console.log('getUserCart', data.data);
      this.cartItem = data.data;
      console.log('cartItem',this.cartItem);

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
    let counter = parseInt(e.target.value);
    counter++;

    //產品ID
    let productId = e.target.id.split("-");
    console.log(productId[1]);

    this.datasvc.updateUserCart(productId[1],counter).subscribe((re)=>{
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
    }, 50);

  }
  reduce(e: any){
    //數量
    let counter = parseInt(e.target.value);
    counter--;

    //產品ID
    let productId = e.target.id.split("-");
    // console.log(productId[1]);

    this.datasvc.updateUserCart(productId[1],counter).subscribe((re)=>{
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
    }, 50);

  }


  itemCountChange(e: any){
    //數量
    let counter = parseInt(e.target.value);
    console.log('itemCountChange',counter);
    if(counter == 0){
      alert('產品數量不得為0,請刪除此項目')
    }
    //產品ID
    let productId = e.target.id.split("-");
    // console.log(productId[1]);

    this.datasvc.updateUserCart(productId[1],counter).subscribe((re)=>{
      console.log('re',re)
    },(error)=>{alert(error.error.message)})


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
    }, 50);
  }


  deleteItem(e: any){
    //產品ID
    let productId = e.target.id;
    console.log('id',productId);
    this.datasvc.deleteFromUserCart(productId).subscribe((re)=>{
      console.log('delete',re)
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
    }, 50);
  }

  checkout(){
    this.datasvc.getUserCart().subscribe((data)=>{
      let batchItem = data.data.map((item: any[])=>{
        return {
          "productId": item[0],
          "orderQuantity": item[1]
        }
      });
      console.log('batchItem',batchItem)
      this.datasvc.batchUpdateUserCartQuantity(batchItem).subscribe((re)=>{
        console.log('batcjItemInfo',re);
        if(re.status == 200){
          this.router.navigate(['/checkout'])
        }

      },(error)=>{
        console.log('error',error)
        alert('結帳失敗'+error.error.message)
      })
    })
  }
}

