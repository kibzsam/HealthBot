import { BookPage } from './../book/book.page';
import { NavController, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase,AngularFireList } from "@angular/fire/database";
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
  listsRef: AngularFireList<any>;
  public lists: Observable<any[]>;

  constructor(private nav: NavController,
    private modalController:ModalController,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    ) {
      
    }
  
  async openModal(){
    const modal = await this.modalController.create({
      component : BookPage
    });
    modal.present();
  }

  // retrieving all Doctors inform of a list
  
  ngOnInit() {
    this.listsRef = this.db.list('users',ref=>ref.orderByChild('role').equalTo('Doctor'));
    this.lists=this.listsRef.valueChanges();
    this.lists.subscribe(res=>console.log(res));
  
  }

  


}
