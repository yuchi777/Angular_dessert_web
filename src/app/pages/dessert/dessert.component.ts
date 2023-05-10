import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';


@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css']
})
export class DessertComponent {

  readonly faCoffee = faCoffee;
  private counter: number = 1;

  //ALL
  // protected dataAllProduct!: any[];
  // protected dataAllProductLength!: number;
  protected pageAll = 1;//當前頁面[(page)]
  protected pageSizeAll = 6;//分頁內數量[pageSize]
  // collectionSize 分頁集合中的項目數

  //all product
  // protected getAll = new Array();
  // protected getAllLength!: number;

  //all product type
  protected getAllType: any;
  //甜點種類欄位名稱
  protected fieldIndex: any;

  protected typeIdArr: { id: any; data: any; fieldIndex: any; chinese: any }[] = [];
  protected typeId: any;

  protected data: any[] = [];
  private dataId: any;

  //甜點產品欄位名稱
  protected dataFieldIndex: any;
  protected dataLabel: any;

  protected getTotal: any[] = [];
  private token = localStorage.getItem('token');


  // DI注入
  constructor(public datasvc: DataService) {

  }



  ngOnInit() {

    this.datasvc.getProductsByType().subscribe((data) => {
      this.getAllType = data.data;
      this.fieldIndex = data.fieldIndex;
      //取ID typeId array
      this.typeId = this.getAllType.map((item: { [x: string]: any; }) => {
        return parseInt(item[this.fieldIndex.typeId])
      })
      // console.log('this.typeId', this.typeId)

      this.typeId.map((id: any) => {
        this.datasvc.getProductsByTypeId(id).subscribe((data) => {
          // console.log('typeID map',id)
          // console.log('typeID map',data.data)

          //欄位名稱
          this.dataFieldIndex = data.fieldIndex;


          //所有甜點產品陣列(分類)
          //設置空的typeIdArr
          this.typeIdArr.push({
            "id": id,
            "data": data.data,
            "fieldIndex": data.fieldIndex,
            "chinese": []
          })
          console.log('ngOnInit', this.typeIdArr)


          //所有甜點產品陣列(合併)
          // let allData: any[] = [];
          // this.typeIdArr.forEach((data)=>{
          //   data.data.forEach((res: any)=>{
          //     allData.push(res);
          //   })
          // })
          // this.data = allData;
          // console.log('allData',allData)

          let labelProducts: any[][] = [];
          this.getAllType.forEach((type: any) => {
            this.typeIdArr.forEach((res)=>{
              if(res.id == type[this.fieldIndex.typeId]){
                res.data.forEach((res: any[])=>{
                  let arr = [...res, type[this.fieldIndex.chinese] ];
                  labelProducts.push(arr)
                })
              }
            })
          })
          this.data = labelProducts;


          //本日精選
          // this.typeIdArr.forEach((data) => {
          //   if (data.id == 1) {
          //     this.data = data.data;
          //     this.dataId = data.id;
          //     this.dataFieldIndex = data.fieldIndex;
          //   }
          // })

        },(error)=>{
          console.log(error.error.message)
        })
      })


      this.getAllType.forEach((type: any) => {
        if (type[this.fieldIndex.typeId] == 1) {
          this.dataLabel = type[this.fieldIndex.chinese];
        }
      })

    })
  }



  protected getAllData() {
    let labelProducts: any[][] = [];
          this.getAllType.forEach((type: any) => {
            this.typeIdArr.forEach((res)=>{
              if(res.id == type[this.fieldIndex.typeId]){
                res.data.forEach((res: any[])=>{
                  let arr = [...res, type[this.fieldIndex.chinese] ];
                  labelProducts.push(arr)
                })
              }
            })
          })
          this.data = labelProducts;
    // this.data = [];
    // console.log('this typeIdArr', this.typeIdArr);

    // let newArr = this.typeIdArr.map((data) => {
    //   let id = data.id
    //   this.dataFieldIndex = data.fieldIndex
    //   let chinese = this.getAllType.find((type: { [x: string]: any; }) => {
    //     return type[this.fieldIndex.typeId] == id
    //   })
    //   data.chinese = chinese[1];

    //   data.data.forEach((element: any[]) => {
    //     element.push(chinese[1])
    //   });

    //   return data;
    // })

    // console.log('newArr', newArr)

    // // this.data = [];
    // newArr.forEach((data) => {
    //   data.data.forEach((data: any) => {
    //     this.data.push(data);
    //   })

    // })

    // console.log('data getAllData input', this.data)

  }


  protected getData(e: any) {
    let id = e.target.id;
    // console.log('click id',id);
    // console.log('this newArr',this.typeIdArr)


    // this.data = [];
    // this.dataId = id;
    let labelProducts: any[][] = [];
    this.getAllType.forEach((type: any) => {
      if (type[this.fieldIndex.typeId] == id) {
        this.dataLabel = type[this.fieldIndex.chinese];
      }
    })

    this.typeIdArr.forEach((data) => {
      if (data.id == id) {
        data.data.forEach((res: any)=>{
          let arr = [...res, this.dataLabel ];
          labelProducts.push(arr);
        })
        // this.data = data.data;
        // this.dataId = data.id;
        // this.dataFieldIndex = data.fieldIndex;
      }

    })
    this.data = labelProducts;
    // console.log('getData',labelProducts)

  }




  protected add(e: any) {
    if(!this.token){
      alert('請先登入')
    }else{
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

      if (carData == undefined) {
        //清空商品回傳undefined
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

      } else {

        //已經在購物車裡
        carData.forEach((e: any[]) => {
          if (e[fieldIndex.productId] == productId && e[fieldIndex.orderQuantity].length > 0) {
            console.log('已經在購物車裡');
            console.log('庫存', e[fieldIndex.inventories]);
            console.log('已有產品數量', e[fieldIndex.orderQuantity]);
            console.log('name', e[fieldIndex.name]);

            //counter+已有數量
            this.counter = this.counter + parseInt(e[fieldIndex.orderQuantity]);
            console.log('增加後數量', this.counter)

            //新增購物車產品數量
            this.datasvc.addUserCart(productId, this.counter).subscribe((data: any) => {
              //counter打回去
              alert(`新增商品成功`)
              console.log('addUserCart', data);
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

        //沒有在購物車裡
        //確認購物車有無點選產品
        let chkProductId = carData.every((e: any[]) => {
          return e[fieldIndex.productId] !== productId
        });
        console.log('沒有在購物車裡', chkProductId);

        // 若無產品productId,chkProductId == true 新增新產品至購物車
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






}
