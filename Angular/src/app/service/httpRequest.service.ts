import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, throwError } from 'rxjs';
import { catchError, filter, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HTTPRequestService {

  constructor(
    private http: HttpClient,
  ) { }

  /**
 * call HTTP 主要方法
 * @param method http method
 * @param requestParams request body
 * @param api api url
 */
  request(
    method: string,
    requestParams: any,
    api: string
  ): Observable<any> {
    const httpHeaders = this.getHTTPHeaders();
    const url = api;

    switch (method) {
      case HTTP_METHOD.GET:
        return this.http
          .get<any>(url, { headers: httpHeaders, params: requestParams })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
      case HTTP_METHOD.DELETE:
        let deleteObservable = new Observable((subscriber) => {
          subscriber.next({});
          subscriber.complete();
        });
        this.http
          .delete<any>(url, { headers: httpHeaders, params: requestParams })
          .subscribe({
            next: (data) => {
              deleteObservable.subscribe();
            },
            error: this.handleError,
          });
        return deleteObservable;
      case HTTP_METHOD.POST:
        return this.http
          .post<any>(url, requestParams, { headers: httpHeaders })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
      case HTTP_METHOD.PATCH:
        return this.http
          .patch<any>(url, requestParams, { headers: httpHeaders })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
      case HTTP_METHOD.PUT:
        return this.http
          .put<any>(url, requestParams, { headers: httpHeaders })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
      default:
        return this.http
          .get<any>(url, { headers: httpHeaders, params: requestParams })
          .pipe(filter(this.handleResponse), catchError(this.handleError));
    }
  }

  private getHTTPHeaders(): HttpHeaders {
    const result = new HttpHeaders({
      // 'Content-Type': 'application/json',
      // Authorization: 'Bearer ' + localStorage.getItem(COMMON.TOKEN2)
    });

    return result;
  }

  private handleResponse = (response: any): boolean => {
    let responseSuccess = true;

    if (response.error) {
      responseSuccess = false;
    }

    return responseSuccess;
  };


  /**
   * for Status Code 200以外 (http error)
   * @param error
   */
  private handleError = (error: HttpErrorResponse) => {
    console.log('handleError::', error);

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }

    return throwError('Something bad happened; please try again later.');
  }
}

export const enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  PATCH = 'patch',
  DELETE = 'delete',
}
