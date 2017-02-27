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
import { MaterialModule } from '@angular/material';
import { SiteComponents } from './site/site.components';
import { SiteBodyComponent } from './site/site.body.component';
import { SiteMastheadComponent } from './site/site.masthead.component';
import { NotfoundComponent } from './app/notfound/notfound.component';
import { NotauthComponent } from './app/notauth/notauth.component';
import { HomeMainComponent } from './app/home/home.main.component';
import { HelpComponent } from './app/help/help.component';
import { Routing } from './main.routing';
import { MessagesModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { PasswordModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { DialogModule } from 'primeng/primeng';
import {MenubarModule, MenuItem} from 'primeng/primeng';
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
    MenubarModule,
    HttpModule,
    MaterialModule.forRoot(),
    Routing,
    ReactiveFormsModule,
     MessagesModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    DataTableModule,
    SharedModule,
    DialogModule,
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
