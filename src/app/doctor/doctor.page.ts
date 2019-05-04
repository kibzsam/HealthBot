import { take } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase,AngularFireObject} from "@angular/fire/database";
import {Router} from '@angular/router'
import { NavController, ModalController,ToastController } from '@ionic/angular';
import{Profile} from '../../models/docprofile'
import { Observable} from 'rxjs';
import { DoctorprofilePage } from '../doctorprofile/doctorprofile.page';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  profile= {} as Profile;
  profileData:Observable<any>
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
// function to Navigate to doctors profile page where calendar belongs
  docProfile(){
    this.route.navigate(['/doctorprofile']);

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
    })
    
  }
  logout() {
    this.afAuth.auth.signOut();
    this.route.navigate(['/login']);
  }

}
