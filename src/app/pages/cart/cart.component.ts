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
  fare: number = 0;
  total!:number;
  fieldIndex!: { productId: string | number; orderQuantity: string | number; name: string | number; price: string | number; inventories: string | number; img: string | number; };

  constructor(public datasvc: DataService,private router: Router,){

  }


  ngOnInit(): void {
    this.datasvc.getUserCart().subscribe((data)=>{
      console.log('getUserCart data', data);
      this.fieldIndex = data.fieldIndex;
      this.cartItem = data.data;
      console.log('cartItem',this.cartItem);

      if(data.data == undefined){
        console.log('請點選商品加入購物車')
      }else{
        this.fare = 100 ;
        this.cartItem = this.cartItem.map((item)=>{
          return {
            "productId": item[this.fieldIndex.productId],
            "orderQuantity": item[this.fieldIndex.orderQuantity],
            "name": item[this.fieldIndex.name],
            "price": item[this.fieldIndex.price],
            "inventories": item[this.fieldIndex.inventories],
            "img": item[this.fieldIndex.img],
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

      }
    })
  }

  chkList(){
    return this.cartItem?false:true;
  }

  add(e: any){
    //數量增加
    let counter = parseInt(e.target.value);
    counter++;

    //取產品ID
    let productId = e.target.id.split("-");

    //更新資料庫
    this.datasvc.updateUserCart(productId[1],counter).subscribe((re)=>{
      console.log('re',re);
    })

    //更新數量
    setTimeout(() => {
      this.datasvc.getUserCart().subscribe((data)=>{
        console.log('重新加載數量');
        this.cartItem = data.data.map((item: { [x: string]: any; })=>{
          return {
            "productId": item[this.fieldIndex.productId],
            "orderQuantity": item[this.fieldIndex.orderQuantity],
            "name": item[this.fieldIndex.name],
            "price": item[this.fieldIndex.price],
            "inventories": item[this.fieldIndex.inventories],
            "img": item[this.fieldIndex.img],
          }
        });
        //加總購物車項目金額
        this.total = this.cartItem.map((item)=>{
          return item.price * item.orderQuantity;
        }).reduce((a,b)=>a+b)

      })
    }, 50);

  }


  reduce(e: any){
    //減少數量
    let counter = parseInt(e.target.value);
    counter--;

    if(counter == 0){
      alert('產品數量不得為0,請刪除此項目')
    }

    //取產品ID
    let productId = e.target.id.split("-");
    // console.log(productId[1]);

    //更新資料庫
    this.datasvc.updateUserCart(productId[1],counter).subscribe((re)=>{
      console.log('re',re)
    })

    //更新數量
    setTimeout(() => {
      this.datasvc.getUserCart().subscribe((data)=>{
        console.log('重新加載數量');
        this.cartItem = data.data.map((item: { [x: string]: any; })=>{
          return {
            "productId": item[this.fieldIndex.productId],
            "orderQuantity": item[this.fieldIndex.orderQuantity],
            "name": item[this.fieldIndex.name],
            "price": item[this.fieldIndex.price],
            "inventories": item[this.fieldIndex.inventories],
            "img": item[this.fieldIndex.img],
          }
        });
        //加總購物車項目金額
        this.total = this.cartItem.map((item)=>{
          return item.price * item.orderQuantity;
        }).reduce((a,b)=>a+b)

      })
    }, 50);

  }


  //直接變更數量
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
    },(error)=>{
      alert('訂單數量超過庫存')
      console.log(error.error.message)
    })


    setTimeout(() => {
      this.datasvc.getUserCart().subscribe((data)=>{
        console.log('重新加載數量');
        this.cartItem = data.data.map((item: { [x: string]: any; })=>{
          return {
            "productId": item[this.fieldIndex.productId],
            "orderQuantity": item[this.fieldIndex.orderQuantity],
            "name": item[this.fieldIndex.name],
            "price": item[this.fieldIndex.price],
            "inventories": item[this.fieldIndex.inventories],
            "img": item[this.fieldIndex.img],
          }
        });
        //加總購物車項目金額
        this.total = this.cartItem.map((item)=>{
          return item.price * item.orderQuantity;
        }).reduce((a,b)=>a+b)

      })
    }, 50);
  }


  //刪除
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

        if(data.data == undefined){
          this.cartItem = [];
          this.total = 0 ;
          this.fare = 0;
        }else{

          this.cartItem = data.data.map((item: { [x: string]: any; })=>{
            return {
              "productId": item[this.fieldIndex.productId],
              "orderQuantity": item[this.fieldIndex.orderQuantity],
              "name": item[this.fieldIndex.name],
              "price": item[this.fieldIndex.price],
              "inventories": item[this.fieldIndex.inventories],
              "img": item[this.fieldIndex.img],
            }
          });

          //加總購物車項目金額
          this.total = this.cartItem.map((item)=>{
            return item.price * item.orderQuantity;
          }).reduce((a,b)=>a+b)
        }



      })
    }, 50);
  }


  //結帳
  checkout(){
    this.datasvc.getUserCart().subscribe((data)=>{

      let batchItem = data.data.map((item: { [x: string]: any; })=>{
        return {
          "productId": item[this.fieldIndex.productId],
          "orderQuantity": item[this.fieldIndex.orderQuantity]
        }
      });
      console.log('batchItem',batchItem)

      //檢查庫存
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

