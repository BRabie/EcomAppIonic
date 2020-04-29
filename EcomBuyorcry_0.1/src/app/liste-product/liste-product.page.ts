import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NavController,ModalController, NavParams, AlertController, Platform, ToastController } from '@ionic/angular';

import {Subscription} from "rxjs";
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { ListeCampagnePage } from '../liste-campagne/liste-campagne.page';
import { ListeProductInterestsCategoryPage } from '../liste-product-interests-category/liste-product-interests-category.page';
import { Papa } from 'ngx-papaparse';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';
import { CssSelector } from '@angular/compiler';

@Component({
  selector: 'app-liste-product',
  templateUrl: './liste-product.page.html',
  styleUrls: ['./liste-product.page.scss'],
})
export class ListeProductPage implements OnInit {

  loading: any;
  providerFb: firebase.auth.FacebookAuthProvider;

  public utilisateurSubscription : Subscription;
  public utilisateur : any;

  public data = [];
  public getRequest = "me/adaccounts?fields=name";

  public pushPage = ListeCampagnePage;

  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(
        public navCtrl: NavController, 
        public utilisateurProvider: UtilisateurService,
        public http :HttpClient,
        public router:Router,
        public modalController: ModalController,
        public alertController: AlertController,
        private papa: Papa,
        private plt: Platform,
        private file: File,
        private socialSharing: SocialSharing,
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

    this.http.get("http://192.168.8.102:9091/requestAny/select * from public.product where adaccountid = '"+this.utilisateur["adaccount"]["id"]+"' order by id desc")
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

    this.utilisateur["product"] = item;
    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    this.navCtrl.navigateForward("liste-product-interests-category");
    this.presentToastWithOptions(item);

  }

  exportViewProductCategories(event, item) {

    this.utilisateur["product"] = item;
    this.utilisateurProvider.updateUtilisateur(this.utilisateur);
    this.navCtrl.navigateForward("export-product-categories");

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


  async deleteProduct(event,item) {
    console.log(item);
    const alert = await this.alertController.create({
      header: 'Warning!',
      message: 'Are you sure to delete this product',
      mode : "ios",
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

            this.http.get("http://192.168.8.102:9091/requestAny/delete from public.product  where id = " +  item.id)
            .subscribe(response => {
              console.log(response);
              this.data = response["features"];
            },err =>{
              console.log(err);
              this.deleteAlert();
              this.getData();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async createProduct() {
    const alert = await this.alertController.create({
      header: 'New Product',
      mode : "ios",
      //message: 'Product Name',
      inputs: [
        {
          name: 'productName',
          id: 'productName',
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

            console.log(data["productName"]);
            this.http.get("http://192.168.8.102:9091/requestAny/insert into  public.product(adaccountid,name) values ('"+this.utilisateur["adaccount"]["id"]+"','"+data["productName"]+"')")
            .subscribe(response => {
              console.log(response);
              this.data = response["features"];
            },err =>{
              console.log(err);
              this.createAlert();
              this.getData();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async editProduct(event,item) {
    console.log(item);
    const alert = await this.alertController.create({
      header: 'New Product',
      mode : "ios",
      //message: 'Product Name',
      inputs: [
        {
          name: 'productName',
          id: 'productName',
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

            console.log(data["productName"]);
            this.http.get("http://192.168.8.102:9091/requestAny/update public.product set name = '" + data["productName"] + "' where id = " +  item.id)
            .subscribe(response => {
              console.log(response);
              this.data = response["features"];
            },err =>{
              console.log(err);
              this.editAlert();
              this.getData();
            });
          }
        }
      ]
    });

    await alert.present();
  }


  async deleteAlert(){

    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: 'Item deleted successfuly!',
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


  async createAlert(){

    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: 'Item successfuly created',
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

  async editAlert(){

    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: 'Item successfuly edited',
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
