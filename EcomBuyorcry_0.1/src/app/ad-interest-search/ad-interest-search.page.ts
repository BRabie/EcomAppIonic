import { Component, OnInit, Inject } from '@angular/core';
import { NavParams ,NavController} from '@ionic/angular';
import { UtilisateurService } from '../services/utilisateur.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ad-interest-search',
  templateUrl: './ad-interest-search.page.html',
  styleUrls: ['./ad-interest-search.page.scss'],
})
export class AdInterestSearchPage implements OnInit {

  public utilisateurSubscription : Subscription;
  public utilisateur : any;
  public data = [];
  public getRequest = "/adsets?fields=id,bid_adjustments,bid_amount,bid_strategy,configured_status,daily_budget,name,optimization_goal,status,start_time";

  constructor(
    public http :HttpClient,
    public navCtrl: NavController, 
    public utilisateurProvider: UtilisateurService
    ) {

      this.utilisateurSubscription = this.utilisateurProvider.utilisateur$.subscribe(

        (utilisateurImported : any) => {
          this.utilisateur = utilisateurImported;
          console.log(this.utilisateur);
        }

      );

      this.utilisateurProvider.emitUtilisateur();
   }

  ngOnInit() {
  }

  //fonction necessaire pour le filtre des fournisseurs
  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;
    console.log(val);

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.getData( JSON.stringify([val]) );
    }
  }

  public refresh(){
    this.utilisateurProvider.emitUtilisateur();
  }

  getData(listInterests : string){
  
    //this.utilisateurProvider.emitUtilisateur();
    this.http.get('https://graph.facebook.com/search?type=adinterestsuggestion&limit=1000&locale=en_US&interest_list='+listInterests+'&access_token='+ this.utilisateur['credential']['accessToken'])
    .subscribe(response => {
      console.log(response);
      this.data = response["data"];
    });
  }

  itemTapped(event, item) {

    this.utilisateur["adset"] = item;
    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    //this.navCtrl.navigateForward("liste-adset");

  }


}
