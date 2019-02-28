import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import{AlertController} from '@ionic/angular'
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email: string =""
  password: string=""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public route: Router
    ) { }

  ngOnInit() {
  }
async login(){
  const{ email,password}=this
  try{
    const res = await this.afAuth.auth.signInWithEmailAndPassword(email,password)
    this.showAlert("Success!","Welcome")
    this.route.navigate(['/tabs'])
  } catch(error){
    console.dir(error)
    this.showAlert("Error!",error.message)

    if(error.code === "auth/user-not-found"){
      this.showAlert("Error!","User not found")
      console.log("User not found")
    }
  }
}
async showAlert(header:string,message:string){
  const alert = await this.alert.create({
    header,
    message,
    buttons:["OK"]
  })
  await alert.present()
}

}
