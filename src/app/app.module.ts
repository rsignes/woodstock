import { HomePage } from './../pages/home/home';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { StocksPage } from '../pages/stocks/stocks';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import StorageService from './shared/services/storage.service';
import ResourcePipe from './shared/pipes/resource.pipe';
import StockCrudComponent from './shared/components/stock-crud/stock-crud.component';

@NgModule({
  declarations: [
    MyApp,
    StocksPage,
    HomePage,
    ResourcePipe,
    StockCrudComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    /* 
      this module stores key/value pairs and JSON objects in the context's
      storage (SQLite, IndexedDB, WebSQL, or localstorage)
    */
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['localstorage', 'sqlite', 'websql', 'indexeddb']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    StocksPage,
    HomePage,
    StockCrudComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StorageService
  ]
})
export class AppModule {}
