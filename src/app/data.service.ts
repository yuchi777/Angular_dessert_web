import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
// 利用 Rxjs BehaviorSubject 觀察與訂閱的特性處理非直接父子元件之間的資料溝通
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

export interface Api {
  fieldIndex: any;
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

  username: string,
  password: string,

}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: any;
  adminToken = localStorage.getItem('adminToken');
  token = localStorage.getItem('token') ?  localStorage.getItem('token') : '';

  constructor(private http: HttpClient) {

  }


  // 提供訂閱服務 - landRecord
  public userStatus = new BehaviorSubject<any>('');
  userStatus$ = this.userStatus.asObservable();
  // 寫入 landRecord$
  setUserStatus(value: any): void {
    this.userStatus.next(value);
  }


  getProductsByType(){
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getAllProductType',{})
  }



  // presale.money-link.com.tw
  // 'http://presale.money-link.com.tw/sweetApi/getProductsByTypeId',{ "typeId" : 2}

  getProductsByTypeId(_typeId: any): Observable<Api> {
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getProductsByTypeId', { "typeId": _typeId });

  }


  getAllProduct() {
    // console.log('getAlltoken',this.token)
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getAllProduct', {
      "token": this.adminToken
    })
  }

  login(_loginInfo: { username: any; password?: string; }) {

    switch (_loginInfo.username) {
      case 'admin':
        return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/adminLogin', _loginInfo)


      default:
        return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/login', _loginInfo)

    }

  }


  register(regisUser:any,password:any){
    return this.http.post('http://presale.money-link.com.tw/sweetApi/register',{
      "username" : regisUser,
      "password" : password
    })
  }



  addUserCart(productId: number, counter: number) {
    // const token = localStorage.getItem('token');
    return this.http.post('http://presale.money-link.com.tw/sweetApi/addUserCart', {
      "token": this.token,
      "productId": productId,
      // "orderQuantity":counter,
      "orderQuantity": 1,
    })
  }

  getUserCart() {
    const token: any = localStorage.getItem('token');
    const adminToken: any = localStorage.getItem('adminToken');
    // console.log('getusercartToken', token);
    // console.log('getusercartToken', jwt_decode(this.token));
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getUserCart', {
      "token": token
    })
  }

  updateUserCart(productId: number, counter: number) {
    const token = localStorage.getItem('token');
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/updateUserCart', {
      "token": token,
      "productId": productId,
      "orderQuantity": counter
    })
  }

  deleteFromUserCart(productId: number) {
    const token = localStorage.getItem('token');
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/deleteUserCart', {
      "token": token,
      "productId": productId
    })
  }

  //檢查庫存
  batchUpdateUserCartQuantity(_checkProduct: { productId: number; orderQuantity: number }) {
    const token = localStorage.getItem('token');
    console.log('_checkProduct', _checkProduct)
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/batchUpdateUserCart', {
      "token": token,
      "userCarts": _checkProduct
    })
  }


  checkoutUserCart() {
    const token = localStorage.getItem('token');
    const receiverName = localStorage.getItem('receiverName');
    const toreceiverPhoneken = localStorage.getItem('receiverPhone');
    const receiverAddress = localStorage.getItem('receiverAddress');
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/checkoutUserCart', {
      "token": token,
      "receiverName": receiverName,
      "receiverPhone": toreceiverPhoneken,
      "receiverAddress": receiverAddress
    })
  }



}








