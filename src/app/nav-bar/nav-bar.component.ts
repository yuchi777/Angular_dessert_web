import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { LandRecordService } from '../data.service';
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

  constructor(private landRecordService: LandRecordService){

  }

  ngOnInit(): void {
    // 訂閱 landRecord$
    this.landRecordRxjs = this.landRecordService.landRecord$.subscribe((resp) => {
        // 更新總筆數
        this.landRecords = resp;
    });

  }

  ngOnDestroy(): void {
    // 取消訂閱 landRecord$
    if (!!this.landRecordRxjs) this.landRecordRxjs.unsubscribe();
  }

  checkStatus(){
    this.landRecords = false;
    localStorage.removeItem('token');
  }

}
