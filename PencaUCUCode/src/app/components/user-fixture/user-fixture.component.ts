import { Component } from '@angular/core';
import { IMatch } from '../../types';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-fixture',
  templateUrl: './user-fixture.component.html',
  styleUrl: './user-fixture.component.css'
})
export class UserFixtureComponent {
  matches: IMatch[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.httpService.GetChampionshipMatches().subscribe(
      (response: IMatch[]) => {
        this.matches = response;
        this.FormatChampionshipMatches()
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
  }

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
