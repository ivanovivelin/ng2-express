'use strict';
import { Component, HostBinding, OnInit } from '@angular/core';
@Component({
    selector: 'app-site-header',
    templateUrl: 'templates/site.header.html',
})

export class SiteHeaderComponent implements OnInit{
    public user: string;

    public ngOnInit(): any {
    }
}

