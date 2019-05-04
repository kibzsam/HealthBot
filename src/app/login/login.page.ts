import { UserService } from "./../user.service";
import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from "@angular/fire/database";
import { auth } from "firebase/app";
import { AlertController,ToastController } from "@ionic/angular";
import { Router } from "@angular/router";
@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string = "";
  password: string = "";
  username: string = "";

  constructor(
    public afAuth: AngularFireAuth,
    public alert: AlertController,
    public router: Router,
    public user: UserService,
    public afstore: AngularFirestore,
    public db: AngularFireDatabase,
    public toastCtrl:ToastController
  ) {}

  ngOnInit() {}
  async login() {
    const { email, password, username } = this;
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(
        email,
        password
      );
      // This code is to compare if a user has authenticated as a Doctor or patient so as to direct them in their respective
      //Pages.
      var userId = await this.afAuth.auth.currentUser.uid;
      return this.db.database
        .ref("/users/" + userId)
        .once("value")
        .then((snapshot)=>{
          var userRole = snapshot.val() && snapshot.val().role;
          var username = snapshot.val() && snapshot.val().username;
          if (userRole == "Doctor") {
            this.showAlert(
              "Success!",
              "Welcome" + " Doctor" + " " 
            );
            this.router.navigate(["/doctor"]);
            console.log("The Role:", userRole);
          } else {
            this.showToast("Welcome");
            this.router.navigate(["/tabs"]);
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      /*var docRef = this.afstore.collection("users").doc(user);
    return docRef.get().toPromise().then((doc)=> {
    var data=doc.data();
    console.log(data)
    var urole=data.role;
        if (urole == "Doctor") {
            this.showAlert("Success!","Welcome"+" Doctor"+" "+data.username)
            this.router.navigate(['/doctor'])
            console.log("The Role:", urole);
        } else {
            // doc.data() will be undefined in this case
            this.showAlert("Success!","Welcome"+" "+data.username)
            this.router.navigate(['/tabs'])
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });*/
      if (res.user) {
        this.user.setUser({
          username,
          uid: res.user.uid
        });

        //this.router.navigate(['/tabs'])
      }
    } catch (error) {
      console.dir(error);
      this.showAlert("Error!", error.message);

      if (error.code === "auth/user-not-found") {
        this.showAlert("Error!", "User not found");
        console.log("User not found");
      }
    }
  }
  async showAlert(header: string, message: string) {
    const alert = await this.alert.create({
      header,
      message,
      buttons: ["OK"]
    });
    await alert.present();
  }
  async showToast(message){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:5000,
      position:'top'
    });
    await toast.present();
  }
}
