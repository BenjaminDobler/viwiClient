import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
/**
 * Created by benjamindobler on 21.01.17.
 */


@Injectable()
export class ViwiWebSocket {

  private ws: WebSocket;
  private messages: BehaviorSubject<any>;
  private connectPromise:Promise<WebSocket>;

  constructor() {
    this.messages = new BehaviorSubject<any>({});
    this.connect();
  }


  public connect() {

    this.connectPromise = new Promise((resolve, reject) => {

      this.ws = new WebSocket('ws://localhost:3000');
      this.ws.addEventListener('open', (event) => {
        console.log("On Open ", event);
        resolve(this.ws);
      });

      this.ws.addEventListener('message', (event) => {
        console.log("On Message", event);
      });

    });


  }


  public subscribe(destination): Observable<any> {
    this.connectPromise.then(()=>{
      this.ws.send(JSON.stringify({type: 'subscribe', event: destination}));
    });
    return this.messages.filter(x => x.event === destination);

  }

  public unsubscribe(destination) {
    this.ws.send(JSON.stringify({type: 'unsubscribe', event: destination}));
  }


}
