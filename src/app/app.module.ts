import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MyTeamsPage } from '../pages/my-teams/my-teams.page';
import { TournamentsPage } from '../pages/tournaments/tournaments.page';
import { TeamsPage } from '../pages/teams/teams.page';
import { TeamDetailPage } from '../pages/team-detail/team-detail.page';
import { GamePage } from '../pages/game/game.page';
import { StandingsPage } from '../pages/standings/standings.page';
import { TeamHomePage } from '../pages/team-home/team-home.page';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { EliteApi } from './shared/shared';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    GamePage,
    StandingsPage,
    TeamHomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamsPage,
    TeamDetailPage,
    GamePage,
    StandingsPage,
    TeamHomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApi
  ]
})
export class AppModule {}
