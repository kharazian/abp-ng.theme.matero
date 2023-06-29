import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, ConfigStateService, CurrentUserDto } from '@abp/ng.core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-panel',
  template: `
    <div class="crm-user-panel">
      <img
        class="crm-user-panel-avatar"
        [src]="(currentUser$ | async)?.avatar || './assets/images/avatar.jpg'"
        alt="avatar"
        width="64"
      />
      <h4 class="crm-user-panel-name">{{ (currentUser$ | async)?.name }}</h4>
      <h5 class="crm-user-panel-email">{{ (currentUser$ | async)?.email }}</h5>
      <div class="crm-user-panel-icons">
        <button
          mat-icon-button
          routerLink="/profile/overview"
          matTooltip="{{ '::profile' | abpLocalization }}"
        >
          <mat-icon class="icon-18">account_circle</mat-icon>
        </button>
        <button
          mat-icon-button
          routerLink="/profile/settings"
          matTooltip="{{ '::edit_profile' | abpLocalization }}"
        >
          <mat-icon class="icon-18">edit</mat-icon>
        </button>
        <button mat-icon-button (click)="logout()" matTooltip="{{ '::logout' | abpLocalization }}">
          <mat-icon class="icon-18">exit_to_app</mat-icon>
        </button>
      </div>
    </div>
  `,
  styleUrls: ['./user-panel.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserPanelComponent {
  currentUser$: Observable<CurrentUserDto> = this.configState.getOne$('currentUser');

  constructor(private authService: AuthService, private configState: ConfigStateService) {}

  logout() {
    this.authService.logout().subscribe();
  }
}
