import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //icon
  readonly faUser = faUser;
  readonly faKey = faKey;

  //使用者input
  protected username = localStorage.getItem('username');
  protected myEmail = this.username ? this.username : "";
  // myEmail = "admin";

  ////密碼input
  // password = localStorage.getItem('password');
  protected myPassword = "";
  // myPassword = "123123";

  //記住我checkbox狀態
  protected checkSet:boolean = false;
  //登入狀態
  private isLogin:boolean = false;

  protected regisUser: any;
  protected RegisPsd:any;




  constructor(
    public datasvc:DataService,
    private router: Router,
    private modalService: NgbModal
    ){

  }



  protected rememberMe(){
    this.checkSet = ! this.checkSet;
    if(this.checkSet == true){
      console.log('記住我');
      localStorage.setItem('username',this.myEmail);
      // localStorage.setItem('password',this.myPassword);
    }else if(this.checkSet == false){
      console.log('清除');
      // localStorage.clear();
      localStorage.removeItem('username');
      // localStorage.removeItem('password');

    }
    console.log('readloaclStorage',localStorage.getItem('username'));
    // console.log('readloaclStorage',localStorage.getItem('password'));
  }

  protected login(){

    this.datasvc.login({
      username : this.myEmail,
      password : this.myPassword
    }).subscribe((re)=>{

      console.log(re);

      if(re.status == 200){
        this.isLogin = true;


        if(this.myEmail == 'admin'){
          localStorage.setItem('token',re.data);
          localStorage.setItem('name',this.myEmail);
          localStorage.setItem('adminToken',re.data);
        }

        localStorage.setItem('token',re.data);
        alert('登入成功')

        //儲存登入狀態
        this.datasvc.setUserStatus(this.isLogin)
        this.router.navigate(['/'])
      }
    },(error)=>{
      console.log(error);
      alert('請重新登入或註冊帳號');
      // window.location.reload();
    })
  }

  protected open(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' })
	}


  protected register(){
    this.datasvc.register(this.regisUser,this.RegisPsd).subscribe(()=>{
      alert('註冊成功');
      this.regisUser=''
      this.RegisPsd=''
      this.modalService.dismissAll();//註冊成功關閉視窗
    },(error)=>{
      this.regisUser=''
      this.RegisPsd=''
      alert('已有帳號, 請重新註冊');
    })

  }



}
