import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-doctorprofile',
  templateUrl: './doctorprofile.page.html',
  styleUrls: ['./doctorprofile.page.scss'],
})
export class DoctorprofilePage implements OnInit {

  constructor(private modalController:ModalController,) { }

  closeModal(){
    this.modalController.dismiss()
  }

  ngOnInit() {
  }

}
