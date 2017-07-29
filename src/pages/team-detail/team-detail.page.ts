import { Component } from '@angular/core';
import { ToastController, AlertController, NavController, NavParams, LoadingController } from 'ionic-angular';

import * as _ from 'lodash';
import * as moment from 'moment';
import { EliteApi } from '../../app/shared/shared';
import { GamePage } from '../pages';

import 'rxjs';

@Component({
  templateUrl: 'team-details.page.html',
})

export class TeamDetailPage{
  isFollowing = false;
  allGames: any[];
  dateFilter: string;
  games: any[];
  team: any;
  teamStanding: any;
  private tourneyData: any;
  useDateFilter = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private toastController: ToastController,
    private eliteApi: EliteApi,
  ){

  }

  ngOnInit(){
    this.team = this.navParams.data;
    this.tourneyData = this.eliteApi.getCurrentTourney();

    this.games = _.chain(this.tourneyData.games)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team2;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score);
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        }
      })
      .value();

    this.allGames = this.games;
    this.teamStanding = _.find(this.tourneyData.standings, { 'teamId': this.team.id });
  }

  getScoreDisplay(isTeam1, team1Score, team2Score){
    if (team1Score && team2Score){
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndicator = teamScore > opponentScore ? "W: " : "L: ";
      return winIndicator + teamScore + "-" + opponentScore;
    }
    else{
      return "";
    }
  }

  gameClicked($event, game){
    let sourceGame = this.tourneyData.games.find(g => g.id === game.gameId);
    this.navCtrl.parent.parent.push(GamePage, sourceGame);
  }

  dateChanged(){
    if(this.useDateFilter){
      this.games = _.filter(this.allGames, g => moment(g.time).isSame(this.dateFilter, 'day'));
    } else {
      this.games = this.allGames;
    }
  }

  getScoreWonL(game){
    return game.scoreDisplay ? game.scoreDisplay[0]: '';
  }

  getScoreDisplayBadgeClass(game){
    return game.scoreDisplay.indexOf('W:') === 0 ? 'primary' : 'danger';
  }

  toggleFollow(){
    if (this.isFollowing){
      let confirm = this.alertController.create({
        title: 'unfollow?',
        message: 'Are you sure you want to unfollow?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.isFollowing = false;
              //ToDo: persist data here

              let toast = this.toastController.create({
                message: 'You have unfollowed this team.',
                duration: 2000,
                position: 'bottom'
              });
              toast.present();
            }
          },
          {
            text: 'No'
          }
        ]
      });
      confirm.present();
    } else {
      this.isFollowing = true;
      //ToDo: Persist data here
    }
  }
}
