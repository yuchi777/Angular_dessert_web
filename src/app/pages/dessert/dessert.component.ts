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

  // ngx-pagination方式
  // page = 1;
  // itemsPerPage = 6;
  // totalItems : any;


  //ALL
  dataAllProduct!: any[];
  dataAllProductLength!: number;
  pageAll = 1;//當前頁面[(page)]
  pageSizeAll = 6;//分頁內數量[pageSize]
  // collectionSize 分頁集合中的項目數


  // 本日精選
  // dataFeatured!: any[];
  // dataFeaturedLength!: number;
  // pageFeatured = 1;
  // pageSizeFeatured = 6;

  //人氣推薦
  // dataRecommend!: any[];
  // dataRecommendLength!: number;
  // pageRecommend = 1;
  // pageSizeRecommend = 6;

  //新品上市
  // dataNewArrival!: any[];
  // dataNewArrivalLength!: number;
  // pageNewArrival = 1;
  // pageSizeNewArrival = 6;

  // 絕版品
  legend!: any[];
  legendLength!: number;
  pagelegend = 1;
  pageSizelegend = 6;


  //all product
  getAll =new Array();
  getAllLength!: number;

  //all product type
  getAllType: any;
  fieldIndex: any;

  typeIdArr: { id: any; data: any;fieldIndex:any ;chinese:any}[] = [];
  typeId: any;

  data = [];
  dataId: any;
  dataFieldIndex: any;
  dataLabel: any;

  getTotal: any[] = [];


  // DI注入
  constructor(public datasvc: DataService) {

  }

  ngOnChanges(): void {
    this.datasvc.getAllProduct().subscribe((data) => {
      console.log('getAllProduct', data.data);
      this.dataAllProduct = data.data;
      this.dataAllProductLength = data.data.length;
    })

  }


  ngOnInit() {

    this.datasvc.getProductsByType().subscribe((data)=>{
      this.getAllType = data.data;
      this.fieldIndex = data.fieldIndex;

      //type ID array
      this.typeId = this.getAllType.map((item: { [x: string]: any; })=>{
        return parseInt(item[this.fieldIndex.typeId])
      })
      console.log('this.typeId', this.typeId)

      this.typeId.map((id: any)=>{
        this.datasvc.getProductsByTypeId(id).subscribe((data)=>{
          console.log('typeID map',id)
          console.log('typeID map',data.data)
          //設置空的typeIdArr
          this.typeIdArr.push({
            "id":id,
            "data":data.data,
            "fieldIndex":data.fieldIndex,
            "chinese":[]
          })
        })
      })

      console.log('newArr', this.typeIdArr)
    })



    this.datasvc.getAllProduct().subscribe((data) => {
      console.log('getAllProduct', data.data);
      this.dataAllProduct = data.data;
      this.dataAllProductLength = data.data.length;

      // this.totalItems = data.data.length;
    })


    // this.datasvc.getProductsByTypeId(1).subscribe((data) => {
    //   console.log('dataFeatured', data.data);
    //   this.dataFeatured = data.data;
    //   this.dataFeaturedLength = data.data.length;

    //   this.dataFeatured.map((item)=>{
    //     this.getAll.push(item)
    //   })
    // })

    // this.datasvc.getProductsByTypeId(2).subscribe((data) => {
    //   this.dataRecommend = data.data;
    //   this.dataRecommendLength = data.data.length;

    //   this.dataRecommend.map((item)=>{
    //     this.getAll.push(item)
    //   })
    // })

    // this.datasvc.getProductsByTypeId(3).subscribe((data) => {
    //   this.dataNewArrival = data.data;
    //   this.dataNewArrivalLength = data.data.length;

    //   this.dataNewArrival.map((item)=>{
    //     this.getAll.push(item)
    //   })
    // })

    this.datasvc.getProductsByTypeId(4).subscribe((data) => {
      this.legend = data.data;
      this.legendLength = data.data.length;

      this.legend.map((item)=>{
        this.getAll.push(item)
      })

      //不同type產品種類加總
      console.log('getall',this.getAll)
      //長度確認!!!!!
      this.getAllLength = this.getAll.length;
      console.log('getAllLength',this.getAllLength)
    })
  }


  getData(e: any){
    let id = e.target.id;
    console.log('click id',id);
    console.log('this newArr',this.typeIdArr)


    this.data = [];
    this.dataId = id;


    this.getAllType.forEach((type: any)=>{
      // console.log(type[this.fieldIndex.typeId])
      // console.log(type[this.fieldIndex.chinese])
      if(type[this.fieldIndex.typeId] == id){
        this.dataLabel = type[this.fieldIndex.chinese];
      }
    })


    this.typeIdArr.forEach((data)=>{
      if(data.id == id){
        console.log('click data', data)
        this.data = data.data;
        this.dataId = data.id;
        this.dataFieldIndex = data.fieldIndex;
      }
    })
    console.log('click this data', this.data)
  }

  getAllData(e:any){
    console.log('this typeIdArr',this.typeIdArr);
    console.log('this.getAllType',this.getAllType);

    let newArr = this.typeIdArr.map((data)=>{
        let id = data.id
        this.dataFieldIndex  = data.fieldIndex
        let chinese = this.getAllType.find((type: { [x: string]: any; })=>{
          return type[this.fieldIndex.typeId] == id
        })

        // data.chinese = chinese;
        data.data.forEach((element: any[]) => {
          element.push(chinese)
        });
        return data;
    })

    console.log('newArr',newArr)
    let a: any[] = [];
    newArr.forEach((data)=>{
      // console.log('data1',data)
      data.data.forEach((data: any)=>{
        // console.log('data2',data)
        this.getTotal.push(data);
      })

    })
    // this.getTotal.fieldIndex.push(this.fieldIndex);
    console.log('this.getTotal',this.getTotal)

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
