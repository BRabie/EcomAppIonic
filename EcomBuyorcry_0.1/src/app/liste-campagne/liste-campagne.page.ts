import { Component, OnInit, Inject } from '@angular/core';
import { NavParams } from '@ionic/angular';
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
  public getRequest = "me/adaccounts?fields=name";

  constructor(
    public http :HttpClient,
    public utilisateurProvider: UtilisateurService
    ) {

      this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

        (utilisateurImported : any) => {
          this.utilisateur = utilisateurImported;
          console.log(this.utilisateur);
          this.getData();
        }
  
      );

      this.utilisateurProvider.emitUtilisateur();
   }

  ngOnInit() {
  }

  getData(){
    //this.utilisateurProvider.emitUtilisateur();
    this.http.get('https://graph.facebook.com/v6.0/'+this.getRequest+'&access_token='+ this.utilisateur['credential']['accessToken'])
    .subscribe(response => {
      console.log(response);
      this.data = response["data"];
    });
  }

}
