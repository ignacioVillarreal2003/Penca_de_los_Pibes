import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { IRegister, ILogin, IRanking, IMatch, IChampionshipAdmin, ITeamAdmin, IMatchAdmin, IResult, ITeamUser, ICareerUser } from '../types';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private user: UserService) { }
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

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
    const requestBody: IRegister = {
      ci: ci,
      password: password,
      username: username,
      champion: champion,
      subChampion: subChampion
    }
    return this.http.post<any>('http://localhost:3001/session/registerUser', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.token && response.user) {
          return [response.token, response.user];
        }
        return null;
      })
    );
  }

  LoginUser(ci: string, password: string): Observable<any> {
    const requestBody: ILogin = {
      ci: ci,
      password: password,
    }
    return this.http.post<any>('http://localhost:3001/session/loginUser', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.token && response.user) {
          return [response.token, response.user];
        }
        return null;
      })
    );
  }

  LoginAdmin(ci: string, password: string): Observable<any> {
    const requestBody: ILogin = {
      ci: ci,
      password: password
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

  /* Usuario end points */
  GetChampionshipTeams(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/user/getChampionshipTeams', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.teams) {
          const teams: ITeamUser[] = response.teams;
          return teams;
        }
        return null;
      })
    );
  }

  GetRanking(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/user/getRanking', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.ranking) {
          const ranking: IRanking[] = response.ranking;
          return ranking;
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

  PostMatchPrediction(match: IMatch, datePrediction: string): Observable<any> {
    const requestBody: any = {
      ci: this.user.ci,
      dateMatch: match.dateMatch,
      team1: match.team1,
      team2: match.team2,
      championshipName: match.championshipName1,
      datePrediction: datePrediction,
      scoreTeam1: match.scoreTeam1,
      scoreTeam2: match.scoreTeam2
    }
    return this.http.post<any>('http://localhost:3001/user/postMatchPrediction', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
        }
        return null;
      })
    );
  }

  GetCareers(): Observable<any> {
    return this.http.get<any>('http://localhost:3001/user/getCareers', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.careers) {
          const careers: ICareerUser[] = response.careers;
          return careers;
        }
        return null;
      })
    );
  }

  ChangeCareer(career: string): Observable<any> {
    const requestBody: any = {
      ci: this.user.ci,
      career: career
    }
    return this.http.post<any>('http://localhost:3001/user/changeCareer', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
        }
        return null;
      })
    );
  }

  ChangeMail(mail: string): Observable<any> {
    const requestBody: any = {
      ci: this.user.ci,
      mail: mail
    }
    return this.http.post<any>('http://localhost:3001/user/changeMail', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
        }
        return null;
      })
    );
  }

  ChangePassword(oldPassword: string, newPassword: string): Observable<any> {
    const requestBody: any = {
      ci: this.user.ci,
      oldPassword: oldPassword,
      newPassword: newPassword
    }
    return this.http.post<any>('http://localhost:3001/user/changePassword', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
        }
        return null;
      })
    );
  }

  GetUserMatches(): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/user/getUserMatches/${this.user.ci}`, this.httpOptions).pipe(
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

  /* Admin end points */
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

  PostChampionshipAdmin(championshipName: string, startDate: string, endDate: string): Observable<any> {
    const requestBody: IChampionshipAdmin = {
      championshipName: championshipName,
      startDate: startDate,
      endDate: endDate
    }
    return this.http.post<any>('http://localhost:3001/admin/postChampionshipAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
        }
        return null;
      })
    );
  }

  ActiveChampionship(championshipName: string): Observable<any> {
    const requestBody = {
      championshipName: championshipName
    }
    return this.http.post<any>('http://localhost:3001/admin/activeChampionship', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
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

  GetAllTeamsAdmin(): Observable<any> {
    return this.http.get<any>(`http://localhost:3001/admin/getAllTeamsAdmin`, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.teams) {
          const teams: ITeamUser[] = response.teams;
          return teams;
        }
        return null;
      })
    );
  }

  PostTeamAdmin(teamSelectedChampionship: any, teamName: string, teamGroup: string): Observable<any> {
    const requestBody: ITeamAdmin = {
      championshipName: teamSelectedChampionship,
      teamName: teamName,
      teamGroup: teamGroup
    }
    return this.http.post<any>('http://localhost:3001/admin/postTeamAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
        }
        return null;
      })
    );
  }

  AddTeamAdmin(teamName: string): Observable<any> {
    const requestBody: ITeamUser = {
      teamName: teamName
    }
    return this.http.post<any>('http://localhost:3001/admin/addTeamAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
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

  PostMatchAdmin(matchSelectedChampionship: string, matchTeam1: string, matchTeam2: string, matchDate: string, matchStage: string, matchLocation: string): Observable<any> {
    const requestBody: any = {
      championshipName: matchSelectedChampionship,
      team1: matchTeam1,
      team2: matchTeam2,
      date: matchDate,
      stage: matchStage,
      location: matchLocation
    }
    return this.http.post<any>('http://localhost:3001/admin/postMatchAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
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
          const results: IResult[] = response.results;
          return results;
        }
        return null;
      })
    );
  }

  PostResultAdmin(resultSelectedChampionship: string, resultSelectedMatch: IResult, resultScoreTeam1: number, resultScoreTeam2: number): Observable<any> {
    const requestBody: any = {
      championshipName: resultSelectedChampionship,
      team1: resultSelectedMatch.team1,
      team2: resultSelectedMatch.team2,
      scoreTeam1: resultScoreTeam1,
      scoreTeam2: resultScoreTeam2,
      dateMatch: resultSelectedMatch.dateMatch
    }    
    return this.http.post<any>('http://localhost:3001/admin/postResultAdmin', requestBody, this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
        }
        return null;
      })
    );
  }

  ScoreReset(): Observable<any> {
    return this.http.post<any>('http://localhost:3001/admin/scoreReset', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
        }
        return null;
      })
    );
  }

  PostWinners(): Observable<any> {
    return this.http.post<any>('http://localhost:3001/admin/postWinners', this.httpOptions).pipe(
      catchError(this.handleError),
      map(response => {
        if (response && response.message) {
          const message: string = response.message;
          return message;
        }
        return null;
      })
    );
  }

  postChampionshipResult(champion: ITeamAdmin, subchampion: ITeamAdmin) {

    const requestBody: any = {
      champion: champion,
      subchampion: subchampion
    }

    console.log(requestBody);

    return this.http.post('http://localhost:3001/admin/championshipEnd', requestBody)
  }
}
