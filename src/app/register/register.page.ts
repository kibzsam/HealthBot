import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import{AlertController} from '@ionic/angular'
import {Router} from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  email: string = ""
  password: string = ""
  cpassword: string = ""

  constructor(
    public afAuth: AngularFireAuth,
    public alert:AlertController,
    public route:Router
    ) { }

  ngOnInit() {
  }

  async Register() {
    const { email, password, cpassword } = this
    if(password !== cpassword){
      this.showAlert("Error!", "Passwords don't match try again!!")
      return console.error("Password don't match")
    }
    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      console.log(res)
      this.showAlert("Success!","Welcome Aboard")
      this.route.navigate(['/tabs'])
    }
    catch(error){
      console.dir(error)
      this.showAlert("Error!",error.message)

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
