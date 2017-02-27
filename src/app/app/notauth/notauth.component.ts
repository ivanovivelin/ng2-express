'use strict';

import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'not-auth',
    templateUrl: 'templates/notauth.component.html',
})

export class NotauthComponent {
  title = 'NotAuth';
  constructor() {}
    ngOnInit(): any {}
}