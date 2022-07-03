import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';
import { CriticPageModule } from './critic/critic.module';
import { SignaturePad, SignaturePadModule } from 'angular2-signaturepad';

import { File } from '@awesome-cordova-plugins/file/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,  HttpClientModule, IonicModule.forRoot(),SignaturePadModule, AppRoutingModule],
  providers:[ ,{ provide: RouteReuseStrategy,  useClass: IonicRouteStrategy },FileOpener,File,EmailComposer],
  bootstrap: [AppComponent],
})
export class AppModule {}
