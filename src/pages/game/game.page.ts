import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../app/shared/shared';

import 'rxjs';

@Component({
  templateUrl: 'game.page.html',
})

export class GamePage{
  game: any;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private eliteApi: EliteApi
  ){

  }

  ngOnInit(){
    this.game = this.navParams.data;
    console.log(this.game.team1);
  }

  teamTapped(teamId){
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }
}
