import { Injectable, Inject }  from '@angular/core';
import { Http, Response, RequestOptions, Request, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class AppService{

  getHeader = () => {
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    return headers;
  }

  constructor(private http: Http){}
  pullStackData(url, method = "GET"){
    let reqObj = {
      method : method,
      url: url
    };

    return this.http.request(new Request(reqObj))
    .map(res => res.json());
  }
}
