import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase,AngularFireObject,AngularFireList} from "@angular/fire/database";
import {Router} from '@angular/router'
import { NavController, ModalController,ToastController } from '@ionic/angular';
import{Profile} from '../../models/userprofile'
import { Observable} from 'rxjs';
import { take } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profile= {} as Profile;
  profileData:Observable<any>
  listsRef: AngularFireList<any>;
  lists: Observable<any>;
  list:any;
  message:string;
  constructor(
    public afAuth:AngularFireAuth,
    private modalController:ModalController,
    private toastCtrl:ToastController,
    public route:Router,
    public nav:NavController,
    public afstore: AngularFirestore,
    public db: AngularFireDatabase,
  
    ) { }

// Function for show Toast
async showToast(message){
  const toast = await this.toastCtrl.create({
    message:message,
    duration:5000,
    position:'top'
  });
  await toast.present();
}
  // function to add type,location details of a doctor
  createProfile(){
    this.afAuth.authState.pipe(take(1)).subscribe(auth=>{
      this.db.database.ref("/users/"+auth.uid).update(this.profile);
      this.showToast("Profile successfully added");
    })

  }

  ngOnInit() {
    // Getting Doctors details
    this.afAuth.authState.pipe(take(1)).subscribe(data=>{
      if(data && data.email && data.uid){
         this.showToast("Welcome to HealthBot"+'  '+data.email);
         this.profileData = this.db.object("/users/"+data.uid).valueChanges();
         
         console.log(this.profileData);
      }
      else{
        this.showToast("Could not find this user");
        console.log("cannot find data")
      }
      //retrieving all appointments booked by the user
      this.lists = this.db.list('appointments',ref=>ref.orderByChild('userid').equalTo(data.uid))
      .snapshotChanges()
      .pipe(map((lists:any[])=>lists.map(list=>({key:list.key,...list.payload.val()}))));
      
    })
    
    
  }
  

}

