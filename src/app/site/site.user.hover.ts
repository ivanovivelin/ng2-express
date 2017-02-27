'use strict';

import { Directive, ElementRef, Renderer} from '@angular/core';

@Directive({
    selector: '[siteUserHover]',
    host: {
        '(mouseenter)': 'onMouseEnter()',
        '(mouseleave)': 'onMouseLeave()',
    },
})

export class SiteUserHover {


    constructor(private el: ElementRef, private renderer: Renderer) { }

    onMouseEnter(): any {
        this.renderer.setElementClass(this.el.nativeElement, 'active', true);
    }
    onMouseLeave(): any {
        this.renderer.setElementClass(this.el.nativeElement, 'active', false);
    }

}
