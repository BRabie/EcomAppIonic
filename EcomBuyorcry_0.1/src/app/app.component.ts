import { Component, OnInit, ViewChild } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ListeBusinessAccountPage } from './liste-business-account/liste-business-account.page';
import { UtilisateurService } from './services/utilisateur.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {




  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Configuration',
      url: '/liste-ad-account',
      icon: 'settings'
    },
    {
      title: 'Statistics',
      url: '/folder/Outbox',
      icon: 'stats-chart'
    },
    {
      title: 'Interests Search',
      url: '/ad-interest-search',
      icon: 'search'
    },
    {
      title: 'Poducts',
      url: '/liste-product',
      icon: 'folder-open'
    },
    {
      title: 'Scoring',
      url: '/folder/Trash',
      icon: 'list'
    },
    {
      title: 'Spam',
      url: '/folder/Spam',
      icon: 'warning'
    }
  ];

  pages = [

    { title: "Générale", component: ListeBusinessAccountPage },
    { title: "Ad Set", component: ListeBusinessAccountPage },
    { title: "Configuration", component: ListeBusinessAccountPage }

  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  public utilisateurSubscription : Subscription;
  public utilisateur : any;
  public photoUser = "";

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public utilisateurProvider: UtilisateurService
  ) {
    this.initializeApp();
    
    this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

      (utilisateurImported : any) => {
        this.utilisateur = utilisateurImported;
        if(this.utilisateur && this.utilisateur["user"]){
          this.photoUser = this.utilisateur["user"]["photoURL"];
        }
        console.log(this.utilisateur);

      }

    );

    this.facebookLogin();


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }


  facebookLogin() {

    console.log("rrr"); 
    this.utilisateurProvider.connection();

  } 

  facebookLogout(){
    console.log("log out")
  }




}
