import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  readonly faHeart = faHeart;
  protected dataFeatured!: any[];
  protected dataRecommend!: any[];
  protected dataNewArrival!: any[];
  private counter: number = 1;
  private token = localStorage.getItem('token');
  protected fieldIndex: any;

  // DI注入
  constructor(public datasvc: DataService) {
  }



  ngOnInit() {

    // this.datasvc.getData().subscribe((result) => {
    //   console.log('http_re_objectKey', Object.keys(result));
    //   console.log('http_re_values', Object.values(result)[2]);
    //   console.log('http_re_typeof', typeof(result));
    //   console.log('http_re', result);
    // })

    this.datasvc.getProductsByTypeId(1).subscribe((data)=>{
      this.dataFeatured = data.data;
      this.fieldIndex = data.fieldIndex;
      console.log(this.fieldIndex)
    })
    this.datasvc.getProductsByTypeId(2).subscribe((data)=>{
      this.dataRecommend = data.data;
      this.fieldIndex = data.fieldIndex;
    })
    this.datasvc.getProductsByTypeId(3).subscribe((data)=>{
      this.dataNewArrival = data.data;
      this.fieldIndex = data.fieldIndex;
    })




  }

  protected add(e: any) {
    if(!this.token){
      alert('請先登入')
    }else{

    }
      //取得產品ID
      let productId = e.target.id;

      //取得使用者購物車資訊
      //新增購物車產品數量
      this.datasvc.getUserCart().subscribe((data) => {

        console.log('購物車', data)
        console.log('購物車data', data.data)
        console.log('fieldIndex', data.fieldIndex)
        let fieldIndex = data.fieldIndex;
        let carData = data.data;

        if( carData == undefined){
          console.log('getUserCart no Data')
          this.datasvc.addUserCart(productId, this.counter).subscribe((data) => {
            alert(`新增商品成功`)
            this.counter = 1;
          },(error)=>{
            if(error.error.status == 400){
              console.log(error)
            }
            if(error.error.status == 400 && error.error.message == 'Order quantity exceeds inventory'){
              alert('訂單數量超過庫存')
            }
          })
        }else{
          carData.forEach((e: any[]) => {
            if (e[fieldIndex.productId] == productId && [fieldIndex.orderQuantity].length > 0) {
              console.log('已經在購物車裡');
              console.log('庫存', e[fieldIndex.inventories]);
              console.log('已有產品數量', e[fieldIndex.orderQuantity]);
              console.log('name', e[fieldIndex.name]);

              //counter+已有數量
              this.counter = this.counter + parseInt(e[fieldIndex.orderQuantity]);
              console.log('增加後數量', this.counter)

              //新增購物車產品數量
              this.datasvc.addUserCart(productId, this.counter).subscribe((data) => {
                //counter打回去
                alert(`新增商品成功`)
                console.log('addUserCart', data)
                this.counter = 1;
              },(error)=>{
                if(error.error.status == 400){
                  console.log(error)
                }
                if(error.error.status == 400 && error.error.message == 'Order quantity exceeds inventory'){
                  alert('訂單數量超過庫存')
                }
              })
            }
          })


          //確認購物車有無點選產品
        let chkProductId = carData.every((e: any[]) => {
          return e[fieldIndex.productId] !== productId
        });
        console.log('沒有在購物車裡', chkProductId);

        // 若無產品productId,新增新產品至購物車
        if (chkProductId) {
          console.log('點選ID', productId);

          this.datasvc.addUserCart(productId, this.counter).subscribe((data) => {
            alert(`新增商品成功`)
            console.log('addUserCart', data)
            this.counter = 1;
          },(error)=>{
            if(error.error.status == 400){
              console.log(error)
            }
            if(error.error.status == 400 && error.error.message == 'Order quantity exceeds inventory'){
              alert('訂單數量超過庫存')
            }

          })
        }
        }
      })
  }


}
