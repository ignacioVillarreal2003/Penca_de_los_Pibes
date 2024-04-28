import { Component } from '@angular/core';
import { IMatch } from '../../interfaces/IMatch';

@Component({
  selector: 'app-penca',
  templateUrl: './penca.component.html',
  styleUrl: './penca.component.css'
})
export class PencaComponent {
  team1Goals: number = 0;
  team2Goals: number = 0;
  selectedMatch: IMatch | undefined = undefined;
  matches: IMatch[] = [];

  ngOnInit(){
    this.matches = [
      {
        team1: "Peru",
        team2: "Uruguay",
        shieldTeam1: "barcelona.png",
        shieldTeam2: "barcelona.png",
        title: "papaya",
        description: "polaca",
        date: new Date()
      },
      {
        team1: "Bolivia",
        team2: "Uruguay",
        shieldTeam1: "barcelona.png",
        shieldTeam2: "barcelona.png",
        title: "papaya",
        description: "polaca",
        date: new Date()
      },
      {
        team1: "Bolivia",
        team2: "Uruguay",
        shieldTeam1: "barcelona.png",
        shieldTeam2: "barcelona.png",
        title: "papaya",
        description: "polaca",
        date: new Date()
      }
    ]
  }

  SubmitPrediction(){
    if (this.selectedMatch){
      const result = {
        team1: this.selectedMatch.team1,
        team2: this.selectedMatch.team2,
        team1Goals: this.team1Goals,
        team2Goals: this.team2Goals
      }
      console.log(result);
    }
  }

  ClearGoals(){
    this.team1Goals = 0;
    this.team2Goals = 0;
  }
}
