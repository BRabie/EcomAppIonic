import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Facebook , FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public utilisateur = {};

  public utilisateur$ = new Subject<any>();

  public activerStockage = false;

  constructor(
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private fb: Facebook,
    public platform: Platform,
    public http: HttpClient,
    private nativeStorage: NativeStorage
    ) {

   }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  //en d'autre terme on informe le subject (la chaine youtube ) pour notifier les abonnés
  emitUtilisateur() {
    // Or to get a key/value pair
    if(this.activerStockage){
      this.nativeStorage.getItem('utilisateur').then((val) => {
        this.utilisateur$.next(val);
      });
    }
    else{
      this.utilisateur$.next(this.utilisateur);
      
    }
    console.log(this.utilisateur);
    
    

  }

  updateUtilisateur(user : any){

    if(this.activerStockage){
      this.nativeStorage.setItem('utilisateur', user);
    }
    else{
      this.utilisateur=user;
    }
    this.emitUtilisateur();

  }

  connection(){
    this.facebookLogin();
    
  }


  facebookLogin() {
    /*
    if (this.platform.is('cordova')) {
      console.log('PLateforme cordova');
      this.facebookCordova();
    } else {
      console.log('PLateforme Web');
      this.facebookWeb();
    }*/

    this.facebookWeb();
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
        this.utilisateur = user;
        if(this.activerStockage){
          this.nativeStorage.setItem('utilisateur', user);
        }
        this.updateUtilisateur(user);
        


      }).catch((error) => {
        console.log('Erreur: ' + JSON.stringify(error));
      });
  }



  async facebookRequestGet(request :string){

    this.http.get(request+'&access_token='+ this.utilisateur['user']['credential']['accessToken'])
    .subscribe(data => {
      console.log(data);
    });

  }

  




}
