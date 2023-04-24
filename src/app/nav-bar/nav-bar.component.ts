import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { LandRecordService } from '../data.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  faCartShopping = faCartShopping;

  // landRecord$
  landRecordRxjs: any = null;
  // 狀態
  landRecords = false;
  username = localStorage.getItem('name');

  constructor(private landRecordService: LandRecordService,private router: Router,){

  }


  ngOnInit(): void {
    // 訂閱 landRecord$
    this.landRecordRxjs = this.landRecordService.landRecord$.subscribe((resp) => {
        // 更新總筆數
        this.landRecords = resp;
    });
    console.log('landRecords',this.landRecords);
  }


  ngOnDestroy(): void {
    // 取消訂閱 landRecord$
    if (!!this.landRecordRxjs) this.landRecordRxjs.unsubscribe();
  }

  checkStatus(){
    this.landRecords = false;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('name');
    this.router.navigate(['/login'])
    // window.location.reload();
  }

}
