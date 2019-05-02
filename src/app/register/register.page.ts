import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore'
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { auth } from 'firebase/app';
import{AlertController} from '@ionic/angular'
import {Router} from '@angular/router'
import { FormGroup, FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})


export class RegisterPage implements OnInit {
  email: string = ""
  password: string = ""
  cpassword: string = ""
  username: string=""
  phone: string =""
  role: string= ""
  myForm:FormGroup

  constructor(
    public afAuth: AngularFireAuth,
    public alert:AlertController,
    public afstore:AngularFirestore,
    public db:AngularFireDatabase,
    public route:Router,
    public user:UserService,
    ) { 
      /*this.myForm =new FormGroup({
        username: new FormControl('',[Validators.required,Validators.maxLength(5)]),
        phone: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
        role: new FormControl('',[Validators.required]),
        email: new FormControl('',Validators.pattern(".+\@.+\..+")),
        
      })*/
    }

  ngOnInit() {
  }

  async Register() {
    const { email,username,phone,role,password, cpassword } = this
    if(password !== cpassword){
      this.showAlert("Error!", "Passwords don't match try again!!")
      return console.error("Password don't match")
    }

    try{
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email,password)
      var user = this.afAuth.auth.currentUser.uid;
      if(phone.length < 10 && phone.length > 10){
        this.showAlert("Error!", "Your Phone Number should be of 10 digits")
        console.log(length)
        return console.error("Phone number is not correct")
      }
      this.db.database.ref('users/' + user).set({
        username: username,
        phone: phone,
        role:role,
      });
      /*this.afstore.collection("users").doc(user.uid).set({
        username: username,
        phone: phone,
        role:role,
       });*/
      console.log(res)
      this.showAlert("Success!","Please Login ")
      this.route.navigate(['/login'])
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
