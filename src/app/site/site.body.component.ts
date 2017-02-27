'use strict';

import { Component, HostBinding, OnInit } from '@angular/core';
import { LoginService } from '../modules/login';
import { Env } from '../modules/env';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { ViewContainerRef } from '@angular/core';
import { SocketService } from '../modules/socket';
//import { Store } from '@ngrx/store';

@Component({
    selector: 'site-body',
    templateUrl: 'templates/site.body.html',
})

export class SiteBodyComponent {
  title = 'Angular 2 Boilerplate';
  constructor(
    private env: Env,
    private loginService: LoginService,
    private snackbar: MdSnackBar,
    public  viewContainerRef: ViewContainerRef,
    private socket: SocketService,
    ) {}
    public ngOnInit(): void {
        console.info('$site.body (init)=> logging in');
        this.loginService.setUser();
        this.socket.getData({
                application: 'NG2',
                function: 'provideFilters',
                script: '/queueservice/filterbuilder',
                data: {
                    user: '',
                },
       });
    }
}
