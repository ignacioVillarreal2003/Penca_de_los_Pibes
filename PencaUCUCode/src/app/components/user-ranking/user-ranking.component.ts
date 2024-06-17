import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import Swal from 'sweetalert2';
import { IRanking } from '../../types';

@Component({
  selector: 'app-user-ranking',
  templateUrl: './user-ranking.component.html',
  styleUrl: './user-ranking.component.css'
})
export class UserRankingComponent {

  constructor(private httpService: HttpService) { }

  ranking: IRanking[] | undefined = undefined;

  ngOnInit() {
    this.httpService.GetRanking().subscribe(
      (response: IRanking[]) => {        
        this.ranking = response
      },
      (error: any) => {
        this.ErrorMessage(error);
      }
    );
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
}
