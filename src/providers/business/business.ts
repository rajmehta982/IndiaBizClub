import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Business } from '../../shared/business';
import { Observable, of } from 'rxjs';
import { baseURL } from '../../shared/baseurl';
import { map , catchError} from 'rxjs/operators';
import { ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';


/*
  Generated class for the BusinessProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BusinessProvider {

  constructor(public http: HttpClient, private processHTTPMsgService: ProcessHttpmsgProvider) {
  }
  getBusinesses(): Observable<Business[]>{
    return this.http.get<Business[]>(baseURL + 'businesses')
    .pipe(catchError(this.processHTTPMsgService.handleError));

  }


}
