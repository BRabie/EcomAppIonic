import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { AlertController, PickerController } from '@ionic/angular';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-adset-statistics',
  templateUrl: './adset-statistics.page.html',
  styleUrls: ['./adset-statistics.page.scss'],
})
export class AdsetStatisticsPage  {
  // Data
  chartData  = [{data:[],label:"No Data"}];
  chartLabels: Label[];
 
  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Ad Set Evolution'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };

  chartColors: Color[] = [
    {
      borderColor: '#ff0000',
      backgroundColor: '#000000'
    },
    {
      borderColor: '#ffff00',
      backgroundColor: '#000000'
    },
    {
      borderColor: '#00ff00',
      backgroundColor: '#000000'
    },
    {
      borderColor: '#0000ff',
      backgroundColor: '#000000'
    }
  ];

  chartType = 'line';
  showLegend = false;
 
  // For search
  stock = '';

  public indicateurs = ["cpc","cpm","ctr","clicks"];
 
  constructor(
    private http: HttpClient,
    private pickerController: PickerController
    ) {

    this.getData();
  }
 
  getData() {
      this.http.get("http://192.168.8.102:9091/requestAny/select * from public.oldinsight order by id asc" ).subscribe(res => {
      const history = res['features'];

      console.log(history);
 
      this.chartLabels = [];
      this.chartData = [];

      for(let i = 0; i < this.indicateurs.length; i++){
        this.chartData.push({
        "data":[],
        "label":this.indicateurs[i]
      });
      }
 
      let dayTest = new Date();
      for (let entry of history) {
        //on alimente la date puisqu'elle n'existe pas encore dans la bdd
        dayTest.setDate(dayTest.getDate() + 1);
        this.chartLabels.push(dayTest.getDate().toString() + "-" + dayTest.getMonth().toString() + "-" + dayTest.getFullYear().toString());


        for(let i = 0; i < this.indicateurs.length; i++){
          this.chartData[i].data.push(entry[this.indicateurs[i]]);
        }
      }
    });
  }
 
  typeChanged(e) {
    const on = e.detail.checked;
    this.chartType = on ? 'line' : 'bar';
  }
}
