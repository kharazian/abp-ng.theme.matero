import { ConfigStateService, LanguageInfo, SessionStateService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'abp-languages',
  template: `
    @if (((dropdownLanguages$ | async)?.length || 0) > 0) {
      <button mat-icon-button [matMenuTriggerFor]="menu">
        <mat-icon>translate</mat-icon>
      </button>
    }
    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of dropdownLanguages$ | async" (click)="onChangeLang(lang.cultureName || '')">
        <span [ngStyle]="{ color: (lang?.displayName === (defaultLanguage$ | async)) ? 'blue' : 'rgba(0,0,0,.54)' }">
        {{ lang?.displayName}}
        </span>
      </button>
    </mat-menu>
  `,
})
export class LanguagesComponent {
  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  languages$: Observable<LanguageInfo[]> = this.configState.getDeep$('localization.languages');

  get defaultLanguage$(): Observable<string> {
    return this.languages$.pipe(
      map(
        languages =>
          languages?.find(lang => lang.cultureName === this.selectedLangCulture)?.displayName || '',
      ),
    );
  }

  get dropdownLanguages$(): Observable<LanguageInfo[]> {
    return this.languages$;
  }

  get selectedLangCulture(): string {
    return this.sessionState.getLanguage();
  }

  constructor(private sessionState: SessionStateService, private configState: ConfigStateService) {}

  onChangeLang(cultureName: string) {
    this.sessionState.setLanguage(cultureName);
  }
}
