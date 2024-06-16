import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { HttpService } from '../../services/http.service';
import { IMatch } from '../../types';

@Component({
  selector: 'app-user-predictions',
  templateUrl: './user-predictions.component.html',
  styleUrl: './user-predictions.component.css'
})
export class UserPredictionsComponent {
  modeFilter: string = "A";
  matches: any[] = [];
  selectedMatches: any[] = []

  constructor(private httpService: HttpService){}

  ngOnInit() {
    this.httpService.GetChampionshipMatches().subscribe(
      (response: any) => {        
        this.matches = response;
        console.log(this.matches);
        
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
    this.FilterGroup(this.modeFilter);
  }

  FilterGroup(value: string) {
    this.selectedMatches = [];
    this.matches.forEach((e: any) => {
      if (e.grupo_equipo_1 == value && !e.etapa) {
        this.selectedMatches.push(e);
      }
    })
    this.modeFilter = value;
  }

  FilterStage(value: string) {
    this.selectedMatches = [];
    this.matches.forEach((e: any) => {
      if (e.etapa == value) {
        this.selectedMatches.push(e);
      }
    })
    this.modeFilter = value;
  }

  ChangeScore(match: any, team: number, n: number) {
    this.matches.forEach((e: any) => {
      if (e.nombre_equipo_1 == match.nombre_equipo_1 && e.nombre_equipo_2 == match.nombre_equipo_2) {
        if (team == 1) {
          e.goles_partido1 += n;
          if (e.goles_partido1 < 0) {
            e.goles_partido1 = 0;
          }
        } else if (team == 2) {
          e.goles_partido2 += n;
          if (e.goles_partido2 < 0) {
            e.goles_partido2 = 0;
          }
        }
      }
    })
  }

  HighlightButton(event: any){
    const target = event.target as HTMLElement;    
    const buttons = document.querySelectorAll('.predictions .selectors button') as NodeListOf<HTMLElement>;
    buttons.forEach((button: HTMLElement) => {
      if (button === target) {
        button.classList.add('btn-highlight');
      } else {
        button.classList.remove('btn-highlight');
      }
    });
  }

  SubmitPrediction(match: any) {
    console.log(match.fecha_partido > this.formatDate(new Date()));
    console.log(match.fecha_partido);
    console.log(this.formatDate(new Date()));
    if (match.fecha_partido > this.formatDate(new Date())){
      this.httpService.PostMatchPrediction(match).subscribe(
        (response: any) => {
          this.SuccesMessage("Se ha registrado la prediccion.")
        },
        (error: any) => {
          this.ErrorMessage(error);
        }
      );
    } else {
      this.ErrorMessage("Se acabo el tiempo.")
    }
  }

  private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = this.padZero(date.getMonth() + 1);
    const day = this.padZero(date.getDate());
    return `${year}-${month}-${day}`;
  }

  private padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  ErrorMessage(message: string){
    Swal.fire({
      title: 'Error!',
      text: message,
      icon: 'error',
      confirmButtonText: 'Close',
      timer: 2000,
      timerProgressBar: true
    })
  }

  SuccesMessage(message: string){
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
