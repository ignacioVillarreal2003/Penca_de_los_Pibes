import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2'
import { IChampionship, IChampionshipAdmin, IMatch, IMatchAdmin, IResult, IResultAdmin, ITeam, ITeamAdmin } from '../../types';
import { Time } from '@angular/common';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent {

  /* Datos iniciales */
  championships: IChampionshipAdmin[] = []
  teams: ITeamAdmin[] = []
  matches: IMatchAdmin[] = []
  results: IResultAdmin[] = []

  /* Datos championships */
  championshipName: string | undefined = undefined;
  championshipStartDate: Date | undefined = undefined;
  championshipEndDate: Date | undefined = undefined;

  /* Datos team */
  teamSelectedChampionship: IChampionship | undefined = undefined;
  teamName: string | undefined = undefined;

  /* Datos match */
  matchSelectedChampionship: IChampionship | undefined = undefined;
  matchTeam1: string | undefined = undefined;
  matchTeam2: string | undefined = undefined;
  matchDate: Date | undefined = undefined;
  matchGroup: string | undefined = undefined;
  matchStage: string | undefined = undefined;
  matchLocation: string | undefined = undefined;

  /* Datos result */
  resultSelectedChampionship: IChampionship | undefined = undefined;
  resultSelectedMatch: IMatch | undefined = undefined;
  resultScoreTeam1: number = 0;
  resultScoreTeam2: number = 0;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.championships.push({
      championshipName: "barcelona no vis",
      startDate: new Date(),
      endDate: new Date()
    }, {
      championshipName: "barcelona no vis",
      startDate: new Date(),
      endDate: new Date()
    })
    this.teams.push({
      teamName: "paco"
    }, {
      teamName: "loco"
    })
    this.matches.push({
      team1: "paco",
      team2: "loco",
      date: new Date(),
      group: "A",
      stage: "Final",
      location: "peru",
    }, {
      team1: "paco",
      team2: "loco",
      date: new Date(),
      group: "A",
      stage: "Final",
      location: "peru",
    })
    this.results.push({
      team1: "paco",
      team2: "loco",
      scoreTeam1: 0,
      scoreTeam2: 0,
    }, {
      team1: "paco1",
      team2: "loco1",
      scoreTeam1: 2,
      scoreTeam2: 1,
    })
    /*this.httpService.GetChampionshipsAdmin().subscribe(
      (response: any) => {
        this.championships = response
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );*/
  }

  AddChampionship() {
    if (this.championshipName && this.championshipStartDate && this.championshipEndDate) {
      this.httpService.PostChampionshipAdmin(this.championshipName, this.championshipStartDate, this.championshipEndDate).subscribe(
        (response: any) => {
          this.SuccesMessage("Campeonato creado.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  AddTeam() {
    if (this.teamSelectedChampionship && this.teamName) {
      this.httpService.PostTeamAdmin(this.teamSelectedChampionship, this.teamName).subscribe(
        (response: any) => {
          this.SuccesMessage("Equipo creado.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  AddMatch() {
    if (this.matchSelectedChampionship && this.matchTeam1 && this.matchTeam2 && this.matchDate && this.matchGroup && this.matchStage && this.matchLocation) {
      this.httpService.PostMatchAdmin(this.matchSelectedChampionship, this.matchTeam1, this.matchTeam2, this.matchDate, this.matchGroup, this.matchStage, this.matchLocation).subscribe(
        (response: any) => {
          this.SuccesMessage("Partido creado.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  AddResult() {
    if (this.resultSelectedChampionship && this.resultSelectedMatch && this.resultScoreTeam1 && this.resultScoreTeam2) {
      this.httpService.PostResultAdmin(this.resultSelectedChampionship, this.resultSelectedMatch, this.resultScoreTeam1, this.resultScoreTeam2).subscribe(
        (response: any) => {
          this.SuccesMessage("Equipo creado.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  GetChampionships() {
    this.httpService.GetChampionshipsAdmin().subscribe(
      (response: any) => {
        this.championships = response;
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  GetTeams() {
    if (this.teamSelectedChampionship) {
      this.httpService.GetTeamsAdmin(this.teamSelectedChampionship.championshipName).subscribe(
        (response: any) => {
          this.teams = response;
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  GetMatches() {
    if (this.matchSelectedChampionship) {
      this.httpService.GetMatchesAdmin(this.matchSelectedChampionship.championshipName).subscribe(
        (response: any) => {
          this.matches = response;
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  GetResults() {
    if (this.resultSelectedChampionship) {
      this.httpService.GetResultsAdmin(this.resultSelectedChampionship.championshipName).subscribe(
        (response: any) => {
          this.teams = response;
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  ChooseMode(mode: number) {
    const mode1 = document.querySelector('#mode-championship') as HTMLElement;
    const mode2 = document.querySelector('#mode-team') as HTMLElement;
    const mode3 = document.querySelector('#mode-match') as HTMLElement;
    const mode4 = document.querySelector('#mode-result') as HTMLElement;
    if (mode == 1) {
      mode1.style.display = "flex";
      mode2.style.display = "none";
      mode3.style.display = "none";
      mode4.style.display = "none";
    } else if (mode == 2) {
      mode1.style.display = "none";
      mode2.style.display = "flex";
      mode3.style.display = "none";
      mode4.style.display = "none";
    } else if (mode == 3) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "flex";
      mode4.style.display = "none";
    } else if (mode == 4) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "none";
      mode4.style.display = "flex";
    }
  }

  ChooseOptionChampionship(mode: number) {
    const mode1 = document.querySelector('#mode-championship .option-view') as HTMLElement;
    const mode2 = document.querySelector('#mode-championship .option-create') as HTMLElement;
    const mode3 = document.querySelector('#mode-championship .option-modify') as HTMLElement;
    if (mode == 1) {
      mode1.style.display = "flex";
      mode2.style.display = "none";
      mode3.style.display = "none";
    } else if (mode == 2) {
      mode1.style.display = "none";
      mode2.style.display = "flex";
      mode3.style.display = "none";
    } else if (mode == 3) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "flex";
    }
  }

  ChooseOptionTeam(mode: number) {
    const mode1 = document.querySelector('#mode-team .option-view') as HTMLElement;
    const mode2 = document.querySelector('#mode-team .option-create') as HTMLElement;
    const mode3 = document.querySelector('#mode-team .option-modify') as HTMLElement;
    if (mode == 1) {
      mode1.style.display = "flex";
      mode2.style.display = "none";
      mode3.style.display = "none";
    } else if (mode == 2) {
      mode1.style.display = "none";
      mode2.style.display = "flex";
      mode3.style.display = "none";
    } else if (mode == 3) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "flex";
    }
  }

  ChooseOptionMatch(mode: number) {
    const mode1 = document.querySelector('#mode-match .option-view') as HTMLElement;
    const mode2 = document.querySelector('#mode-match .option-create') as HTMLElement;
    const mode3 = document.querySelector('#mode-match .option-modify') as HTMLElement;
    if (mode == 1) {
      mode1.style.display = "flex";
      mode2.style.display = "none";
      mode3.style.display = "none";
    } else if (mode == 2) {
      mode1.style.display = "none";
      mode2.style.display = "flex";
      mode3.style.display = "none";
    } else if (mode == 3) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "flex";
    }
  }

  ChooseOptionResult(mode: number) {
    const mode1 = document.querySelector('#mode-result .option-view') as HTMLElement;
    const mode2 = document.querySelector('#mode-result .option-create') as HTMLElement;
    const mode3 = document.querySelector('#mode-result .option-modify') as HTMLElement;
    if (mode == 1) {
      mode1.style.display = "flex";
      mode2.style.display = "none";
      mode3.style.display = "none";
    } else if (mode == 2) {
      mode1.style.display = "none";
      mode2.style.display = "flex";
      mode3.style.display = "none";
    } else if (mode == 3) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "flex";
    }
  }

  HighlightOption(event: Event) {
    const target = event.target as HTMLElement;
    const buttons = document.querySelectorAll('.admin-home aside button') as NodeListOf<HTMLElement>;
    buttons.forEach((button: HTMLElement) => {
      if (button === target) {
        button.classList.add('highlightOption');
      } else {
        button.classList.remove('highlightOption');
      }
    });
  }

  FormatDate(date: Date){
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const anio = date.getFullYear();
    return `${dia.toString().padStart(2, '0')}/${mes.toString().padStart(2, '0')}/${anio}`;
  }

  ErrorMessage(message: string) {
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Close',
      timer: 2000,
      timerProgressBar: true
    })
  }

  SuccesMessage(message: string) {
    Swal.fire({
      title: 'Bien!',
      text: message,
      icon: 'success',
      confirmButtonText: 'Close',
      timer: 2000,
      timerProgressBar: true
    })
  }
}