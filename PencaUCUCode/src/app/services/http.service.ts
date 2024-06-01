import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { IMatch, IRegister, ILogin, IRanking, IChampionship, ITeam, IResult } from '../types';

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
    if (error.error instanceof ErrorEvent || error.status) {
      console.log(`Error: ${error.status} ${error.error.message}`);
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }

  RegisterUser(requestBody: IRegister): Observable<any> {
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

  LoginUser(requestBody: ILogin): Observable<any> {
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

  LoginAdmin(requestBody: ILogin): Observable<any> {
    return this.http.post<any>('http://localhost:3001/session/loginAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.token) {
          return response.token;
        }
        return null;
      })
    );
  }

  GetMatches(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getMatches', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.matches) {
          const matches: IMatch[] = response.matches;
          return matches;
        }
        return null;
      })
    );
  }

  PostMatch(requestBody: IMatch): Observable<any> {
    return this.http.post<any>('http://localhost:3001/game/postMatch', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetRanking(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getRanking', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.ranking) {
          const ranking: IRanking = response.ranking;
          return ranking;
        }
        return null;
      })
    );
  }

  GetChampionshipsAdmin(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getChampionshipsAdmin', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.championships) {
          const championships: IChampionship[] = response.championships;
          return championships;
        }
        return null;
      })
    );
  }

  PostChampionshipAdmin(requestBody: IChampionship): Observable<any> {
    return this.http.post<any>('http://localhost:3001/game/postChampionshipAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetChampionshipUser(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getChampionshipUser', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.championship) {
          const championship: IChampionship = response.championship;
          return championship;
        }
        return null;
      })
    );
  }

  GetTeamsAdmin(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getTeamAdmin', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.teams) {
          const teams: ITeam[] = response.teams;
          return teams;
        }
        return null;
      })
    );
  }

  PostTeamAdmin(requestBody: ITeam): Observable<any> {
    return this.http.post<any>('http://localhost:3001/game/postTeamAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetMatchesAdmin(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getMatchAdmin', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.matches) {
          const matches: IMatch[] = response.matches;
          return matches;
        }
        return null;
      })
    );
  }

  PostMatchAdmin(requestBody: IMatch): Observable<any> {
    return this.http.post<any>('http://localhost:3001/game/postMatchAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetResultsAdmin(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getResultAdmin', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.results) {
          const results: IResult[] = response.results;
          return results;
        }
        return null;
      })
    );
  }

  PostResultAdmin(requestBody: IResult): Observable<any> {
    return this.http.post<any>('http://localhost:3001/game/postResultAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
