import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Facebook , FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import {Subscription} from "rxjs";
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { ListeCampagnePage } from '../liste-campagne/liste-campagne.page';


@Component({
  selector: 'app-liste-business-account',
  templateUrl: './liste-business-account.page.html',
  styleUrls: ['./liste-business-account.page.scss'],
})
export class ListeBusinessAccountPage implements OnInit {

  loading: any;
  providerFb: firebase.auth.FacebookAuthProvider;

  public utilisateurSubscription : Subscription;
  public utilisateur : any;

  public data = [];
  public getRequest = "me/adaccounts?fields=name";

  public pushPage = ListeCampagnePage;

  constructor(
        public navCtrl: NavController, 
        public utilisateurProvider: UtilisateurService,
        public http :HttpClient,
        public router:Router
      ) 
  {
    this.providerFb = new firebase.auth.FacebookAuthProvider();
    
    this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

      (utilisateurImported : any) => {
        this.utilisateur = utilisateurImported;
        console.log(this.utilisateur);
        this.getData();
      }

    );
  }

  ngOnInit() {

  }

  public refresh(){
    this.utilisateurProvider.emitUtilisateur();
  }

  getData(){
    //this.utilisateurProvider.emitUtilisateur();
    this.http.get('https://graph.facebook.com/v6.0/'+this.getRequest+'&access_token='+ this.utilisateur['credential']['accessToken'])
    .subscribe(response => {
      console.log(response);
      this.data = response["data"];
    });
  }

  facebookLogin() {

    console.log("rrr"); 
    this.utilisateurProvider.connection();

  } 

  itemTapped(event, item) {

    this.utilisateur["adaccount"] = item;
    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    this.navCtrl.navigateForward("liste-campagne");




  }


}
