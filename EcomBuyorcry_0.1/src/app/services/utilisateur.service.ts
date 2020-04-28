import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import { Platform } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
//import { Facebook , FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  public utilisateur = {};

  public utilisateur$ = new Subject<any>();

  public activerStockage = true;

  constructor(
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    //private fb: Facebook,
    public platform: Platform,
    public http: HttpClient,
    private nativeStorage: NativeStorage,
    private storage: Storage
    ) {

   }


  
  getUser() : Promise<any>{
    return this.storage.get('utilisateur');
   }

  //permet d'indiquer qu'une mise à jour au niveau du service est necessaire
  //en d'autre terme on informe le subject (la chaine youtube ) pour notifier les abonnés
  emitUtilisateur() {
    // Or to get a key/value pair
    if(this.activerStockage){
      this.storage.get('utilisateur').then((val) => {
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
      //this.nativeStorage.setItem('utilisateur', user);
      this.storage.set("utilisateur", user);
    }
    else{
      this.utilisateur=user;
    }
    this.emitUtilisateur();

  }

  connection(){

    this.storage.get("utilisateur").then(user => {
      if(user && user["credential"] && user["credential"]['accessToken'] && user["credential"]['accessToken'] != undefined){
        this.http.get("https://graph.facebook.com/me?access_token="+user["credential"]['accessToken'])
          .subscribe( data => {

            this.emitUtilisateur();

          },error => {
            //si une erreur survient alors l access token n'est plus valide
            this.facebookLogin();
          })
          
      }
      else{
        this.facebookLogin();
      }
    });
    
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

  /*
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
  */

  facebookWeb() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((user) => { 

        console.log(user);

        this.utilisateur['user'] = {};
        this.utilisateur['credential'] = {};
        
        this.utilisateur['credential']['accessToken'] = user['credential']['accessToken'];

        this.utilisateur['user']['displayName'] = user['user']['displayName'];
        this.utilisateur['user']['photoURL'] = user['user']['photoURL'];

        this.http.get("https://graph.facebook.com/v6.0/oauth/access_token?grant_type=fb_exchange_token&client_id=686400892127554&client_secret=33da8bff8e628cd5c03146dce35c42a0&fb_exchange_token="+user['credential']['accessToken'])
        .subscribe(dataComp => {
          
          this.utilisateur['credential']['accessToken'] = dataComp['access_token'];
          console.log(this.utilisateur);
          this.updateUtilisateur(this.utilisateur);
          
        });

        
        


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

  /*
  public cloneObject(newJavascriptObject : Object){

    let returnedObject = {};
    for(let e in newJavascriptObject){
      returnedObject[e] = newJavascriptObject[e];
    }
    console.log(returnedObject);
    return returnedObject;

  }
  */

  




}
