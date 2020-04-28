import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NavController,ModalController, NavParams, AlertController } from '@ionic/angular';

import {Subscription} from "rxjs";
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { ListeCampagnePage } from '../liste-campagne/liste-campagne.page';

@Component({
  selector: 'app-liste-product-interest',
  templateUrl: './liste-product-interest.page.html',
  styleUrls: ['./liste-product-interest.page.scss'],
})
export class ListeProductInterestPage implements OnInit {

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
        public alertController: AlertController
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

    this.http.get("http://localhost:9091/requestAny/select * from public.product_interest where productinterestcatid = "+this.utilisateur["interestcategory"]["id"]+" order by id desc")
    .subscribe(response => {
      console.log(response);
      this.data = response["features"];
    });
  }

  facebookLogin() {

    console.log("rrr"); 
    this.utilisateurProvider.connection();

  } 

  
  itemTapped(event, item) {

    this.utilisateur["interest"] = item;
    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    this.navCtrl.navigateForward("ad-interest-search");

  }


  async deleteProductInterest(event,item) {
    console.log(item);
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: 'Are you sure to delete this interest',
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
          handler: (data) => {

            this.http.get("http://localhost:9091/requestAny/delete from public.product_interest  where id = " +  item.id)
            .subscribe(response => {
              console.log(response);
              this.data = response["features"];
            },err =>{
              console.log(err);
              this.getData();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async createProductInterest() {
    const alert = await this.alertController.create({
      header: 'New Interest',
      //message: 'Product Name',
      inputs: [
        {
          name: 'interestName',
          id: 'interestName',
          type: 'text',
          placeholder: 'Katty Perry...'
        }
      ],
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
          handler: (data) => {

            console.log(data["productName"]);
            this.http.get("http://localhost:9091/requestAny/insert into  public.product_interest(productinterestcatid,name) values ('"+this.utilisateur["interestcategory"]["id"]+"','"+data["interestName"]+"')")
            .subscribe(response => {
              console.log(response);
              this.data = response["features"];
            },err =>{
              console.log(err);
              this.getData();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async editProductInterest(event,item) {
    console.log(item);
    const alert = await this.alertController.create({
      header: 'Edit Interest',
      //message: 'Product Name',
      inputs: [
        {
          name: 'interestName',
          id: 'interestName',
          value: item.name,
          type: 'text',
          placeholder: 'Product Name'
        }
      ],
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
          handler: (data) => {

            this.http.get("http://localhost:9091/requestAny/update public.product_interest set name = '" + data["interestName"] + "' where id = " +  item.id)
            .subscribe(response => {
              console.log(response);
              this.data = response["features"];
            },err =>{
              console.log(err);
              this.getData();
            });
          }
        }
      ]
    });

    await alert.present();
  }


}
