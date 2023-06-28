import { RouterEvents, SubscriptionService } from '@abp/ng.core';
import { ChangeDetectorRef, Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { eThemeMateroComponents } from '../enums';

@Injectable()
export class LayoutService {
  isCollapsed = true;

  smallScreen!: boolean; // do not set true or false

  logoComponentKey = eThemeMateroComponents.Logo;

  routesComponentKey = eThemeMateroComponents.Routes;

  navItemsComponentKey = eThemeMateroComponents.NavItems;

  options: AppSettings = {
    navPos: 'side',
    dir: 'ltr',
    theme: 'light',
    showHeader: true,
    headerPos: 'fixed',
    showUserPanel: true,
    sidenavOpened: true,
    sidenavCollapsed: true,
    language: 'en-CA',
  };

  constructor(
    private subscription: SubscriptionService,
    private cdRef: ChangeDetectorRef,
    routerEvents: RouterEvents
  ) {
    subscription.addOne(routerEvents.getNavigationEvents('End'), () => {
      this.isCollapsed = true;
    });
  }

  private checkWindowWidth() {
    const isSmallScreen = window.innerWidth < 992;
    if (isSmallScreen && this.smallScreen === false) {
      this.isCollapsed = false;
      setTimeout(() => {
        this.isCollapsed = true;
      }, 100);
    }
    this.smallScreen = isSmallScreen;
    this.cdRef.detectChanges();
  }

  subscribeWindowSize() {
    this.checkWindowWidth();

    const resize$ = fromEvent(window, 'resize').pipe(debounceTime(150));
    this.subscription.addOne(resize$, () => this.checkWindowWidth());
  }
}

export interface AppSettings {
  navPos: 'side' | 'top';
  dir: 'ltr' | 'rtl';
  theme: 'light' | 'dark' | 'auto';
  showHeader: boolean;
  headerPos: 'fixed' | 'static' | 'above';
  showUserPanel: boolean;
  sidenavOpened: boolean;
  sidenavCollapsed: boolean;
  language: string;
}

export const defaults: AppSettings = {
  navPos: 'side',
  dir: 'ltr',
  theme: 'light',
  showHeader: true,
  headerPos: 'fixed',
  showUserPanel: true,
  sidenavOpened: true,
  sidenavCollapsed: true,
  language: 'en-CA',
};
