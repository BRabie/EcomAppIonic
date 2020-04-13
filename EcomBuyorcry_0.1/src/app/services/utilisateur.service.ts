import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Facebook , FacebookLoginResponse } from '@ionic-native/facebook/ngx';


@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public utilisateur = {};

  public utilisateur$ = new Subject<any>();

  constructor(
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private fb: Facebook,
    public platform: Platform,
    public http: HttpClient
    ) {


   }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  //en d'autre terme on informe le subject (la chaine youtube ) pour notifier les abonnés
  emitUtilisateur() {
    this.utilisateur$.next(this.utilisateur);
    console.log(this.utilisateur);
  }

  updateUtilisateur(user : any){
    this.utilisateur = user;
    this.emitUtilisateur();
  }

  connection(){
    this.facebookLogin();
  }


  facebookLogin() {
    if (this.platform.is('cordova')) {
      console.log('PLateforme cordova');
      this.facebookCordova();
    } else {
      console.log('PLateforme Web');
      this.facebookWeb();
    }
  } 

  facebookCordova() {
    this.fb.login(['email']).then( (response : FacebookLoginResponse) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
            console.log(success);
        }).catch((error) => {
            console.log('Erreur: ' + JSON.stringify(error));
        });
    }).catch((error) => { console.log(error); });
  }

  facebookWeb() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((user) => { 
        this.updateUtilisateur(user)
        console.log(user);
        console.log(this.fb.getAccessToken());


        this.http.get('https://graph.facebook.com/v6.0/me/adaccounts?fields=name,campaigns{adsets}&access_token='+ (user.credential as any).accessToken)
          .subscribe(data => {
            console.log(data);
          });



      }).catch((error) => {
        console.log('Erreur: ' + JSON.stringify(error));
      });
  }




}
