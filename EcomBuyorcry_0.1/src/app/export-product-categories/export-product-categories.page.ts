import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  NavController,ModalController, NavParams, AlertController, Platform } from '@ionic/angular';

import {Subscription, concat} from "rxjs";
import { UtilisateurService } from '../services/utilisateur.service';
import { HttpClient } from '@angular/common/http';
import { ListeCampagnePage } from '../liste-campagne/liste-campagne.page';
import { ListeProductInterestsCategoryPage } from '../liste-product-interests-category/liste-product-interests-category.page';
import { Papa } from 'ngx-papaparse';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File } from '@ionic-native/file/ngx';

import { ViewEncapsulation } from '@angular/core';



export interface Data {
  movies: string;
}

@Component({
  selector: 'app-export-product-categories',
  templateUrl: './export-product-categories.page.html',
  styleUrls: ['./export-product-categories.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExportProductCategoriesPage implements OnInit {

  csvData: any[] = [];
  headerRow: any[] = [];

  public utilisateurSubscription : Subscription;
  public utilisateur : any;

  public data : any;
  public columns: any;
  public rows: any;

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
    private socialSharing: SocialSharing
  ) {

    this.utilisateurProvider.getUser().then(user =>{
      this.utilisateur = user;
      this.loadCSV();



      /*
  
      this.http.get('../../assets/movies.json')
        .subscribe((res) => {
          console.log(res)
          this.rows = res["movies"];
        });

        */


    });

   }

  ngOnInit() {
  }

  private loadCSV() {


    this.http.get("http://localhost:9091/requestAny/"+
    "select pic.name as category, string_agg(pi.name, ',,') as interests " +
    "from product_interest_cat as pic "+
    "left join product_interest as pi on pic.id = pi.productinterestcatid " +
    "where pic.productid = 1 " +
    //"and p.adaccountid = '" + this.utilisateur["adaccount"]["id"] + "' " +
    "group by pic.name  "

    )
    .subscribe(response => {

      this.headerRow = response["features"].map( x => x["category"]);
      this.csvData = []
      let csvTemp = response["features"].map( x => x["interests"]);
      let csvDataFinal = [];
      console.log(csvTemp);

      let maxCategory = 0;
      //on recupere la plus longue colonne
      for(let i = 0; i < csvTemp.length; i++){

        if(csvTemp[i] && csvTemp[i].split(",,").length > maxCategory ){
          maxCategory = csvTemp[i].split(",,").length
        }
        
      }

      //on construit la data
      for(let i = 0; i < maxCategory; i++){

        let t = [];

        for(let j = 0; j < this.headerRow.length; j++){

          if(csvTemp[j] && csvTemp[j].split(",,").length >=  i+1 ){
            t.push(csvTemp[j].split(",,")[i]);
          }else{
            t.push("");
          }

        }

        this.csvData.push(t);


      }

      this.rows = [];
      this.columns = [];
      for(let i = 0; i < this.csvData.length ; i++ ){

        let temp = {};

        for(let j = 0; j < this.csvData[0].length ; j++ ){

          temp[this.headerRow[j]] = this.csvData[i][j];

        }

        this.rows.push(temp);

      }

      for(let j = 0; j < this.headerRow.length ; j++ ){

        this.columns.push({"name":this.headerRow[j],"prop":this.headerRow[j]});

      }

      console.log(this.columns);

      console.log(this.rows);


    });
  }

  private extractData(res) {
    let csvData = res || '';
    console.log(csvData);

 
    this.papa.parse(csvData, {
      delimiter: "\t",
      complete: parsedData => {
        console.log(parsedData);
        console.log(parsedData.data.splice(0, 1));
        this.headerRow = parsedData.data.splice(0, 1)[0];
        this.csvData = parsedData.data;
      }
    });
  }
 
  exportCSV() {
    let csv = this.papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
 
    if (this.plt.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, 'data.xls', csv, {replace: true}).then( res => {
        this.socialSharing.share(null, null, res.nativeURL, null).then(e =>{
          // Success
        }).catch(e =>{
          console.log('Share failed:', e)
        });
      }, err => {
        console.log('Error: ', err);
      });
 
    } else {
      // Dummy implementation for Desktop download purpose
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'newdata.xls';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
 
  trackByFn(index: any, item: any) {
    return index;
  }

}
