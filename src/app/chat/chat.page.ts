import { Component, OnInit } from "@angular/core";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.page.html",
  styleUrls: ["./chat.page.scss"]
})
export class ChatPage implements OnInit {
  constructor(private iab: InAppBrowser) {}

  ngOnInit() {
    /** const browser = this.iab.create("https://helthbot.herokuapp.com/",'_self');
    browser.show();
    browser.on("loadstop").subscribe(event => {
      browser.insertCSS({ code: "body{color: red;" });
    });
    browser.close();*/
  }
}
