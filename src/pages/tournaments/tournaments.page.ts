import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';

import { MyTeamsPage, TeamsPage } from '../pages';

import { EliteApi } from '../../app/shared/shared';

@Component({
  templateUrl: 'tournaments.page.html'
})

export class TournamentsPage{

  tournaments: any;

  constructor(
    private navCtrl: NavController,
    private eliteApi: EliteApi,
    private loadingController: LoadingController
  ){

  }

  itemTapped($event, tourney){
    this.navCtrl.push(TeamsPage, tourney);
  }


  ionViewDidLoad(){
    let loader = this.loadingController.create({
      content: 'Getting tournaments...'
    });
    loader.present().then(() => {
      this.eliteApi.getTournaments().then(data => {
        this.tournaments = data;
        loader.dismiss();
      });
    })
  }

}
851995
