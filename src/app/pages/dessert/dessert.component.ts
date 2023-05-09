import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { Api, DataService } from '../../data.service';


@Component({
  selector: 'app-dessert',
  templateUrl: './dessert.component.html',
  styleUrls: ['./dessert.component.css']
})
export class DessertComponent {

  faCoffee = faCoffee;
  counter: number = 1;

  //ALL
  // dataAllProduct!: any[];
  // dataAllProductLength!: number;
  pageAll = 1;//當前頁面[(page)]
  pageSizeAll = 6;//分頁內數量[pageSize]
  // collectionSize 分頁集合中的項目數

  //all product
  getAll = new Array();
  getAllLength!: number;

  //all product type
  getAllType: any;
  fieldIndex: any;

  typeIdArr: { id: any; data: any; fieldIndex: any; chinese: any }[] = [];
  typeId: any;

  data: any[] = [];
  dataId: any;
  dataFieldIndex: any;
  dataLabel: any;

  getTotal: any[] = [];
  token = localStorage.getItem('token') ?  localStorage.getItem('token') : '';


  // DI注入
  constructor(public datasvc: DataService) {

  }



  ngOnInit() {

    this.datasvc.getProductsByType().subscribe((data) => {
      this.getAllType = data.data;
      this.fieldIndex = data.fieldIndex;

      //type ID array
      this.typeId = this.getAllType.map((item: { [x: string]: any; }) => {
        return parseInt(item[this.fieldIndex.typeId])
      })
      // console.log('this.typeId', this.typeId)

      this.typeId.map((id: any) => {
        this.datasvc.getProductsByTypeId(id).subscribe((data) => {
          // console.log('typeID map',id)
          // console.log('typeID map',data.data)
          //設置空的typeIdArr
          this.typeIdArr.push({
            "id": id,
            "data": data.data,
            "fieldIndex": data.fieldIndex,
            "chinese": []
          })

          this.typeIdArr.forEach((data) => {
            if (data.id == 1) {
              // console.log('click data', data)
              this.data = data.data;
              this.dataId = data.id;
              this.dataFieldIndex = data.fieldIndex;
            }
          })

        },(error)=>{
          console.log(error.error.message)
        })
      })


      this.getAllType.forEach((type: any) => {
        // console.log(type[this.fieldIndex.typeId])
        // console.log(type[this.fieldIndex.chinese])
        if (type[this.fieldIndex.typeId] == 1) {
          this.dataLabel = type[this.fieldIndex.chinese];
        }
      })





    })





    // this.datasvc.getAllProduct().subscribe((data) => {
    //   console.log('getAllProduct', data.data);
    //   this.dataAllProduct = data.data;
    //   this.dataAllProductLength = data.data.length;
    // })


  }
  getAllData() {
    this.data = [];
    console.log('this typeIdArr', this.typeIdArr);
    // console.log('this.getAllType',this.getAllType);

    let newArr = this.typeIdArr.map((data) => {
      let id = data.id
      this.dataFieldIndex = data.fieldIndex
      let chinese = this.getAllType.find((type: { [x: string]: any; }) => {
        return type[this.fieldIndex.typeId] == id
      })
      // data.chinese = chinese;
      data.data.forEach((element: any[]) => {
        element.push(chinese)
      });

      return data;
    })

    console.log('newArr', newArr)

    // this.data = [];
    newArr.forEach((data) => {
      // console.log('data1',data)
      data.data.forEach((data: any) => {
        // console.log('data2',data)
        // this.getTotal.push(data);
        this.data.push(data);
      })

    })

    // console.log('this.getTotal',this.getTotal)

  }


  getData(e: any) {
    let id = e.target.id;
    // console.log('click id',id);
    // console.log('this newArr',this.typeIdArr)


    this.data = [];
    this.dataId = id;


    this.getAllType.forEach((type: any) => {
      // console.log(type[this.fieldIndex.typeId])
      // console.log(type[this.fieldIndex.chinese])
      if (type[this.fieldIndex.typeId] == id) {
        this.dataLabel = type[this.fieldIndex.chinese];
      }
    })


    this.typeIdArr.forEach((data) => {
      if (data.id == id) {
        // console.log('click data', data)
        this.data = data.data;
        this.dataId = data.id;
        this.dataFieldIndex = data.fieldIndex;
      }
    })
    // console.log('click this data', this.data)
  }




  add(e: any) {
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
        console.log('getUserCart no Data')
        // this.datasvc.addUserCart(productId, this.counter).subscribe((data) => {
        //   alert(`新增商品ID.${productId}成功, 購物車有${this.counter}件`)
        //   this.counter = 1;
        // })

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
              alert(`新增商品${e[fieldIndex.name]}-${productId}成功, 購物車有${this.counter}件`)
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
          }else{



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
            alert(`新增商品No.${productId}成功, 購物車有${this.counter}件`)
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
