import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { LocalStorage } from './modules/local.storage';
import { LoginService } from './modules/login';
import { Env } from './modules/env';
import { DTS } from './modules/dts';
import { SiteComponents } from './site/site.components';
import { SiteBodyComponent } from './site/site.body.component';
import { SiteMastheadComponent } from './site/site.masthead.component';
import { NotfoundComponent } from './app/notfound/notfound.component';
import { NotauthComponent } from './app/notauth/notauth.component';
import { HomeMainComponent } from './app/home/home.main.component';
import { HelpComponent } from './app/help/help.component';
import { Routing } from './main.routing';
import { SocketService } from './modules/socket';
@NgModule({
  declarations: [
    SiteBodyComponent,
    SiteMastheadComponent,
    HelpComponent,
    NotfoundComponent,
    NotauthComponent,
    HomeMainComponent,
    ...SiteComponents,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
    ReactiveFormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    DTS,
    Env,
    JwtHelper,
    LoginService,
    LocalStorage,
    SocketService,
  ],
  bootstrap: [SiteBodyComponent],
})
export class AppModule { }
