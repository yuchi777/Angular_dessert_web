import { Component } from '@angular/core';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { DataService } from '../../data.service';

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
  checkSet = false;

  constructor(public datasvc:DataService){

  }

  rememberMe(){
    this.checkSet = ! this.checkSet;
    if(this.checkSet == true){
      console.log('記住我');
      localStorage.setItem('username',this.myEmail);
      localStorage.setItem('password',this.myPassword);
    }else if(this.checkSet == false){
      console.log('清除');
      localStorage.clear();
      localStorage.removeItem('username');
      localStorage.removeItem('password');

    }
    console.log('readloaclStorage',localStorage.getItem('username'));
    console.log('readloaclStorage',localStorage.getItem('password'));
  }




}
