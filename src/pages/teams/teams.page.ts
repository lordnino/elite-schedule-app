import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import _ from 'lodash';

import { TeamHomePage } from '../pages';
import { EliteApi } from '../../app/shared/elite-api.service';

@Component({
  templateUrl: 'teams.page.html',
})

export class TeamsPage{
  private allTeams: any;
  private allTeamsDivisions: any;
  teams = [];

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingController: LoadingController,
    private eliteApi: EliteApi
  ){

  }

  ionViewDidLoad(){
    let selectedTourney = this.navParams.data;

    let loader = this.loadingController.create({
      content: 'Getting data...'
    });
    loader.present().then(() => {
      this.eliteApi.getTournamentData(selectedTourney.id).subscribe( data => {
        this.allTeams = data.teams;
        this.allTeamsDivisions =
          _.chain(data.teams)
          .groupBy('division')
          .toPairs()
          .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
          .value();
        this.teams = this.allTeamsDivisions;
        console.log('divison teams', this.teams);
        loader.dismiss();
      });
    });

  }

  itemTapped($event, team){
    this.navCtrl.push(TeamHomePage, team);
  }
}
