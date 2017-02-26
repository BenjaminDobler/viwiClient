/**
 * Created by benjamindobler on 21.01.17.
 */
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {ViwiWebSocket} from "./ViwiWebSocket";
import {BehaviorSubject, ReplaySubject} from "rxjs";


export class ViwiEndpoint<T> extends ReplaySubject<T> {

  public subscribed: boolean = false;
  public data: any = {};


  //private host: string = 'http://localhost:3000';
  private host: string = 'http://0.0.0.0:1337/api/v1';


  constructor(private destination: string, private http: Http, private ws: ViwiWebSocket, autoGetData: boolean = true, autoSubscribe: boolean = true) {
    super();
    this.destination = this.destination;
    if (autoGetData) {
      this.getElement();
    }
    if (autoSubscribe) {
      this.listen();
    }

    this.subscribe(data => this.data = data);
  }

  public getElement() {
    this.http.get(`${this.host}${this.destination}`).map((resp: Response) => resp.json().data).subscribe(data => this.next(data));
  }

  public createElement(data: any) {
    let body: string = JSON.stringify(data);
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    this.http.post(`${this.host}${this.destination}`, body, options).subscribe();
  }

  public listen() {
    this.ws.subscribe(this.destination).subscribe(data => this.next(data));
  }

  public unlisten() {
    this.ws.unsubscribe(this.destination);
  }

  public updateElement(data: any) {
    let body: string = JSON.stringify(data);
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    this.http.post(`${this.host}${this.destination}`, body, options).subscribe();
  }




}
