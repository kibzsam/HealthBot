import { Component, OnInit, ViewChild } from '@angular/core';
import { IonTabs } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import {Router} from '@angular/router'
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  @ViewChild('tabs') tabs:IonTabs

  constructor(
    public afAuth: AngularFireAuth,
    public route:Router,
    public nav:NavController
    ) { }

  ngOnInit() {
    this.tabs.select('chat')
  }
  logout() {
    this.afAuth.auth.signOut();
    this.route.navigate(['/login']);
  }
}
