import { Component, OnInit, Inject } from '@angular/core';
import { NavParams ,NavController} from '@ionic/angular';
import { UtilisateurService } from '../services/utilisateur.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Platform } from '@ionic/angular';


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
    public utilisateurProvider: UtilisateurService,
    private iab: InAppBrowser,
    private appAvailability: AppAvailability, 
    private platform: Platform
    ) {


      if (this.platform.is('ios')) {
        this.appAvailability.check('twitter://')
        .then(
          (yes: boolean) => console.log('twitter://' + ' is available'),
          (no: boolean) => console.log('twitter://' + ' is NOT available')
        );
       
      } 
      else if (this.platform.is('android')) {
        this.appAvailability.check('com.twitter.android')
        .then(
          (yes: boolean) => console.log('com.twitter.android' + ' is available'),
          (no: boolean) => console.log('com.twitter.android' + ' is NOT available')
        );
        
      }
      else{
        //this.iab.create('https://www.facebook.com/search/pages/?q=rabie%20jrrge&epa=SERP_TAB');
      }

      

      this.utilisateurProvider.getUser().then(user =>{
        this.utilisateur = user;
  
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

  facebookSearch(motCle: string){
    this.iab.create('https://www.facebook.com/search/pages/?q='+motCle.replace(" ","%20")+'&epa=SERP_TAB');
  }

  googleSearch(motCle: string){
    this.iab.create('https://www.google.com/search?q='+motCle.replace(" ","%20")+'&sxsrf=ALeKk03t23pYD4RiO-WMqBQs8b0jX4h4LA:1587506625128&source=lnms&tbm=isch&sa=X&ved=2ahUKEwiMoeCDw_roAhU55uAKHfDSD38Q_AUoAXoECAsQAw&biw=1280&bih=671)');
  }


}
