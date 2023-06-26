import { NavItemsService } from '@abp/ng.theme.shared';
import { APP_INITIALIZER } from '@angular/core';
import { CurrentUserComponent } from '../components/nav-items/current-user.component';
import { LanguagesComponent } from '../components/nav-items/languages.component';
import { eThemeMateroComponents } from '../enums/components';

export const MATERO_THEME_NAV_ITEM_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: configureNavItems,
    deps: [NavItemsService],
    multi: true,
  },
];

export function configureNavItems(navItems: NavItemsService) {
  return () => {
    navItems.addItems([
      {
        id: eThemeMateroComponents.Languages,
        order: 100,
        component: LanguagesComponent,
      },
      {
        id: eThemeMateroComponents.CurrentUser,
        order: 100,
        component: CurrentUserComponent,
      },
    ]);
  };
}
