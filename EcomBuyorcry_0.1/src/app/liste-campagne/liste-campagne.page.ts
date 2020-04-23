import { Component, OnInit, Inject } from '@angular/core';
import { NavParams,NavController } from '@ionic/angular';
import { UtilisateurService } from '../services/utilisateur.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liste-campagne',
  templateUrl: './liste-campagne.page.html',
  styleUrls: ['./liste-campagne.page.scss'],
})
export class ListeCampagnePage implements OnInit {

  public utilisateurSubscription : Subscription;
  public utilisateur : any;
  public data = [];
  public getRequest = "/campaigns?date_format=U&fields=status,objective,name,start_time,created_time,daily_budget,end_time,configured_status,effective_status,campaign_id";

  constructor(
    public http :HttpClient,
    public navCtrl: NavController, 
    public utilisateurProvider: UtilisateurService
    ) {

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

      this.utilisateurProvider.emitUtilisateur();
      */
   }

  ngOnInit() {
  }

  public refresh(){
    this.utilisateurProvider.emitUtilisateur();
  }

  getData(){
  
    //this.utilisateurProvider.emitUtilisateur();
    this.http.get('https://graph.facebook.com/v6.0/'+this.utilisateur["adaccount"]["id"]+this.getRequest+'&access_token='+ this.utilisateur['credential']['accessToken'])
    .subscribe(response => {
      console.log(response);
      this.data = response["data"];
    });
  }

  itemTapped(event, item) {

    this.utilisateur["campaign"] = item;
    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    this.navCtrl.navigateForward("liste-ad-set");

  }

}
