/**
 * Created by benjamindobler on 21.01.17.
 */
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {ViwiWebSocket} from "./ViwiWebSocket";
import {BehaviorSubject, ReplaySubject} from "rxjs";


export class ViwiEndpoint<T> extends ReplaySubject<T> {

  public subscribed: boolean = false;
  public serviceName: string;
  public resourceName: string;
  public resourceId: string;
  private
  URIREGEX = /^\/(\w+)\/(\w+)\/([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fAF]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})?#?\w*\??([\w$=&\(\)\:\,\;\-\+]*)?$/; //Group1: Servicename, Group2: Resourcename, Group3: element id, Group4: queryparameter list


  private host: string = 'http://localhost:3000';


  constructor(private destination: string, private http: Http, private ws: ViwiWebSocket, autoGetData: boolean = true, autoSubscribe: boolean = true) {
    super();
    this.destination = this.destination;
    this.getDestinationParts();
    if (autoGetData) {
      this.get();
    }
    if (autoSubscribe) {
      this.listen();
    }
  }

  public get() {
    const request$ = this.http.get(`${this.host}${this.destination}`).map((resp: Response) => resp.json().data).subscribe((data: any) => {
      console.log('Next ', data)
      this.next(data);
    });
  }

  public post(data: any) {
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

  public update(data: any) {
    let body: string = JSON.stringify(data);
    let headers: Headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({headers: headers});
    this.http.post(`${this.host}${this.destination}`, body, options).subscribe();
  }


  getDestinationParts() {
    const captureGroups = this.destination.match(this.URIREGEX);
    this.serviceName = captureGroups[1];
    this.resourceName = captureGroups[2];
    this.resourceId = captureGroups[3];
  }


}
