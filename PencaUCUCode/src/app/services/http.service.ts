import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { IMatch, IRegister, ILogin, IRanking, IChampionship, ITeam, IChampionshipAdmin, IMatchAdmin, IResultAdmin, ITeamAdmin } from '../types';

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

  /* Ingreso end points */

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

  /* Admin end points */
  PostChampionshipAdmin(championshipName: string, championshipStartDate: Date, championshipEndDate: Date): Observable<any> {
    const requestBody: any = {
      championshipName: championshipName, 
      startDate: championshipStartDate, 
      endDate: championshipEndDate
    }
    return this.http.post<any>('http://localhost:3001/game/postChampionshipAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  PostTeamAdmin(teamSelectedChampionship: IChampionshipAdmin, teamName: string): Observable<any> {
    const requestBody: any = {
      championshipName: teamSelectedChampionship.championshipName, 
      teamName: teamName
    }
    return this.http.post<any>('http://localhost:3001/game/postTeamAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  PostMatchAdmin(matchSelectedChampionship: IChampionshipAdmin, matchTeam1: string, matchTeam2: string, matchDate: Date, matchGroup: string, matchStage: string, matchLocation: string): Observable<any> {
    const requestBody: any = {
      championshipName: matchSelectedChampionship.championshipName, 
      team1: matchTeam1,
      team2: matchTeam2,
      date: matchDate,
      group: matchGroup,
      stage: matchStage,
      location: matchLocation
    }
    return this.http.post<any>('http://localhost:3001/game/postMatchAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  PostResultAdmin(resultSelectedChampionship: IChampionshipAdmin, resultSelectedMatch: IMatchAdmin, resultScoreTeam1: number, resultScoreTeam2: number): Observable<any> {
    const requestBody: any = {
      championshipName: resultSelectedChampionship.championshipName, 
      team1: resultSelectedMatch.team1,
      team2: resultSelectedMatch.team2,
      scoreTeam1: resultScoreTeam1,
      scoreTeam2: resultScoreTeam2
    }
    return this.http.post<any>('http://localhost:3001/game/postResultAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetChampionshipsAdmin(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getChampionshipsAdmin', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.championships) {
          const championships: IChampionshipAdmin[] = response.championships;
          return championships;
        }
        return null;
      })
    );
  }

  GetTeamsAdmin(championshipName: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/game/getTeamsAdmin/${championshipName}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.teams) {
          const teams: ITeamAdmin[] = response.teams;
          return teams;
        }
        return null;
      })
    );
  }

  GetMatchesAdmin(championshipName: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/game/getMatchesAdmin/${championshipName}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.matches) {
          const matches: IMatchAdmin[] = response.matches;
          return matches;
        }
        return null;
      })
    );
  }

  GetResultsAdmin(championshipName: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/game/getResultsAdmin/${championshipName}`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.results) {
          const results: IResultAdmin[] = response.results;
          return results;
        }
        return null;
      })
    );
  }

  /* Usuario end points */
  GetChampionshipTeams(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getChampionshipTeams', this.httpOptions).pipe(
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

  GetChampionshipMatches(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/game/getChampionshipMatches', this.httpOptions).pipe(
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

  PostMatchPrediction(requestBody: IMatch): Observable<any> {
    return this.http.post<any>('http://localhost:3001/game/postMatchPrediction', requestBody, this.httpOptions).pipe(
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
}
