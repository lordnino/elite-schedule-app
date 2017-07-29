import {Component} from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { TournamentsPage, TeamHomePage } from '../pages';

import { EliteApi } from '../../app/shared/shared';

@Component({
  selector: 'my-teams',
  templateUrl: 'my-teams.page.html',
})
export class MyTeamsPage {

  favorites = [
     {
       team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
       tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
       tournamentsName: 'March Madness Tournament'
     },
     {
       team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
       tournamentId: '98c6857e-b0d1-4259-b89e-2d95a45437f2',
       tournamentsName: 'Holiday Hoops Challenge'
     }
  ];

  constructor(
    private navCtrl: NavController,
    private loadingConrtoller: LoadingController,
    private eliteApi: EliteApi
  ){

  }

  goToTournaments(){
    this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event, favorites){
    let loader = this.loadingConrtoller.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorites.tournamentId)
      .subscribe(t => this.navCtrl.push(TeamHomePage, favorites.name));
  }
}
