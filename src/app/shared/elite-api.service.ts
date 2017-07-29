import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import {  Observable } from 'rxjs/observable';

@Injectable()
export class EliteApi {

  private baseUrl = 'https://elite-schedule-app-i2-ad605.firebaseio.com/';
  currentTourney: any = {};

  constructor(public http: Http){

  }

  getTournaments(){
    return new Promise(resolve => {
      this.http.get(`${this.baseUrl}/tournaments.json`)
        .subscribe(res => resolve(res.json()));
    });
  }

  getTournamentData(tourneyId){
    return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
      .map((response) => {
        this.currentTourney = response.json();
        return this.currentTourney;
      });
  }

  getCurrentTourney(){
    return this.currentTourney;
  }
}
