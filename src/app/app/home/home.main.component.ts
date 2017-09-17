'use strict';

import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-main',
    templateUrl: 'templates/home.main.html',
})

export class HomeMainComponent implements OnInit {
    title = 'Home component';
    constructor() {
        //
    }
    public ngOnInit(): any {}
}
