'use strict';

import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'not-found',
    templateUrl: 'templates/notfound.component.html',
})

export class NotfoundComponent {
  title = 'NotFound';
  constructor() {}
    ngOnInit(): any {}
}
