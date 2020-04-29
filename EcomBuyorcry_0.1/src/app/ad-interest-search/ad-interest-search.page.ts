import { Component, OnInit, Inject } from '@angular/core';
import { NavParams ,NavController, ModalController, AlertController} from '@ionic/angular';
import { UtilisateurService } from '../services/utilisateur.service';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { AppAvailability } from '@ionic-native/app-availability/ngx';
import { Platform } from '@ionic/angular';
import { ListeProductPage } from '../liste-product/liste-product.page';
import { AdInterestSearchListeProductPage } from '../ad-interest-search-liste-product/ad-interest-search-liste-product.page';


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
  public dataInteresetCategory = [];
  constructor(
    public http :HttpClient,
    public navCtrl: NavController, 
    public utilisateurProvider: UtilisateurService,
    private iab: InAppBrowser,
    private appAvailability: AppAvailability, 
    private platform: Platform,
    public modalController: ModalController,
    public alertController: AlertController
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
        this.refreshProductInterestCategory();
        if(this.utilisateur["searchvalue"]){
          this.getData(this.utilisateur["searchvalue"]);
        }
  
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

  ngOnDestroy(){

    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
  }

  refreshProductInterestCategory(){

    this.http.get("http://192.168.8.102:9091/requestAny/"+
    "select pic.id as id,concat(pic.name,' : ',p.name) as category " +
    "from product_interest as pi,product_interest_cat as pic,product as p " +
    "where pic.id = pi.productinterestcatid " +
    "and p.id = pic.productid " +
    "and p.adaccountid = '" + this.utilisateur["adaccount"]["id"] + "' " +
    "group by pic.id,pic.name,p.name " +
    "order by pic.id, max(pi.id) desc " +
    "limit 100 "
    )
    .subscribe(response => {
      console.log(response);
      this.dataInteresetCategory = response["features"];
    });

  }

  //fonction necessaire pour le filtre des fournisseurs
  getItems(ev) {
    // set val to the value of the ev target
    var val = ev.target.value;
    console.log(val);
    this.utilisateur["searchvalue"]=val;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.getData( val );
    }
  }

  public refresh(){
    this.utilisateurProvider.emitUtilisateur();
  }

  getData(interests : string){
  
    //this.utilisateurProvider.emitUtilisateur();
    this.http.get('https://graph.facebook.com/search?type=adinterest&limit=100&locale=en_US&q='+interests+'&access_token='+ this.utilisateur['credential']['accessToken'])
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

  async presentProductInterestCategory(item) {

    let inputsRadioCategory = [];

    for(let i = 0 ; i < this.dataInteresetCategory.length ;i++){

      inputsRadioCategory.push({
          name: this.dataInteresetCategory[i]["category"],
          type: 'radio',
          label: this.dataInteresetCategory[i]["category"],
          value: this.dataInteresetCategory[i]["id"]
      });

    }


    const alert = await this.alertController.create({
      header: 'Radio',
      inputs: inputsRadioCategory,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (category) => {
            console.log(category);
            this.http.get("http://192.168.8.102:9091/requestAny/insert into  public.product_interest(productinterestcatid,name) values ('"+category+"','"+item["name"]+"')")
            .subscribe(response => {
              console.log(response);
              this.data = response["features"];
            },err =>{
              console.log(err);
            });
            this.refreshProductInterestCategory();
          }
        }
      ]
    });

    await alert.present();
  }


  async addToProductInterestCategory(item){
    

    const modal = await this.modalController.create({
      component: AdInterestSearchListeProductPage,
      swipeToClose: true,
      animated:true,
      componentProps: {
        "itemInterestSearch": item
      }
    });
    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);     
    
  }


}
