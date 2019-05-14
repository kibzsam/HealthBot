import { ModalController } from '@ionic/angular';
import { Component, OnInit, Input } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar/calendar';
import { ViewChild , Inject, LOCALE_ID } from '@angular/core';
import { AlertController,ToastController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireDatabase } from "@angular/fire/database";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {
  @Input() id: any;
  userId= this.afAuth.auth.currentUser.uid;
  event = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    status:'vacant',
    allDay: false,
    userid:this.userId,
    docid:this.id,
  };
 
  minDate : string = new Date().toISOString();

 
  eventSource = [];
  viewTitle;
 
  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
 
  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 
  constructor(
    private alertCtrl: AlertController, 
    @Inject(LOCALE_ID) private locale: string,
    public afAuth: AngularFireAuth,
    public db: AngularFireDatabase,
    public modalCtrl: ModalController,
    public toastCtrl: ToastController
    ) { }
  closeModal(){
    this.modalCtrl.dismiss()
  }
  ngOnInit() {
    this.resetEvent();
  }
 
  resetEvent() {
    this.event = {
      title: '',
      desc: '',
      status:'vacant',
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString(),
      allDay: false,
      userid:this.userId,
      docid:this.id,
    };
  }
 
  // Create the right event format and reload source
  addEvent() {
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime).toString(),
      endTime: new Date(this.event.endTime).toString(),
      allDay: this.event.allDay,
      desc: this.event.desc,
      status: this.event.status,
      userid:this.event.userid,
      docid:this.event.docid
    }
    
 
   /*if (eventCopy.allDay) {
      let start = eventCopy.startTime;
      let end = eventCopy.endTime;
 
      eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate())).toUTCString();
      eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1)).toUTCString();
    
   }*/
    this.eventSource.push(eventCopy);
    this.afAuth.authState.pipe(take(1)).subscribe(data=>{
      this.db.database.ref("appointments").push(this.eventSource)
      this.showToast("You have sucessfully booked an appointment.!.")
    })
    
    this.myCal.loadEvents();
    this.resetEvent();
  }
  next() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }
   
  back() {
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }
   
  // Change between month/week/day
  changeMode(mode) {
    this.calendar.mode = mode;
  }
   
  // Focus today
  today() {
    this.calendar.currentDate = new Date();
  }
   
  // Selected date reange and hence title changed
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
   
  // Calendar event was clicked
  async onEventSelected(event) {
    // Use Angular date pipe for conversion
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + start + '<br><br>To: ' + end,
      buttons: ['OK']
    });
    alert.present();
  }
   
  // Time slot was clicked
  onTimeSelected(ev) {
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }
  //Toast alert function
  async showToast(message){
    const toast = await this.toastCtrl.create({
      message:message,
      duration:20000,
      position:'top',
      color:'success',
      translucent:true,
      animated:true
    });
    await toast.present();
  }
}
/*@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.page.html',
  styleUrls: ['./doctorprofile.page.scss'],
})*/