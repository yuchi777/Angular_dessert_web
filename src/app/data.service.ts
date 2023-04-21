import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map  } from 'rxjs';
// 利用 Rxjs BehaviorSubject 觀察與訂閱的特性處理非直接父子元件之間的資料溝通
import { BehaviorSubject } from 'rxjs';


export interface Api {
  status: any;
  data: any;
  items: any;


  //需要從api取出的資料
  img: string,
  types: string,
  productId: string,
  inventories: string,
  price: string,
  name: string

  username:string,
  password:string,

}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  data;
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) {
    // http.post('http://presale.megatime.com.tw/sweetApi/getProductsByTypeId',{ "typeId" : 1})
    // .subscribe((result)=>{
    //   this.data = result ;
    // })

    this.data = [
      {
        "productId": 1,
        "name": "馬卡龍",
        "price": 550,
        "inventories": 7,
        "img": "./assets/img/15.jpg",
        "types": 1
      },
      {
        "productId": 2,
        "name": "草莓蛋糕",
        "price": 250,
        "inventories": 2,
        "img": "./assets/img/14.jpg",
        "types": 1
      },
      {
        "productId": 3,
        "name": "火龍果",
        "price": 150,
        "inventories": 3,
        "img": "./assets/img/13.jpg",
        "types": 1
      },
      {
        "productId": 4,
        "name": "馬卡龍-2",
        "price": 550,
        "inventories": 7,
        "img": "./assets/img/15.jpg",
        "types": 2
      },
      {
        "productId": 5,
        "name": "草莓蛋糕-2",
        "price": 250,
        "inventories": 2,
        "img": "./assets/img/14.jpg",
        "types": 2
      },
      {
        "productId": 6,
        "name": "火龍果-2",
        "price": 150,
        "inventories": 3,
        "img": "./assets/img/13.jpg",
        "types": 2
      },
      {
        "productId": 7,
        "name": "馬卡龍-3",
        "price": 550,
        "inventories": 7,
        "img": "./assets/img/15.jpg",
        "types": 3
      },
      {
        "productId": 8,
        "name": "草莓蛋糕-3",
        "price": 250,
        "inventories": 2,
        "img": "./assets/img/14.jpg",
        "types": 3
      },
      {
        "productId": 9,
        "name": "火龍果-3",
        "price": 150,
        "inventories": 3,
        "img": "./assets/img/13.jpg",
        "types": 3
      },
    ]
  }

  getData() {
    // return this.http.get<any>('https://api.github.com/search/users?q=mike')
    return this.http.post('http://presale.money-link.com.tw/sweetApi/getProductsByTypeId', { "typeId": 2 })
    // .pipe(
    //   map((re) => {

    //   })
    // )
  }



  // presale.money-link.com.tw
  // 'http://presale.money-link.com.tw/sweetApi/getProductsByTypeId',{ "typeId" : 2}
  // https://api.github.com/search/users?q=mike

  getProductsByTypeId(_typeId: any): Observable<Api> {
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getProductsByTypeId', { "typeId": _typeId });
    // return this.http.get<Api>('https://api.github.com/search/users?q=mike');

  }


  getAllProduct() {
    // console.log('getAlltoken',this.token)
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getAllProduct', {
      "token": this.token
    })
  }

  login(_loginInfo: object){
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/adminLogin',_loginInfo)
  }





}



@Injectable({
  providedIn: 'root',
})
export class LandRecordService {
  constructor() {}

  // 提供訂閱服務 - landRecord
  public landRecord = new BehaviorSubject<any>('');
  landRecord$ = this.landRecord.asObservable();

  // 寫入 landRecord$
  setLandRecord(value: any): void {
      this.landRecord.next(value);
  }
}





