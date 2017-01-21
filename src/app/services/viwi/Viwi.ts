import {ViwiEndpoint} from "./ViwiEndpoint";
import {Http} from "@angular/http";
import {ViwiWebSocket} from "./ViwiWebSocket";
import {Inject, Injectable} from "@angular/core";
/**
 * Created by benjamindobler on 21.01.17.
 */


@Injectable()
export class Viwi {



  constructor(private http:Http, @Inject(ViwiWebSocket)private ws:ViwiWebSocket) {

  }


  public createEndpoint(target:string, initialData:any = {}):ViwiEndpoint {
    const endpoint:ViwiEndpoint = new ViwiEndpoint(target, this.http, this.ws, initialData);
    return endpoint;
  }



}
