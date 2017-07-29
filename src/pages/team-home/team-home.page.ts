import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { MyTeamsPage ,StandingsPage, TeamDetailPage } from '../pages';

@Component({
  templateUrl: 'team-home.page.html',
})

export class TeamHomePage{

  team: any;
  teamDetailTab = TeamDetailPage;
  standingsTab = StandingsPage;

  constructor(private navCtrl: NavController, private navParams: NavParams){
    this.team = this.navParams.data;
  }

  goHome(){
    //this.navCtrl.push(MyTeamsPage);
    this.navCtrl.popToRoot();
  }
}
