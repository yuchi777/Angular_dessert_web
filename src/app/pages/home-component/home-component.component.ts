import { Component } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-home-component',
  templateUrl: './home-component.component.html',
  styleUrls: ['./home-component.component.css']
})
export class HomeComponentComponent {

  faHeart = faHeart;
  dataFeatured!: any[]
  dataRecommend!: any[]
  dataNewArrival!: any[]
  counter: number = 1;

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
    })
    this.datasvc.getProductsByTypeId(2).subscribe((data)=>{
      this.dataRecommend = data.data;
    })
    this.datasvc.getProductsByTypeId(3).subscribe((data)=>{
      this.dataNewArrival = data.data;
    })




  }

  add(e: any) {
      //取得產品ID
      let productId = e.target.id;

      //取得使用者購物車資訊
      //新增購物車產品數量
      this.datasvc.getUserCart().subscribe((data) => {

        console.log('購物車', data)
        console.log('購物車data', data.data)

        let carData = data.data;

        if( carData == undefined){
          //新增購物車產品數量
          this.datasvc.addUserCart(productId, this.counter).subscribe((data) => {
            //counter打回去
            alert(`新增成功商品ID-${productId}成功, 購物車有${this.counter}件`)
            console.log('addUserCart', data)
            this.counter = 1;
          })
        }else{
          carData.forEach((e: any[]) => {
            if (e[0] == productId && e[1].length > 0) {
              console.log('已經在購物車裡');
              console.log('已有產品數量', e[1]);
              console.log('name', e[2]);

              //counter+已有數量
              this.counter = this.counter + parseInt(e[1]);
              console.log('增加後數量', this.counter)

              //新增購物車產品數量
              this.datasvc.addUserCart(productId, this.counter).subscribe((data) => {
                //counter打回去
                alert(`新增成功商品ID-${productId}成功, 購物車有${this.counter}件`)
                console.log('addUserCart', data)
                this.counter = 1;
              })
            }
          })


          //確認購物車有無點選產品
        let chkProductId = carData.every((e: any[]) => {
          return e[0] !== productId
        });
        console.log('沒有在購物車裡', chkProductId);

        // 若無產品productId,新增新產品至購物車
        if (chkProductId) {
          console.log('點選ID', productId);

          this.datasvc.addUserCart(productId, this.counter).subscribe((data) => {
            alert(`新增成功商品ID-${productId}成功, 購物車有${this.counter}件`)
            console.log('addUserCart', data)
            this.counter = 1;
          })
        }
        }
      })
  }


}
