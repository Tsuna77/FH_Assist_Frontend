import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { isDevMode } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Config } from '../config/config.service';



export interface Login {
  result: string;
}

@Injectable()
export class loginService {
  apiUrl = '';
  connectUrl = '/connect';
  post_data = {};


  constructor(private http: HttpClient) { }

  googleLogin(Config: Config){
    this.apiUrl = Config.apiUrl;
  }

  postLogin(token: string) {
    isDevMode && console.debug("Envoie d'une demande de connexion à "+this.apiUrl+this.connectUrl);
    this.post_data['token'] = token;
    return this.http.post<Login>(this.apiUrl+this.connectUrl,this.post_data)
      .pipe(
        retry(0), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  postLoginResponse(): Observable<HttpResponse<Login>> {
    return this.http.get<Login>(
      this.apiUrl, { observe: 'response' });
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}

