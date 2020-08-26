import {
    Directive,
    OnInit,
    Output,
    OnDestroy,
    AfterViewInit,
    TemplateRef,
    ViewContainerRef,
    EventEmitter,
    Optional,
    Inject,
    ElementRef,
} from '@angular/core';
import { Subscription, fromEvent } from 'rxjs';
import { DOCUMENT } from '@angular/common';

import { filter, map, take } from 'rxjs/operators';

@Directive({
    selector: '[outsideClick]',
})
export class ClickOutsideDirective implements OnInit, OnDestroy, AfterViewInit {
    @Output('outsideClick') outsideClick = new EventEmitter<MouseEvent>();

    protected subscribtion: Subscription;

    public constructor(
        private element: ElementRef,
        @Optional() @Inject(DOCUMENT) private document: any,
    ) {}

    public ngOnInit(): void {
        setTimeout(() => {
            this.subscribtion = fromEvent<MouseEvent>(this.document, 'click')
                .pipe(
                    filter((event) => {
                        const clickTarget = event.target as HTMLElement;
                        return !this.removeDropdownListener(
                            this.element.nativeElement,
                            clickTarget,
                        );
                    }),
                )
                .subscribe((event) => this.outsideClick.emit());
        }, 0);
    }

    protected removeDropdownListener(
        element: HTMLElement,
        clickTarget: HTMLElement,
    ) {
        return element == clickTarget || element.contains(clickTarget);
    }

    public ngOnDestroy(): void {
        if (this.subscribtion) this.subscribtion.unsubscribe();
    }
    public ngAfterViewInit(): void {}
}
