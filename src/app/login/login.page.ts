import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore'
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
  username: string=""

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public user:UserService,
    public afstore:AngularFirestore
    ) { }

  ngOnInit() {
  }
async login(){
  const{ email,password,username}=this
  try{
    const res = await this.afAuth.auth.signInWithEmailAndPassword(email,password)
    var user = this.afAuth.auth.currentUser;
    var docRef = this.afstore.collection("users").doc(user.uid);
    docRef.get().toPromise().then((doc)=> {
    var data=doc.data();
    var role=data.role;
        if (role == "Doctor") {
            this.showAlert("Success!","Welcome")
            this.router.navigate(['/doctor'])
            console.log("The Role:", role);
        } else {
            // doc.data() will be undefined in this case
            this.showAlert("Success!","Welcome")
            this.router.navigate(['/tabs'])
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    if(res.user ){
      this.user.setUser({
        username,
        uid: res.user.uid
      })
      
      //this.router.navigate(['/tabs'])
    } 
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
