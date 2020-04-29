import { Component, OnInit, Inject } from '@angular/core';
import { NavParams ,NavController, ToastController} from '@ionic/angular';
import { UtilisateurService } from '../services/utilisateur.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-liste-ad-set',
  templateUrl: './liste-ad-set.page.html',
  styleUrls: ['./liste-ad-set.page.scss'],
})
export class ListeAdSetPage implements OnInit {

  public utilisateurSubscription : Subscription;
  public utilisateur : any;
  public data = [];
  public getRequest = "/adsets?fields=id,bid_adjustments,bid_amount,bid_strategy,configured_status,daily_budget,name,optimization_goal,status,start_time";

  constructor(
    public http :HttpClient,
    public navCtrl: NavController, 
    public utilisateurProvider: UtilisateurService,
    public toastController: ToastController
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
          this.getData();
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
    this.http.get('https://graph.facebook.com/v6.0/'+this.utilisateur["campaign"]["id"]+this.getRequest+'&access_token='+ this.utilisateur['credential']['accessToken'])
    .subscribe(response => {
      console.log(response);
      this.data = response["data"];
    });
  }

  itemTapped(event, item) {

    this.utilisateur["adset"] = item;
    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    //this.navCtrl.navigateForward("liste-adset");

    this.presentToastWithOptions(item);
  }

  async presentToastWithOptions(item : any) {
    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: 'Current Ad Set : <b> ' +  item["name"] + "</b>" ,
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
