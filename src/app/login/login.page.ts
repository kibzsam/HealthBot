import { Component, OnInit } from '@angular/core';
import { constants } from 'fs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string =""
  password: string=""

  constructor() { }

  ngOnInit() {
  }
login(){
  const{ email,password}=this
}

}
