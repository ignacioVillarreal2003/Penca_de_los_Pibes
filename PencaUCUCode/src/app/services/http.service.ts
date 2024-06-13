import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { IMatch, IRegister, ILogin, IRanking, IChampionship, ITeam, IChampionshipAdmin, IMatchAdmin, IResultAdmin, ITeamAdmin, IResult } from '../types';

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
  RegisterUser(ci: string, password: string, username: string, champion: string, subChampion: string): Observable<any> {
    const requestBody = {
      ci: ci,
      password: password,
      username: username,
      champion: champion,
      subChampion: subChampion
    }
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

  LoginUser(ci: string, password: string): Observable<any> {
    const requestBody = {
      ci: ci,
      password: password,
    }
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

  LoginAdmin(ci: string, password: string): Observable<any> {
    const requestBody = {
      ci: ci,
      password: password,
    }
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
    return this.http.post<any>('http://localhost:3001/admin/postChampionshipAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  PostTeamAdmin(teamSelectedChampionship: IChampionshipAdmin, teamName: string): Observable<any> {
    const requestBody: any = {
      championshipName: teamSelectedChampionship.championshipName, 
      teamName: teamName
    }
    return this.http.post<any>('http://localhost:3001/admin/postTeamAdmin', requestBody, this.httpOptions).pipe(
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
    return this.http.post<any>('http://localhost:3001/admin/postMatchAdmin', requestBody, this.httpOptions).pipe(
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
    return this.http.post<any>('http://localhost:3001/admin/postResultAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetChampionshipsAdmin(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/admin/getChampionshipsAdmin', this.httpOptions).pipe(
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
    return this.http.get<any>(`http://localhost:3001/admin/getTeamsAdmin/${championshipName}`, this.httpOptions).pipe(
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
    return this.http.get<any>(`http://localhost:3001/admin/getMatchesAdmin/${championshipName}`, this.httpOptions).pipe(
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
    return this.http.get<any>(`http://localhost:3001/admin/getResultsAdmin/${championshipName}`, this.httpOptions).pipe(
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
    return this.http.get<any>('http://localhost:3001/user/getChampionshipTeams', this.httpOptions).pipe(
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
    return this.http.get<any>('http://localhost:3001/user/getChampionshipMatches', this.httpOptions).pipe(
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

  PostMatchPrediction(match: IMatch): Observable<any> {
    const requestBody: IResult = {
      team1: match.team1,
      team2: match.team2,
      scoreTeam1: match.scoreTeam1,
      scoreTeam2: match.scoreTeam2
    }
    return this.http.post<any>('http://localhost:3001/user/postMatchPrediction', requestBody, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  GetRanking(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/user/getRanking', this.httpOptions).pipe(
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
