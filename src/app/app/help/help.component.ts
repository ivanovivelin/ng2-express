'use strict';

import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'help',
    templateUrl: 'templates/help.component.html',
})

export class HelpComponent {
  title = 'HelpComponent';
  constructor() {}
    ngOnInit(): any {}
}