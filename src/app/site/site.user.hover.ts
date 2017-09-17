'use strict';

import { Directive, ElementRef, Renderer, HostListener, HostBinding } from '@angular/core';

@Directive({
    selector: 'app-user-hover'
})

export class SiteUserHoverDirective {

    constructor(private el: ElementRef, private renderer: Renderer) {}

    @HostBinding('mouseenter') onMouseEnter(): any {
        this.renderer.setElementClass(this.el.nativeElement, 'active', true);
    }
    @HostBinding('mouseenter') onMouseLeave(): any {
        this.renderer.setElementClass(this.el.nativeElement, 'active', false);
    }

}

