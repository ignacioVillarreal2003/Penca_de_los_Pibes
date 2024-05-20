import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    if (error.error instanceof ErrorEvent) {
      console.log(`Error: ${error.status} ${error.error.message}`);
      errorMessage = error.error.message;
    } else if (error.status) {
      console.log(`Error: ${error.status} ${error.error.message}`);
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }
/*

  Register(username: string, password: string): Observable<any> {
    const requestBody: IUser = {
      username: username,
      password: password
    };
    return this.http.post<any>('http://localhost:3001/session/registerUser', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.token) {
          return response.token;
        }
        return null;
      })
    );
  }

  Login(username: string, password: string): Observable<any> {
    const requestBody: IUser = {
      username: username,
      password: password
    };
    return this.http.post<any>('http://localhost:3001/session/loginUser', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.token) {
          return response.token;
        }
        return null;
      })
    );
  }

  ChangePassword(username: string, password: string, newPassword: string): Observable<any> {
    const requestBody = {
      username: username,
      password: password,
      newPassword: newPassword
    };
    return this.http.post<any>('http://localhost:3001/session/changePassword', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetMatches(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getMatches', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.matches) {
          const matches = response.matches;
          return matches;
        }
        return null;
      })
    );
  }

  Post(obj: any): Observable<any> {
    const requestBody: any = obj;
    return this.http.post<any>('http://localhost:3001/game/postMatchResult', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }*/
}
