import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router'
import { NavController, ModalController } from '@ionic/angular';
import { DoctorprofilePage } from '../doctorprofile/doctorprofile.page';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.page.html',
  styleUrls: ['./doctor.page.scss'],
})
export class DoctorPage implements OnInit {

  constructor(
    public afAuth:AngularFireAuth,
    private modalController:ModalController,
    public route:Router,
    public nav:NavController
    ) { }

  async addProfile(){
    const doc = await this.modalController.create({
      component : DoctorprofilePage
    });
    doc.present();
  }
  
  ngOnInit() {
  }
  logout() {
    this.afAuth.auth.signOut();
    this.route.navigate(['/login']);
  }

}
