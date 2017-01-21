import { Component } from '@angular/core';
import {Observable} from "rxjs";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {map} from 'rxjs/operator/map';
import 'rxjs/Rx';
import {ViwiEndpoint} from "./services/viwi/ViwiEndpoint";
import {Viwi} from "./services/viwi/Viwi";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  public renderers:Observable<any>;
  private ws:WebSocket;

  public renderersEndpoint:ViwiEndpoint;
  private rendererEndpoints:Array<ViwiEndpoint> = [];


  constructor(public viwi:Viwi, public http:Http) {
    this.renderersEndpoint = viwi.createEndpoint('/media/renderers/');
  }


  toggleRendererState(renderer:any) {

    let data = Object.assign({}, renderer);
    if (data.state === 'idle') {
      data.state = 'play';
    } else {
      data.state = 'pause';
    }

    let body: string = JSON.stringify(data);
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    this.http.post(`http://localhost:3000/media/renderers/${renderer.id}`, body, options).subscribe();
  }

  subscribe(renderer) {
    this.ws.send(JSON.stringify({type:'subscribe', event:`/media/renderers/${renderer.id}`}))
  }


}
