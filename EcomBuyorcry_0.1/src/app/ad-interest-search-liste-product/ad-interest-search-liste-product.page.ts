import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NavController,ModalController, NavParams } from '@ionic/angular';

import {Subscription} from "rxjs";
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { ListeCampagnePage } from '../liste-campagne/liste-campagne.page';
import { CreateProductPage } from '../create-product/create-product.page';
import { AdInterestSearchListeProductInterestsCategoryPage } from '../ad-interest-search-liste-product-interests-category/ad-interest-search-liste-product-interests-category.page';

@Component({
  selector: 'app-ad-interest-search-liste-product',
  templateUrl: './ad-interest-search-liste-product.page.html',
  styleUrls: ['./ad-interest-search-liste-product.page.scss'],
})
export class AdInterestSearchListeProductPage implements OnInit {

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
        public modalController: ModalController,
        public navParams: NavParams
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

    this.http.get("http://localhost:9091/requestAny/select * from public.product where adaccountid = '"+this.utilisateur["adaccount"]["id"]+"'")
    .subscribe(response => {
      console.log(response);
      this.data = response["features"];
    });
  }

  facebookLogin() {

    console.log("rrr"); 
    this.utilisateurProvider.connection();

  } 

  async itemTapped(event, item) {


    let modal ;

    modal = await this.modalController.create({
      component: AdInterestSearchListeProductInterestsCategoryPage,
      swipeToClose: true,
      animated:true,
      componentProps: {
        "adaccountid": this.utilisateur["adaccount"]["id"],
        "itemInterestSearch":this.navParams.get('itemInterestSearch')
      }
    });

    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);    




  }

  async createProduct() {
    let modal ;
    
    console.log(this.navParams.get('itemInterestSearch'));

    if(this.navParams.get('itemInterestSearch')){
      modal = await this.modalController.create({
        component: CreateProductPage,
        swipeToClose: true,
        animated:true,
        componentProps: {
          "adaccountid": this.utilisateur["adaccount"]["id"],
          "itemInterestSearch":this.navParams.get('itemInterestSearch')
        }
      });

    }

    modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data);        

  }

  deleteProduct(event:Event,item:any){
    //event.preventDefault();
    event.stopPropagation();
    console.log(item);
  }

  dismissModal() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({"productname":"led light"});

  }   


}
