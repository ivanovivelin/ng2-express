'use strict';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-auth',
    templateUrl: 'templates/notauth.component.html',
})

export class NotAuthComponent implements OnInit {
  title = 'NotAuth';
  constructor() {}
    public ngOnInit(): any {}
}
