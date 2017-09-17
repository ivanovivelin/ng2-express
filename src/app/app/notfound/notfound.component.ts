'use strict';

import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: 'templates/notfound.component.html',
})

export class NotfoundComponent implements OnInit {
    title = 'NotFound';
    constructor() {}
    public ngOnInit(): any {}
}
