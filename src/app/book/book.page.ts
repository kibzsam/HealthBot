import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.page.html',
  styleUrls: ['./book.page.scss'],
})
export class BookPage implements OnInit {

  constructor(private modalController:ModalController) { }
  closeModal(){
    this.modalController.dismiss()
  }
  ngOnInit() {
  }
  

}
