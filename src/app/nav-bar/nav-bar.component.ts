import { Component } from '@angular/core';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  readonly faCartShopping = faCartShopping;

  //userStatus$
  protected userStatusRxjs: any = null;
  //狀態
  protected userStatus = false;

  //token
  protected token:any;




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

  public logout(){
    this.userStatus = false;
    console.log('localStorage token 已清除');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    // localStorage.clear();
    // window.location.reload();
  }

}
