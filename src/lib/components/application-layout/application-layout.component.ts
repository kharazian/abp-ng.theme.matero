import {
  Component,
  OnDestroy,
  ViewChild,
  HostBinding,
  Inject,
  Optional,
  ViewEncapsulation,
  AfterViewInit,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { eLayoutType, SubscriptionService } from '@abp/ng.core';
import { collapseWithMargin, slideFromBottom } from '@abp/ng.theme.shared';
import { MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { Directionality } from '@angular/cdk/bidi';
import { LayoutService, AppDirectionality, AppSettings } from '../../services';

const MOBILE_MEDIAQUERY = 'screen and (max-width: 1279.98px)';
const TABLET_MEDIAQUERY = 'screen and (min-width: 1280px) and (max-width: 1919.98px)';
const MONITOR_MEDIAQUERY = 'screen and (min-width: 1920px)';

@Component({
  selector: 'abp-layout-application',
  templateUrl: './application-layout.component.html',
  styleUrls: ['./application-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [slideFromBottom, collapseWithMargin],
  providers: [LayoutService, SubscriptionService],
})
export class ApplicationLayoutComponent implements AfterViewInit {
  // required for dynamic component
  static type = eLayoutType.application;

  @ViewChild('sidenav', { static: true }) sidenav!: MatSidenav;
  @ViewChild('sidenavEnd', { static: true }) sidenavEnd!: MatSidenav;
  @ViewChild('content', { static: true }) content!: MatSidenavContent;

  options = this.service.options;
  sideNavEndComponent = '';
  private layoutChangesSubscription = Subscription.EMPTY;

  get isOver(): boolean {
    return this.isMobileScreen;
  }

  private isMobileScreen = false;

  @HostBinding('class.crm-content-width-fix') get contentWidthFix() {
    return (
      this.isContentWidthFixed &&
      this.options.navPos === 'side' &&
      this.options.sidenavOpened &&
      !this.isOver
    );
  }

  private isContentWidthFixed = true;

  @HostBinding('class.crm-sidenav-collapsed-fix') get collapsedWidthFix() {
    return (
      this.isCollapsedWidthFixed &&
      (this.options.navPos === 'top' || (this.options.sidenavOpened && this.isOver))
    );
  }

  private isCollapsedWidthFixed = false;

  private htmlElement!: HTMLHtmlElement;

  constructor(
    public service: LayoutService,
    private router: Router,
    private mediaMatcher: MediaMatcher,
    private breakpointObserver: BreakpointObserver,
    @Optional() @Inject(DOCUMENT) private document: Document,
    @Inject(Directionality) public dir: AppDirectionality
  ) {
    this.dir.value = this.options.dir;
    this.document.body.dir = this.dir.value;

    this.htmlElement = this.document.querySelector('html')!;

    this.layoutChangesSubscription = this.breakpointObserver
      .observe([MOBILE_MEDIAQUERY, TABLET_MEDIAQUERY, MONITOR_MEDIAQUERY])
      .subscribe(state => {
        // SidenavOpened must be reset true when layout changes
        this.options.sidenavOpened = true;

        this.isMobileScreen = state.breakpoints[MOBILE_MEDIAQUERY];
        this.options.sidenavCollapsed = state.breakpoints[TABLET_MEDIAQUERY];
        this.isContentWidthFixed = state.breakpoints[MONITOR_MEDIAQUERY];
      });

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(e => {
      if (this.isOver) {
        this.sidenav.close();
      }
      this.content.scrollTo({ top: 0 });
    });

    if (this.options.theme === 'auto') {
      this.setAutoTheme();
    }

    // Initialize project theme with options
    this.receiveOptions(this.options);
  }

  ngAfterViewInit() {
    this.service.subscribeWindowSize();
  }

  ngOnDestroy() {
    this.layoutChangesSubscription.unsubscribe();
  }

  toggleCollapsed() {
    this.isContentWidthFixed = false;
    this.options.sidenavCollapsed = !this.options.sidenavCollapsed;
    this.resetCollapsedState();
  }

  // TODO: Trigger when transition end
  resetCollapsedState(timer = 400) {
    // setTimeout(() => this.settings.setOptions(this.options), timer);
  }

  onSidenavClosedStart() {
    this.isContentWidthFixed = false;
  }

  onSidenavOpenedChange(isOpened: boolean) {
    this.isCollapsedWidthFixed = !this.isOver;
    this.options.sidenavOpened = isOpened;
    // this.settings.setOptions(this.options);
  }

  setAutoTheme() {
    // Check whether the browser support `prefers-color-scheme`
    if (this.mediaMatcher.matchMedia('(prefers-color-scheme)').media !== 'not all') {
      const isSystemDark = this.mediaMatcher.matchMedia('(prefers-color-scheme: dark)').matches;
      // Set theme to dark if `prefers-color-scheme` is dark. Otherwise, set it to light.
      this.options.theme = isSystemDark ? 'dark' : 'light';
    } else {
      // If the browser does not support `prefers-color-scheme`, set the default to light.
      this.options.theme = 'light';
    }
  }

  // Demo purposes only

  receiveOptions(options: AppSettings): void {
    this.options = options;
    // this.settings.setOptions(options);
    this.toggleDarkTheme(options);
    this.toggleDirection(options);
  }

  toggleDarkTheme(options: AppSettings) {
    if (options.theme === 'dark') {
      this.htmlElement.classList.add('theme-dark');
    } else {
      this.htmlElement.classList.remove('theme-dark');
    }
  }

  toggleDirection(options: AppSettings) {
    this.dir.value = options.dir;
    this.document.body.dir = this.dir.value;
  }

  sideNavEndOpen(component: string) {
    this.sideNavEndComponent = component;
    this.sidenavEnd.toggle();
  }
}
