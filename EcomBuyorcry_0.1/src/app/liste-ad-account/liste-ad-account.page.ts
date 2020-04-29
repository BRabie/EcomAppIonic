import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NavController, ToastController } from '@ionic/angular';

import {Subscription} from "rxjs";
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { ListeCampagnePage } from '../liste-campagne/liste-campagne.page';

@Component({
  selector: 'app-liste-ad-account',
  templateUrl: './liste-ad-account.page.html',
  styleUrls: ['./liste-ad-account.page.scss'],
})
export class ListeAdAccountPage implements OnInit {

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
        public router:Router,
        public toastController: ToastController
      ) 
  {


    this.utilisateurProvider.getUser().then(user =>{
      this.utilisateur = user;
      this.getData();

    });

    /*
    this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

      (utilisateurImported : any) => {
        this.utilisateur = utilisateurImported;
        console.log(this.utilisateur);
        
      }

    );
    */

  }

  ngOnInit() {

  }

  refresh() : void{
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
    console.log(item);
    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    this.navCtrl.navigateForward("liste-campagne");

    this.presentToastWithOptions(item);
  }

  async presentToastWithOptions(item : any) {
    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: 'Current Ad Account : <b> ' +  item["name"] + "</b>" ,
      color : "success",
      duration: 1000,
      mode:"ios",
      position:"top",
      buttons: [
        {
          text: 'dismiss',
          role: 'cancel',
          //icon:'close-circle',
          //color: "red",
          handler: () => {
            console.log('Cancel clicked');
          },
          cssClass : "toast-color-dismiss"
        }
      ]
    });
    toast.present();
  }


}
