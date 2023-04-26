import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,map  } from 'rxjs';
// 利用 Rxjs BehaviorSubject 觀察與訂閱的特性處理非直接父子元件之間的資料溝通
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

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

  data:any;
  adminToken = localStorage.getItem('adminToken');

  constructor(private http: HttpClient) {


    // this.data = [
    //   {
    //     "productId": 1,
    //     "name": "馬卡龍",
    //     "price": 550,
    //     "inventories": 7,
    //     "img": "./assets/img/15.jpg",
    //     "types": 1
    //   },
    //   {
    //     "productId": 2,
    //     "name": "草莓蛋糕",
    //     "price": 250,
    //     "inventories": 2,
    //     "img": "./assets/img/14.jpg",
    //     "types": 1
    //   },
    //   {
    //     "productId": 3,
    //     "name": "火龍果",
    //     "price": 150,
    //     "inventories": 3,
    //     "img": "./assets/img/13.jpg",
    //     "types": 1
    //   },
    //   {
    //     "productId": 4,
    //     "name": "馬卡龍-2",
    //     "price": 550,
    //     "inventories": 7,
    //     "img": "./assets/img/15.jpg",
    //     "types": 2
    //   },
    //   {
    //     "productId": 5,
    //     "name": "草莓蛋糕-2",
    //     "price": 250,
    //     "inventories": 2,
    //     "img": "./assets/img/14.jpg",
    //     "types": 2
    //   },
    //   {
    //     "productId": 6,
    //     "name": "火龍果-2",
    //     "price": 150,
    //     "inventories": 3,
    //     "img": "./assets/img/13.jpg",
    //     "types": 2
    //   },
    //   {
    //     "productId": 7,
    //     "name": "馬卡龍-3",
    //     "price": 550,
    //     "inventories": 7,
    //     "img": "./assets/img/15.jpg",
    //     "types": 3
    //   },
    //   {
    //     "productId": 8,
    //     "name": "草莓蛋糕-3",
    //     "price": 250,
    //     "inventories": 2,
    //     "img": "./assets/img/14.jpg",
    //     "types": 3
    //   },
    //   {
    //     "productId": 9,
    //     "name": "火龍果-3",
    //     "price": 150,
    //     "inventories": 3,
    //     "img": "./assets/img/13.jpg",
    //     "types": 3
    //   },
    // ]
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
      "token": this.adminToken
    })
  }

  login(_loginInfo: { username: any; password?: string; }){

    switch (_loginInfo.username) {
      case 'admin':
        return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/adminLogin',_loginInfo)
        break;

      default:
        return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/login',_loginInfo)
        break;
    }

  }



  addUserCart(productId:number,counter:number){
    const token = localStorage.getItem('token');
    return this.http.post('http://presale.money-link.com.tw/sweetApi/addUserCart',{
      "token": token,
      "productId": productId,
      // "orderQuantity":counter,
      "orderQuantity":1,
    })
  }

  getUserCart(){
    const token:any = localStorage.getItem('token');
    const adminToken:any = localStorage.getItem('adminToken');
    console.log('getusercartToken',token);
    console.log('getusercartToken',jwt_decode(token));
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getUserCart',{
      "token": token
    })
  }

  updateUserCart(productId:number,counter:number){
    const token = localStorage.getItem('token');
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/updateUserCart',{
      "token": token,
      "productId": productId,
      "orderQuantity":counter
    })
  }

  deleteFromUserCart(productId:number){
    const token = localStorage.getItem('token');
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/deleteUserCart',{
      "token": token,
      "productId": productId
    })
  }

  //檢查庫存
  batchUpdateUserCartQuantity(_checkProduct:{ productId: number ; orderQuantity:number}){
    const token = localStorage.getItem('token');
    console.log('_checkProduct',_checkProduct)
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/batchUpdateUserCart',{
      "token": token,
      "userCarts": _checkProduct
    })
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





