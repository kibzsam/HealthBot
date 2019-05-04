import { BookPage } from './../book/book.page';
import { NavController, ModalController,LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase,AngularFireList } from "@angular/fire/database";
import { CallNumber } from '@ionic-native/call-number/ngx';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  listsRef: AngularFireList<any>;
  public lists: Observable<any>;
  list:any;

  constructor(private nav: NavController,
    private modalController:ModalController,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private callNumber: CallNumber,
    //private loadingCtrl:LoadingController
    ) {}

    ngOnInit() {
      // retrieving all Doctors inform of a list
      this.listsRef = this.db.list('users',ref=>ref.orderByChild('role').equalTo('Doctor'));
      this.lists=this.listsRef.valueChanges();
      this.lists.subscribe(res=>console.log(res));
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

  async openModal(list){
    const modal = await this.modalController.create({
      component : BookPage,
      componentProps:{
        name:list.username
      }
    });
    modal.present();
    console.log(list)
  }
 

  
  
  

  


}
