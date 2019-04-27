import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireDatabase } from "@angular/fire/database";
import {Router} from '@angular/router'
import { NavController, ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DoctorprofilePage } from '../doctorprofile/doctorprofile.page';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {
  public details: Observable<any[]>;
  constructor(
    public afAuth:AngularFireAuth,
    private modalController:ModalController,
    public route:Router,
    public nav:NavController,
    public afstore: AngularFirestore,
    public db: AngularFireDatabase
    ) { }
// Getting Doctors details



// function to Navigate to doctors profile page where calendar belongs
  docProfile(){
    this.route.navigate(['/doctorprofile']);

  }
  
  ngOnInit() {
    var userId = this.afAuth.auth.currentUser.uid;
    return this.db.database
        .ref("/users/" + userId)
        .once("value")
        .then((snapshot)=>{
          this.details = snapshot.val()&& snapshot.val().username;
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
  }
  logout() {
    this.afAuth.auth.signOut();
    this.route.navigate(['/login']);
  }

}
