import {Component} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {ViwiEndpoint} from "./services/viwi/ViwiEndpoint";
import {Viwi} from "./services/viwi/Viwi";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public renderers: ViwiEndpoint<any>;
  public players: any;

  public emails:ViwiEndpoint<any>;

  constructor(public viwi: Viwi, public http: Http) {
    this.renderers = this.viwi.createEndpoint('/media/renderers/');
    this.players = this.renderers.map((d: Array<any>) => {
      return d.map((r: any) => {
        return this.viwi.createEndpoint(`/media/renderers/${r.id}`);
      });
    });

    this.emails = this.viwi.createEndpoint('/addressbook/emails/');

  }

  addEmail(newEmail:any) {
    this.emails.createElement(newEmail);
  }


}
