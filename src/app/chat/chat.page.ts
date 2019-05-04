import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
import { LoadingController} from '@ionic/angular';

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"]
})
export class ChatPage implements OnInit {
  constructor(
    private iab: InAppBrowser,
    private loadingCtrl:LoadingController
    ) {
      //this.dismissLoading();
    }

  ngOnInit() {
    //this.presentLoadingDefault();
    
  }
  async presentLoadingDefault() {
     var load = await this.loadingCtrl.create({
      message:'Please wait...'
    });
    await load.present();
  }
  dismissLoading(){
    this.loadingCtrl.dismiss();
}


}
