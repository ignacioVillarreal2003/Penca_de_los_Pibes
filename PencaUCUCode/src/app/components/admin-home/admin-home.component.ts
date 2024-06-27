import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2'
import { IChampionshipAdmin, IMatchAdmin, IResult, ITeamAdmin, ITeamUser } from '../../types';

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
  resultsBefore: IResult[] = []
  resultsAfter: IResult[] = []

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.GetChampionships();
    this.GetAllTeams();
  }

  /* Datos championships */
  championship: IChampionshipAdmin | undefined = undefined
  championshipName: string | undefined = undefined;
  championshipStartDate: string | undefined = undefined;
  championshipEndDate: string | undefined = undefined;

  GetChampionships() {
    this.httpService.GetChampionshipsAdmin().subscribe(
      (response: IChampionshipAdmin[]) => {
        this.championships = response;
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  PostChampionshipAdmin() {
    if (this.championshipName && this.championshipStartDate && this.championshipEndDate) {
      this.httpService.PostChampionshipAdmin(this.championshipName, this.championshipStartDate, this.championshipEndDate).subscribe(
        (response: any) => {
          this.SuccesMessage(response)
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  ActiveChampionship() {
    if (this.championship) {
      this.httpService.ActiveChampionship(this.championship.championshipName).subscribe(
        (response: any) => {
          this.SuccesMessage(response)
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  /* Datos team */
  teamSelectedChampionship: string | undefined = undefined;
  teamName: string | undefined = undefined;
  teamGroup: string | undefined = undefined;
  countries: ITeamUser[] = []

  GetTeams() {
    if (this.teamSelectedChampionship) {
      this.httpService.GetTeamsAdmin(this.teamSelectedChampionship).subscribe(
        (response: ITeamAdmin[]) => {
          this.teams = response;          
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  GetAllTeams() {
    this.httpService.GetAllTeamsAdmin().subscribe(
      (response: ITeamUser[]) => {
        this.countries = response;
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  PostTeam() {
    if (this.teamSelectedChampionship && this.teamName && this.teamGroup) {
      this.httpService.PostTeamAdmin(this.teamSelectedChampionship, this.teamName, this.teamGroup).subscribe(
        (response: any) => {
          this.SuccesMessage(response)
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  AddTeam() {
    if (this.teamName) {
      this.httpService.AddTeamAdmin(this.teamName).subscribe(
        (response: any) => {
          this.SuccesMessage(response)
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  /* Datos match */
  matchSelectedChampionship: string | undefined = undefined;
  matchTeam1: string | undefined = undefined;
  matchTeam2: string | undefined = undefined;
  matchDate: string | undefined = undefined;
  matchStage: string | undefined = undefined;
  matchLocation: string | undefined = undefined;

  FormatChampionshipMatches() {
    this.matches.forEach(match => {
      const dateObj = new Date(match.dateMatch);
      const year = dateObj.getFullYear();
      const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
      const day = ('0' + dateObj.getDate()).slice(-2);
      const hours = ('0' + dateObj.getHours()).slice(-2);
      const minutes = ('0' + dateObj.getMinutes()).slice(-2);
      const seconds = ('0' + dateObj.getSeconds()).slice(-2);
      match.dateMatch = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
    });
    console.log(this.matches);
  }

  GetMatches() {
    if (this.matchSelectedChampionship) {
      this.httpService.GetMatchesAdmin(this.matchSelectedChampionship).subscribe(
        (response: IMatchAdmin[]) => {
          this.matches = response;
          this.FormatChampionshipMatches();
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  PostMatch() {
    if (this.matchSelectedChampionship && this.matchTeam1 && this.matchTeam2 && this.matchDate && this.matchStage && this.matchLocation) {
      this.httpService.PostMatchAdmin(this.matchSelectedChampionship, this.matchTeam1, this.matchTeam2, this.matchDate, this.matchStage, this.matchLocation).subscribe(
        (response: any) => {
          this.SuccesMessage(response)
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  /* Datos result */
  resultSelectedChampionship: string | undefined = undefined;
  resultSelectedMatch: IResult | undefined = undefined;
  resultScoreTeam1: number = 0;
  resultScoreTeam2: number = 0;

  GetResults() {
    if (this.resultSelectedChampionship) {
      this.httpService.GetResultsAdmin(this.resultSelectedChampionship).subscribe(
        (response: IResult[]) => {
          response.forEach((e: IResult) => {
            if (new Date(e.dateMatch) < new Date()){
              this.resultsBefore.push(e);
            } else {
              this.resultsAfter.push(e);
            }
          })
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  PostResult() {
    if (this.resultSelectedChampionship && this.resultSelectedMatch) {      
      this.httpService.PostResultAdmin(this.resultSelectedChampionship, this.resultSelectedMatch, this.resultScoreTeam1, this.resultScoreTeam2).subscribe(
        (response: any) => {
          this.SuccesMessage(response)
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    }
  }

  ScoreReset(){
    this.httpService.ScoreReset().subscribe(
      (response: any) => {
        this.SuccesMessage(response)
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  PostWinners(){
    this.httpService.PostWinners().subscribe(
      (response: any) => {
        this.SuccesMessage(response)
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

  ChooseMode(mode: number) {
    const mode1 = document.querySelector('#mode-championship') as HTMLElement;
    const mode2 = document.querySelector('#mode-team') as HTMLElement;
    const mode3 = document.querySelector('#mode-match') as HTMLElement;
    const mode4 = document.querySelector('#mode-result') as HTMLElement;
    const mode5 = document.querySelector('#mode-more-options') as HTMLElement;
    if (mode == 1) {
      mode1.style.display = "flex";
      mode2.style.display = "none";
      mode3.style.display = "none";
      mode4.style.display = "none";
      mode5.style.display = "none";
    } else if (mode == 2) {
      mode1.style.display = "none";
      mode2.style.display = "flex";
      mode3.style.display = "none";
      mode4.style.display = "none";
      mode5.style.display = "none";
    } else if (mode == 3) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "flex";
      mode4.style.display = "none";
      mode5.style.display = "none";
    } else if (mode == 4) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "none";
      mode4.style.display = "flex";
      mode5.style.display = "none";
    } else if (mode == 5) {
      mode1.style.display = "none";
      mode2.style.display = "none";
      mode3.style.display = "none";
      mode4.style.display = "none";
      mode5.style.display = "flex";
    }
  }

  ChooseOptionChampionship(mode: number) {
    const mode1 = document.querySelector('#mode-championship .option-view') as HTMLElement;
    const mode2 = document.querySelector('#mode-championship .option-create') as HTMLElement;
    const mode3 = document.querySelector('#mode-championship .option-modify') as HTMLElement;
    const mode4 = document.querySelector('#mode-championship .option-active') as HTMLElement;
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

  ChooseOptionTeam(mode: number) {
    const mode1 = document.querySelector('#mode-team .option-view') as HTMLElement;
    const mode2 = document.querySelector('#mode-team .option-create') as HTMLElement;
    const mode3 = document.querySelector('#mode-team .option-modify') as HTMLElement;
    const mode4 = document.querySelector('#mode-team .option-add-team') as HTMLElement;
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

  FormatDate(date: Date) {
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

  public selectChampion: boolean = false;
  public champion: ITeamAdmin | undefined;
  public subchampion: ITeamAdmin | undefined;

  inputChampionshipResult(champion: ITeamAdmin, subchampion: ITeamAdmin) {
    this.httpService.postChampionshipResult(champion, subchampion).subscribe((response: any) => {
      console.log(response);
    });
  }

  toggleChampion() {
    this.selectChampion = !this.selectChampion;
  }

  confirmChampion() {

    if(this.champion != null && this.subchampion != null) {
      this.inputChampionshipResult(this.champion, this.subchampion);
      alert("Campeón y subcampeón seleccionados correctamente");
      this.selectChampion = !this.selectChampion;
    } else if( this.champion === this.subchampion){
      alert("El campeón y el subampeón no pueden ser iguales");
    } else {
      alert("Los campos no deben esta vacíos");
    }
  }
}
