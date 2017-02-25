import {ViwiEndpoint} from "./ViwiEndpoint";
import {Http} from "@angular/http";
import {ViwiWebSocket} from "./ViwiWebSocket";
import {Inject, Injectable} from "@angular/core";
/**
 * Created by benjamindobler on 21.01.17.
 */


@Injectable()
export class Viwi {


  constructor(private http: Http, @Inject(ViwiWebSocket) private ws: ViwiWebSocket) {

  }


  public createEndpoint(target: string, autoGetData: boolean = true, autoSubscribe: boolean = true): ViwiEndpoint<any> {
    const endpoint: ViwiEndpoint<any> = new ViwiEndpoint(target, this.http, this.ws, autoGetData, autoSubscribe);
    return endpoint;
  }


}
