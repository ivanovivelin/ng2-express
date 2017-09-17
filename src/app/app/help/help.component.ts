'use strict';

import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'help-component',
    templateUrl: 'templates/help.component.html',
})

export class HelpComponent implements OnInit{
  title = 'HelpComponent';
  constructor() {}
    public ngOnInit(): any {}
}
