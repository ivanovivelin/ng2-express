'use strict';

import { Component, HostBinding, OnInit } from '@angular/core';
import { LoginService } from '../modules/login';
import { Env } from '../modules/env';
import { ViewContainerRef } from '@angular/core';
import {SocketService} from '../modules/socket';
import {MdChipsModule, MdChipList} from '@angular/material';
// import { Store } from '@ngrx/store';

@Component({
    selector: 'app-site-body',
    templateUrl: 'templates/site.body.html',
})

export class SiteBodyComponent implements OnInit {
  title = '';
  word = '';
  public results: any;
  constructor(
    private env: Env,
    private loginService: LoginService,
    public  viewContainerRef: ViewContainerRef,
    private socket: SocketService,
    ) {}
    public ngOnInit(): void {
        console.log('$site.body (init)=> logging in');
        this.socket.listen(`anagrams.component`).subscribe(data => {
            this.results = data.data;
        });
    }

    public sendMessage(str: any) {
        console.log(`Entered word is => `, str);
        this.socket.module('all', {
            data: {
                word: str
            },
            script: `anagrams/anagrams`,
            function: `checkIfAnagram`
        });
    }
}

