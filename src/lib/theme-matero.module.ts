import { CoreModule, noop } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';
import { NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgxValidateCoreModule,
  VALIDATION_ERROR_TEMPLATE,
  VALIDATION_INVALID_CLASSES,
  VALIDATION_TARGET_SELECTOR,
} from '@ngx-validate/core';
import { AccountLayoutComponent } from './components/account-layout/account-layout.component';
import { AuthWrapperComponent } from './components/account-layout/auth-wrapper/auth-wrapper.component';
import { TenantBoxComponent } from './components/account-layout/tenant-box/tenant-box.component';
import { ApplicationLayoutComponent } from './components/application-layout/application-layout.component';
import { EmptyLayoutComponent } from './components/empty-layout/empty-layout.component';
import { LogoComponent } from './components/logo/logo.component';
import { CurrentUserComponent } from './components/nav-items/current-user.component';
import { LanguagesComponent } from './components/nav-items/languages.component';
import { NavItemsComponent } from './components/nav-items/nav-items.component';
import { PageAlertContainerComponent } from './components/page-alert-container/page-alert-container.component';
import { RoutesComponent } from './components/routes/routes.component';
import { ValidationErrorComponent } from './components/validation-error/validation-error.component';
import { LazyStyleHandler } from './handlers/lazy-style.handler';
import { MATERO_THEME_NAV_ITEM_PROVIDERS } from './providers/nav-item.provider';
import { MATERO_THEME_STYLES_PROVIDERS } from './providers/styles.provider';
import { MATERO_THEME_USER_MENU_PROVIDERS } from './providers/user-menu.provider';

import { MaterialModule} from "./material.module";
import { HeaderComponent } from "./components/header/header.component";
import { NotificationComponent } from "./components/widgets/notification.component";

export const LAYOUTS = [ApplicationLayoutComponent, AccountLayoutComponent, EmptyLayoutComponent];

@NgModule({
  declarations: [
    ...LAYOUTS,
    ValidationErrorComponent,
    LogoComponent,
    NavItemsComponent,
    RoutesComponent,
    CurrentUserComponent,
    LanguagesComponent,
    PageAlertContainerComponent,
    TenantBoxComponent,
    AuthWrapperComponent,
    HeaderComponent,
    NotificationComponent,
  ],
  exports: [
    ...LAYOUTS,
    ValidationErrorComponent,
    LogoComponent,
    NavItemsComponent,
    RoutesComponent,
    CurrentUserComponent,
    LanguagesComponent,
    PageAlertContainerComponent,
    HeaderComponent,
  ],
  imports: [
    CoreModule,
    ThemeSharedModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    MaterialModule,
  ],
})
export class BaseThemeMateroModule {}

@NgModule({
  exports: [BaseThemeMateroModule],
  imports: [BaseThemeMateroModule],
})
export class ThemeMateroModule {
  static forRoot(): ModuleWithProviders<ThemeMateroModule> {
    return {
      ngModule: ThemeMateroModule,
      providers: [
        MATERO_THEME_NAV_ITEM_PROVIDERS,
        MATERO_THEME_USER_MENU_PROVIDERS,
        MATERO_THEME_STYLES_PROVIDERS,
        {
          provide: VALIDATION_ERROR_TEMPLATE,
          useValue: ValidationErrorComponent,
        },
        {
          provide: VALIDATION_TARGET_SELECTOR,
          useValue: '.form-group',
        },
        {
          provide: VALIDATION_INVALID_CLASSES,
          useValue: 'is-invalid',
        },
        LazyStyleHandler,
        {
          provide: APP_INITIALIZER,
          useFactory: noop,
          multi: true,
          deps: [LazyStyleHandler],
        },
      ],
    };
  }
}
