import { Injectable } from '@angular/core';
import { IGateway } from './igateway';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map'
import { HttpErrorResponse } from "@angular/common/http/src/response";
import { IDepartures } from './idepatures';
import { IHotels } from './ihotels';

@Injectable()
export class ApiDataService {
  private _serviceURL = 'http://infoservice.sunwingdev.local/HotelSearch';

  constructor(private _http: HttpClient) { }

  getGateways(): Observable<IGateway[]>{
    return this._http.post<IGateway[]>(this._serviceURL,{
      "gateway": "Yes",
      "destination": "",
      "hotel": "",
      "lang": ""
    })
    //.do(data=>console.log(data))
    .catch(this.handleError);
  }

  getDepatures(gateway): Observable<IGateway[]>{
    return this._http.post<IGateway[]>(this._serviceURL,{
      "gateway": gateway,
      "destination": "Yes",
      "hotel": "",
      "lang": ""
    })
    //.do(data=>console.log(data))
    .catch(this.handleError);
  }

  getHotelList(depart):Observable<IHotels[]>{
    return this._http.post<IHotels[]>(this._serviceURL,{
      "gateway": "",
      "destination": depart,
      "hotel": "Yes",
      "lang": ""
    })
    //.do(data=>console.log(data))
    .catch(this.handleError);
  }

  private handleError(err: HttpErrorResponse){
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if(err.error instanceof Error){
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occured: ${err.error.message}`;
    }
    else{
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return Observable.throw(errorMessage);
  }
}