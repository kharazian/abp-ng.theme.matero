import {
  AuthService,
  ConfigStateService,
  CurrentUserDto,
  NAVIGATE_TO_MANAGE_PROFILE,
  SessionStateService,
} from '@abp/ng.core';
import { UserMenu, UserMenuService } from '@abp/ng.theme.shared';
import { Component, Inject, TrackByFunction } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'abp-current-user',
  templateUrl: './current-user.component.html',
  styles: [
    `
      .avatar {
        width: 24px;
        height: 24px;
      }
    `,
  ],
})
export class CurrentUserComponent {
  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');
  selectedTenant$ = this.sessionState.getTenant$();
  defaultAvatar = './assets/images/avatar.jpg';
  trackByFn: TrackByFunction<UserMenu> = (_, element) => element.id;

  get smallScreen(): boolean {
    return window.innerWidth < 992;
  }

  constructor(
    @Inject(NAVIGATE_TO_MANAGE_PROFILE) public readonly navigateToManageProfile: () => void,
    public readonly userMenu: UserMenuService,
    private authService: AuthService,
    private configState: ConfigStateService,
    private sessionState: SessionStateService
  ) {}

  navigateToLogin() {
    this.authService.navigateToLogin();
  }

  logout() {
    this.authService.logout().subscribe();
  }
}
