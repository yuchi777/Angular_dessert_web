import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

export interface Api {
  //需要從api取出的資料
  img: string,
  types: string,
  productId: string,
  inventories: string,
  price: string,
  name: string

  fieldIndex: any;
  status: any;
  data: any;
  items: any;
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private data: any;
  private adminToken = localStorage.getItem('adminToken');
  private token: any;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token');
  }


  //改成Login service 存放相關的登入狀態或登入資料
  // 提供訂閱服務 - userStatus
  // userStatus: BehaviorSubject<string> 做為狀態儲存，並且給定初值為空字串
  // 利用 asObservable() 將 BehaviosSubject 轉換成單純的"Observable"再賦值給 userStatus$
  public userStatus = new BehaviorSubject<any>('');
  userStatus$ = this.userStatus.asObservable();

  // 寫入 userStatus$
  public setUserStatus(value: any): void {
    this.userStatus.next(value);
  }




  public getProductsByType(){
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getAllProductType',{})
  }

  // presale.money-link.com.tw
  // 'http://presale.money-link.com.tw/sweetApi/getProductsByTypeId',{ "typeId" : 2}

  public getProductsByTypeId(_typeId: any): Observable<Api> {
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getProductsByTypeId', { "typeId": _typeId });
  }

  public login(_loginInfo: { username: any; password?: string; }) {
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/login', _loginInfo)
    // switch (_loginInfo.username) {
    //   case 'admin':
    //     return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/adminLogin', _loginInfo)
    //   default:
    //     return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/login', _loginInfo)
    // }

  }

  public register(regisUser:any,password:any){
    return this.http.post('http://presale.money-link.com.tw/sweetApi/register',{
      "username" : regisUser,
      "password" : password
    })
  }

  public addUserCart(productId: number, counter: number) {
    const token = localStorage.getItem('token');
    return this.http.post('http://presale.money-link.com.tw/sweetApi/addUserCart', {
      "token": token,
      "productId": productId,
      // "orderQuantity":counter,
      // "orderQuantity": 9999,
      "orderQuantity": 1,
    })
  }

  public getUserCart() {
    const token: any = localStorage.getItem('token');
    // const adminToken: any = localStorage.getItem('adminToken');
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getUserCart', {
      "token": token
    })
  }

  public updateUserCart(productId: number, counter: number) {
    const token = localStorage.getItem('token');
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/updateUserCart', {
      "token": token,
      "productId": productId,
      "orderQuantity": counter
    })
  }

  public deleteFromUserCart(productId: number) {
    const token = localStorage.getItem('token');
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/deleteUserCart', {
      "token": token,
      "productId": productId
    })
  }

  //檢查庫存
  public batchUpdateUserCartQuantity(_checkProduct: { productId: number; orderQuantity: number }) {
    const token = localStorage.getItem('token');
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/batchUpdateUserCart', {
      "token": token,
      "userCarts": _checkProduct
    })
  }

  public checkoutUserCart() {
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






  public getAllProduct() {
    // console.log('getAlltoken',this.token)
    return this.http.post<Api>('http://presale.money-link.com.tw/sweetApi/getAllProduct', {
      "token": this.adminToken
    })
  }



}








