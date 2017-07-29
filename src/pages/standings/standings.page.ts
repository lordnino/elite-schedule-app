import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EliteApi } from '../../app/shared/shared';
import _ from 'lodash';

@Component({
  selector: 'page-standings',
  templateUrl: 'standings.page.html',
})
export class StandingsPage {
  allStandings: any[];
  standings: any[];
  team: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteApi
  ) {
  }

  ngOnInit() {
    this.team - this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    this.allStandings =
      _.chain(this.standings)
      .groupBy('division')
      .toPairs()
      .map(item => _.zipObject(['divisonName', 'divisonStandings'], item))
      .value();

      console.log('standings: ', this.standings);
      console.log('divison standings: ', this.allStandings);
  }

}
