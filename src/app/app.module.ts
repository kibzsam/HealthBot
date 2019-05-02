import { DoctorprofilePageModule } from './doctorprofile/doctorprofile.module';
import { BookPageModule } from './book/book.module';
import { UserService } from './user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import firebaseConfig from './firebase'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import {AngularFireAuthModule} from '@angular/fire/auth';
import { DoctorPageModule } from './doctor/doctor.module';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CallNumber } from '@ionic-native/call-number/ngx';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    NgCalendarModule, 
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BookPageModule,
    DoctorPageModule,
    DoctorprofilePageModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService,
    CallNumber
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
