import { Component } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';


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
  dataFeatured!: any[];
  dataFeaturedLength!: number;
  pageFeatured = 1;
  pageSizeFeatured = 6;

  //人氣推薦
  dataRecommend!: any[];
  dataRecommendLength!: number;
  pageRecommend = 1;
  pageSizeRecommend = 6;

  //新品上市
  dataNewArrival!: any[];
  dataNewArrivalLength!: number;
  pageNewArrival = 1;
  pageSizeNewArrival = 6;

  // 絕版品
  legend!: any[];
  legendLength!: number;
  pagelegend = 1;
  pageSizelegend = 6;



  // public data = [{
  //   "id": 1,
  //   "first_name": "Jethro",
  //   "last_name": "Butland",
  //   "email": "jbutland0@unicef.org",
  //   "gender": "Male",
  //   "ip_address": "108.104.116.6"
  // }, {
  //   "id": 2,
  //   "first_name": "Even",
  //   "last_name": "Duferie",
  //   "email": "eduferie1@zdnet.com",
  //   "gender": "Male",
  //   "ip_address": "171.201.185.233"
  // }, {
  //   "id": 3,
  //   "first_name": "Ernaline",
  //   "last_name": "Regi",
  //   "email": "eregi2@mapy.cz",
  //   "gender": "Female",
  //   "ip_address": "23.254.2.69"
  // }, {
  //   "id": 4,
  //   "first_name": "Wiley",
  //   "last_name": "Folonin",
  //   "email": "wfolonin3@bravesites.com",
  //   "gender": "Male",
  //   "ip_address": "135.234.136.218"
  // }, {
  //   "id": 5,
  //   "first_name": "Eulalie",
  //   "last_name": "Bardell",
  //   "email": "ebardell4@tuttocitta.it",
  //   "gender": "Female",
  //   "ip_address": "112.151.185.209"
  // }, {
  //   "id": 6,
  //   "first_name": "Nikolia",
  //   "last_name": "Gunney",
  //   "email": "ngunney5@clickbank.net",
  //   "gender": "Female",
  //   "ip_address": "122.172.213.149"
  // }, {
  //   "id": 7,
  //   "first_name": "Adrea",
  //   "last_name": "Zum Felde",
  //   "email": "azumfelde6@google.com",
  //   "gender": "Female",
  //   "ip_address": "176.238.201.232"
  // }, {
  //   "id": 8,
  //   "first_name": "Wilbert",
  //   "last_name": "Davidy",
  //   "email": "wdavidy7@cpanel.net",
  //   "gender": "Male",
  //   "ip_address": "80.21.48.54"
  // }, {
  //   "id": 9,
  //   "first_name": "Tymothy",
  //   "last_name": "Wolland",
  //   "email": "twolland8@sina.com.cn",
  //   "gender": "Male",
  //   "ip_address": "252.28.26.242"
  // }, {
  //   "id": 10,
  //   "first_name": "Kermit",
  //   "last_name": "Kort",
  //   "email": "kkort9@seesaa.net",
  //   "gender": "Male",
  //   "ip_address": "166.13.201.166"
  // }, {
  //   "id": 11,
  //   "first_name": "Noland",
  //   "last_name": "Bastide",
  //   "email": "nbastidea@ebay.co.uk",
  //   "gender": "Male",
  //   "ip_address": "60.237.148.119"
  // }, {
  //   "id": 12,
  //   "first_name": "Wolfy",
  //   "last_name": "Bertomieu",
  //   "email": "wbertomieub@seesaa.net",
  //   "gender": "Male",
  //   "ip_address": "195.180.15.81"
  // }, {
  //   "id": 13,
  //   "first_name": "Joannes",
  //   "last_name": "Sayburn",
  //   "email": "jsayburnc@jigsy.com",
  //   "gender": "Female",
  //   "ip_address": "242.232.5.247"
  // }, {
  //   "id": 14,
  //   "first_name": "Beaufort",
  //   "last_name": "Roddell",
  //   "email": "broddelld@walmart.com",
  //   "gender": "Male",
  //   "ip_address": "247.165.243.180"
  // }, {
  //   "id": 15,
  //   "first_name": "Tabbie",
  //   "last_name": "Croy",
  //   "email": "tcroye@mapquest.com",
  //   "gender": "Male",
  //   "ip_address": "84.16.158.195"
  // }, {
  //   "id": 16,
  //   "first_name": "Gaston",
  //   "last_name": "Garrat",
  //   "email": "ggarratf@jalbum.net",
  //   "gender": "Male",
  //   "ip_address": "125.254.66.66"
  // }, {
  //   "id": 17,
  //   "first_name": "Marcella",
  //   "last_name": "Gillise",
  //   "email": "mgilliseg@yolasite.com",
  //   "gender": "Female",
  //   "ip_address": "13.120.89.41"
  // }, {
  //   "id": 18,
  //   "first_name": "Violante",
  //   "last_name": "Normanell",
  //   "email": "vnormanellh@fda.gov",
  //   "gender": "Female",
  //   "ip_address": "88.17.69.193"
  // }, {
  //   "id": 19,
  //   "first_name": "Seward",
  //   "last_name": "Halligan",
  //   "email": "shalligani@rediff.com",
  //   "gender": "Male",
  //   "ip_address": "170.21.236.236"
  // }, {
  //   "id": 20,
  //   "first_name": "Dayle",
  //   "last_name": "Rainsdon",
  //   "email": "drainsdonj@omniture.com",
  //   "gender": "Female",
  //   "ip_address": "254.141.192.14"
  // }, {
  //   "id": 21,
  //   "first_name": "Leonie",
  //   "last_name": "Mattiello",
  //   "email": "lmattiellok@ycombinator.com",
  //   "gender": "Female",
  //   "ip_address": "51.156.94.231"
  // }, {
  //   "id": 22,
  //   "first_name": "Marlowe",
  //   "last_name": "Falco",
  //   "email": "mfalcol@latimes.com",
  //   "gender": "Male",
  //   "ip_address": "130.184.39.27"
  // }, {
  //   "id": 23,
  //   "first_name": "Frannie",
  //   "last_name": "Godlonton",
  //   "email": "fgodlontonm@aol.com",
  //   "gender": "Female",
  //   "ip_address": "41.118.80.165"
  // }, {
  //   "id": 24,
  //   "first_name": "Travers",
  //   "last_name": "Wenden",
  //   "email": "twendenn@usa.gov",
  //   "gender": "Male",
  //   "ip_address": "69.161.39.55"
  // }, {
  //   "id": 25,
  //   "first_name": "Christi",
  //   "last_name": "Tixier",
  //   "email": "ctixiero@lulu.com",
  //   "gender": "Female",
  //   "ip_address": "132.214.138.100"
  // }, {
  //   "id": 26,
  //   "first_name": "Boote",
  //   "last_name": "Momford",
  //   "email": "bmomfordp@ustream.tv",
  //   "gender": "Male",
  //   "ip_address": "150.45.41.62"
  // }, {
  //   "id": 27,
  //   "first_name": "Josefa",
  //   "last_name": "O'Fearguise",
  //   "email": "jofearguiseq@craigslist.org",
  //   "gender": "Female",
  //   "ip_address": "4.179.143.30"
  // }, {
  //   "id": 28,
  //   "first_name": "Sandie",
  //   "last_name": "Esmead",
  //   "email": "sesmeadr@wisc.edu",
  //   "gender": "Female",
  //   "ip_address": "18.200.78.108"
  // }, {
  //   "id": 29,
  //   "first_name": "Jordan",
  //   "last_name": "Gilhouley",
  //   "email": "jgilhouleys@smugmug.com",
  //   "gender": "Female",
  //   "ip_address": "47.116.107.112"
  // }, {
  //   "id": 30,
  //   "first_name": "Eberhard",
  //   "last_name": "Roches",
  //   "email": "erochest@tuttocitta.it",
  //   "gender": "Male",
  //   "ip_address": "99.189.233.209"
  // }, {
  //   "id": 31,
  //   "first_name": "Saba",
  //   "last_name": "McGlew",
  //   "email": "smcglewu@wikia.com",
  //   "gender": "Female",
  //   "ip_address": "212.118.1.36"
  // }, {
  //   "id": 32,
  //   "first_name": "Vachel",
  //   "last_name": "Brabon",
  //   "email": "vbrabonv@nymag.com",
  //   "gender": "Male",
  //   "ip_address": "12.235.46.58"
  // }];

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
    this.datasvc.getAllProduct().subscribe((data) => {
      console.log('getAllProduct', data.data);
      this.dataAllProduct = data.data;
      this.dataAllProductLength = data.data.length;

      // this.totalItems = data.data.length;
    })

    this.datasvc.getProductsByTypeId(1).subscribe((data) => {
      // console.log('getApiData', data.data);
      this.dataFeatured = data.data;
      this.dataFeaturedLength = data.data.length;
    })
    this.datasvc.getProductsByTypeId(2).subscribe((data) => {
      this.dataRecommend = data.data;
      this.dataRecommendLength = data.data.length;
    })
    this.datasvc.getProductsByTypeId(3).subscribe((data) => {
      this.dataNewArrival = data.data;
      this.dataNewArrivalLength = data.data.length;
    })
    this.datasvc.getProductsByTypeId(4).subscribe((data) => {
      this.legend = data.data;
      this.legendLength = data.data.length;
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





  //檢查庫存邏輯(結帳時)
  //batchUpdateUserCartQuantity()
  //若太少告警


}
