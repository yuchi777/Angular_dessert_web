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

  //userStatus$
  userStatusRxjs: any = null;
  //狀態
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

    // 訂閱 userStatus$
    this.userStatusRxjs = this.datasvc.userStatus$.subscribe((re) => {
        // 更新狀態
        this.userStatus = re;
    });


  }







  // 取消訂閱 userStatus$

  logout(){

    this.userStatus = false;
    localStorage.removeItem('token');
    // localStorage.clear();
    this.router.navigate(['/login']);

    console.log('localStorage token 已清除');
    // window.location.reload();
  }

}
