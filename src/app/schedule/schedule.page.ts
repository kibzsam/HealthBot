import { BookPage } from './../book/book.page';
import { NavController, ModalController,LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase,AngularFireList } from "@angular/fire/database";
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  listsRef: AngularFireList<any>;
  lists: Observable<any>;
  list:any;

  constructor(private nav: NavController,
    private modalController:ModalController,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private callNumber: CallNumber,
    //private loadingCtrl:LoadingController
    ) {}

    ngOnInit() {
      // retrieving all Doctors in form of a list
      this.lists = this.db.list('users',ref=>ref.orderByChild('role').equalTo('Doctor'))
       .snapshotChanges()
       .pipe(map((lists:any[])=>lists.map(list=>({id:list.key,...list.payload.val()}))));
       
    }
    
    //Function to call an Ambulance
    async dialNumber():Promise<any>{
        await this.callNumber.callNumber("999", true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
      }
      //function to call doctor
      async callDoctor(list):Promise<any>{
        await this.callNumber.callNumber(String(list.phone), true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
        console.log(list.phone);
      }
// opens modal for creating a schedule and pass the ID of doctor in the modal
  async openModal(list){
    const modal = await this.modalController.create({
      component : BookPage,
      componentProps:{
        id:list.id
      }
    });
    modal.present();
    console.log(list.id)
  }
 

  
  
  

  


}
