import { Component } from '@angular/core';
import { IMatch } from '../../interfaces/IMatch';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent {
  matches: IMatch[] = [];
  selectedMatches: IMatch[] = []
  countries: string[] = ["Uruguay", "Peru", "Bolivia"]

  selectedCountry: string | undefined = undefined
  typeMatch: "now" | "future" | "completed" | "all" = "all";

  ngOnInit() {
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
      },
    ]
    this.selectedMatches = this.matches;
  }

  ChangeMatches(){
    this.FilterMatchesByType();
    this.FilterMatchesByCountry();
  }

  FilterMatchesByType() {
    this.selectedMatches = [];
    if (this.typeMatch == "now") {
      this.matches.forEach((e: IMatch) => {
        if (e.date.getDay() == new Date().getDay()) {
          console.log(e.date.getDay);
          console.log(new Date().getDay);
          this.selectedMatches.push(e);
        }
      })
    } else if (this.typeMatch == "completed") {
      this.matches.forEach((e: IMatch) => {
        if (e.date.getDay() < new Date().getDay()) {
          console.log(e.date.getDay);
          console.log(new Date().getDay);
          this.selectedMatches.push(e);
        }
      })
    } else if (this.typeMatch == "future") {
      this.matches.forEach((e: IMatch) => {
        if (e.date.getDay() > new Date().getDay()) {
          console.log(e.date.getDay);
          console.log(new Date().getDay);
          this.selectedMatches.push(e);
        }
      })
    } else {
      this.selectedMatches = this.matches;
    }
  }

  FilterMatchesByCountry() {
    const m: IMatch[] = []; 
    if (this.selectedCountry != undefined) {
      this.selectedMatches.forEach((e: IMatch) => {
        if (e.team1 == this.selectedCountry || e.team2 == this.selectedCountry) {
          m.push(e);
        }
      })
      this.selectedMatches = m;
    }
  }



}
