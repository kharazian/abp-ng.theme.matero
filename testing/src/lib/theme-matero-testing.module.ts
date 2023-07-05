import {
  BaseThemeMateroModule,
  MATERO_THEME_NAV_ITEM_PROVIDERS,
  MATERO_THEME_STYLES_PROVIDERS,
  ValidationErrorComponent,
} from '@abp/ng.theme.matero';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  VALIDATION_ERROR_TEMPLATE,
  VALIDATION_INVALID_CLASSES,
  VALIDATION_TARGET_SELECTOR,
} from '@ngx-validate/core';

@NgModule({
  exports: [BaseThemeMateroModule],
  imports: [BaseThemeMateroModule],
})
export class ThemeMateroTestingModule {
  static withConfig(): ModuleWithProviders<ThemeMateroTestingModule> {
    return {
      ngModule: ThemeMateroTestingModule,
      providers: [
        MATERO_THEME_NAV_ITEM_PROVIDERS,
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
      ],
    };
  }
}
