import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  faCartShopping = faCartShopping;

  // landRecord$
  userStatusRxjs: any = null;
  // 狀態
  userStatus = false;

  //token
  token:any;




  constructor(
    private router: Router,
    public datasvc: DataService,
  ){
    if(localStorage.getItem('token') != null){
      this.datasvc.userStatus.next(true)
    }
  }




  ngOnInit(): void {

    this.token = localStorage.getItem('token');
    // const token_decode  = jwt_decode(this.token);
    // console.log('token_decode',token_decode)

    // 訂閱 landRecord$
    this.userStatusRxjs = this.datasvc.userStatus$.subscribe((re) => {
        // 更新狀態
        this.userStatus = re;
        // console.log('landRecords',this.landRecords);
    });


  }







  // 取消訂閱 landRecord$
  // ngOnDestroy(): void {
  //   if (!!this.landRecordRxjs) this.landRecordRxjs.unsubscribe();
  // }

  logout(){
    this.userStatus = false;
    localStorage.removeItem('token');
    console.log('localStorage token 已清除');
    this.router.navigate(['/login'])
    // window.location.reload();
  }

}
