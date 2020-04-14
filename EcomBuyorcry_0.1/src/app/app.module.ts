import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Facebook } from '@ionic-native/facebook/ngx';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule } from '@angular/common/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ListeCampagnePage } from './liste-campagne/liste-campagne.page';

export const firebaseConfig = 
{
  apiKey: "AIzaSyBPiDrzSh1CSFy6rEsAdjOP7kLx_UIAM_Y",
  authDomain: "topomap-gps-miss-1531063633367.firebaseapp.com",
  databaseURL: "https://topomap-gps-miss-1531063633367.firebaseio.com",
  projectId: "topomap-gps-miss-1531063633367",
  storageBucket: "topomap-gps-miss-1531063633367.appspot.com",
  messagingSenderId: "925543537211",
  appId: "1:925543537211:web:7cdd5d80243ae9e3af1a1e",
  measurementId: "G-H35T9B7TTL"
}
;

@NgModule({
  declarations: [
    AppComponent
    
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Facebook,
    NativeStorage
    


  ],
  bootstrap: [
    AppComponent 
  ]
})
export class AppModule {}
