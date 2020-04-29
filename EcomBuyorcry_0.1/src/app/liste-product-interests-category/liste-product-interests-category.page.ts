import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NavController,ModalController, NavParams, AlertController } from '@ionic/angular';

import {Subscription} from "rxjs";
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { ListeCampagnePage } from '../liste-campagne/liste-campagne.page';

@Component({
  selector: 'app-liste-product-interests-category',
  templateUrl: './liste-product-interests-category.page.html',
  styleUrls: ['./liste-product-interests-category.page.scss'],
})
export class ListeProductInterestsCategoryPage implements OnInit {

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

    this.http.get("http://192.168.8.102:9091/requestAny/select * from public.product_interest_cat where productid = "+this.utilisateur["product"]["id"]+" order by id desc")
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

    this.utilisateur["interestcategory"] = item;
    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    this.navCtrl.navigateForward("liste-product-interest");

  }


  async deleteProductInterestCategory(event,item) {
    console.log(item);
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: 'Are you sure to delete this category',
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

            this.http.get("http://192.168.8.102:9091/requestAny/delete from public.product_interest_cat  where id = " +  item.id)
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

  async createProductInterestCategory() {
    const alert = await this.alertController.create({
      header: 'New Category',
      //message: 'Product Name',
      inputs: [
        {
          name: 'categoryInterestName',
          id: 'categoryInterestName',
          type: 'text',
          placeholder: 'Animals...'
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
            this.http.get("http://192.168.8.102:9091/requestAny/insert into  public.product_interest_cat(productid,name) values ('"+this.utilisateur["product"]["id"]+"','"+data["categoryInterestName"]+"')")
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

  async editProductInterestCategory(event,item) {
    console.log(item);
    const alert = await this.alertController.create({
      header: 'Edit Category',
      //message: 'Product Name',
      inputs: [
        {
          name: 'categoryInterestName',
          id: 'categoryInterestName',
          value: item.name,
          type: 'text',
          placeholder: 'Animals...'
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

            this.http.get("http://192.168.8.102:9091/requestAny/update public.product_interest_cat set name = '" + data["categoryInterestName"] + "' where id = " +  item.id)
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
