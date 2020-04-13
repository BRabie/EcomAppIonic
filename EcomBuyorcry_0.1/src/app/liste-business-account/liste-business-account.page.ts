import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Facebook , FacebookLoginResponse } from '@ionic-native/facebook/ngx';

import { HttpClient, HttpHeaders, HttpErrorResponse  } from  '@angular/common/http';
import {Subscription} from "rxjs";
import { UtilisateurService } from '../services/utilisateur.service';


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

  constructor(
        public afDB: AngularFireDatabase,
        public afAuth: AngularFireAuth,
        private fb: Facebook,
        public platform: Platform,
        private http: HttpClient,
        public utilisateurProvider: UtilisateurService
      ) 
  {
    this.providerFb = new firebase.auth.FacebookAuthProvider();
    
    this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

      (utilisateurImported : any) => {
        this.utilisateur = utilisateurImported;
        console.log(this.utilisateur);

      }

    );
  }

  ngOnInit() {

  }

  facebookLogin() {

    console.log("rrr"); 
    this.utilisateurProvider.connection();
    
  } 


}
