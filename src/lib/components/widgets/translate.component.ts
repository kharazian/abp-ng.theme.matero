import { Component } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import { SettingsService } from '@core';

@Component({
  selector: 'app-translate',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon>translate</mat-icon>
    </button>

    <mat-menu #menu="matMenu">
      <button mat-menu-item *ngFor="let lang of langs | keyvalue" (click)="useLanguage(lang.key)">
        <span [ngStyle]="{ color: lang.key === currentLanguage ? 'blue' : 'rgba(0,0,0,.54)' }">{{
          lang.value
        }}</span>
      </button>
    </mat-menu>
  `,
})
export class TranslateComponent {
  langs = {
    'en-CA': 'English',
    'zh-CN': '中文简体',
  };
  currentLanguage = '';

  constructor() {}
  // constructor(private translate: TranslateService, private settings: SettingsService) {
  //   translate.addLangs(['en-CA', 'zh-CN']);
  //   this.currentLanguage = settings.getLanguage();
  // }

  useLanguage(language: string) {
    // this.translate.use(language);
    // this.settings.setLanguage(language);
    // this.currentLanguage = this.settings.getLanguage();
  }
}
