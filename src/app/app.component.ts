import {Component} from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/Rx';
import {ViwiEndpoint} from "./services/viwi/ViwiEndpoint";
import {Viwi} from "./services/viwi/Viwi";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public renderersEndpoint: ViwiEndpoint;

  constructor(public viwi: Viwi, public http: Http) {
    this.renderersEndpoint = this.viwi.createEndpoint('/media/renderers/');
  }

  // @Note will not trigger subscription update cause it` not yet implemented server side!
  toggleRendererState(renderer: any) {
    this.viwi.createEndpoint(`/media/renderers/${renderer.id}`, false, false).post({state: (renderer.state != 'play') ? 'play' : 'pause'});

  }


}
