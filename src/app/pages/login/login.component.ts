import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { DataService,LandRecordService } from '../../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  faUser = faUser;
  faKey = faKey;
  username = JSON.parse(localStorage.getItem('username')!);
  myEmail = this.username ? this.username : "admin";
  // myEmail = "admin";

  password = JSON.parse(localStorage.getItem('password')!);
  myPassword = this.password ? this.password : "123123";
  // myPassword = "123123";
  checkSet:boolean = false;
  isLogin: boolean = false;


  constructor(
    public datasvc:DataService,
    private router: Router,
    private landRecordService: LandRecordService){

  }

  //提供訂閱服務

  rememberMe(){
    this.checkSet = ! this.checkSet;
    if(this.checkSet == true){
      console.log('記住我');
      localStorage.setItem('username',this.myEmail);
      localStorage.setItem('password',this.myPassword);
    }else if(this.checkSet == false){
      console.log('清除');
      // localStorage.clear();
      localStorage.removeItem('username');
      localStorage.removeItem('password');

    }
    console.log('readloaclStorage',localStorage.getItem('username'));
    console.log('readloaclStorage',localStorage.getItem('password'));
  }

  login(){

    this.datasvc.login({
      username : this.myEmail,
      password : this.myPassword
    }).subscribe((re)=>{
      console.log(re);
      if(re.status == 200){
        this.isLogin = true;
        localStorage.setItem('token',re.data)
        console.log('set-token',re.data);
        alert('登入成功')
        this.landRecordService.setLandRecord(this.isLogin)
        this.router.navigate(['/'])
      }
    },(error)=>{
      this.isLogin = false;
      console.log(error);
      alert('登入失敗'+ error.error.message);
      localStorage.clear();
      this.landRecordService.setLandRecord(this.isLogin)
      window.location.reload();
    })
  }


}
