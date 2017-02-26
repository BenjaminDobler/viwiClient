import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {UrlParts, ViwiUrl} from "./urlparts";
/**
 * Created by benjamindobler on 21.01.17.
 */


@Injectable()
export class ViwiWebSocket {

  private ws: WebSocket;
  private messages: BehaviorSubject<any>;
  private connectPromise: Promise<WebSocket>;

  constructor() {
    this.messages = new BehaviorSubject<any>({});
    this.connect();
  }


  public connect() {

    this.connectPromise = new Promise((resolve, reject) => {

      this.ws = new WebSocket('ws://0.0.0.0:1337');
      this.ws.addEventListener('open', (event) => {
        console.log("On Open ", event);
        resolve(this.ws);
      });

      this.ws.addEventListener('message', (event) => {
        console.log("On Message", event);
        this.messages.next(JSON.parse(event.data));
      });

      this.ws.addEventListener('error', (errorEvent) => {
        console.log("On Message", event);
        reject(event);
      });

    });

  }


  public subscribe(destination): Observable<any> {
    this.connectPromise.then(() => {
      this.ws.send(JSON.stringify({type: 'subscribe', event: destination}));
    });

    return this.messages
      .filter(data => data.type === 'data')
      .filter((message) =>{
        if (message && message.event) {
          let event: string = message.event;
          // There are some inconsistencies in the event property sometime it has a # instead of an / at the end!!!


          while(event.endsWith('/') || event.endsWith('#')) {
            event = event.substr(0, event.length - 1);
          }

          while(destination.endsWith('/') || destination.endsWith('/')) {
            destination = destination.substr(0, destination.length - 1);
          }


          console.log(destination);
          console.log(event)
          console.log("event.endsWith(destination) ", event.endsWith(destination))
          return event.endsWith(destination);
        }
        return false;

      })
      .map(message => message.data);
  }

  public unsubscribe(destination) {
    this.ws.send(JSON.stringify({type: 'unsubscribe', event: destination}));
  }


}
