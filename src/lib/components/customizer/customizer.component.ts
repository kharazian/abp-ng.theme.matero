import {
  Component,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ViewChild,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { AppSettings, LayoutService } from '../../services/layout.service';
import { MatSidenav } from '@angular/material/sidenav';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html',
  styleUrls: ['./customizer.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CustomizerComponent implements OnInit, OnDestroy {
  @Output() optionsChange = new EventEmitter<AppSettings>();
  @Output() closePanel = new EventEmitter();

  options = this.layoutService.options;

  dragging = false;

  form = this.fb.nonNullable.group<AppSettings>({
    theme: 'light',
    showHeader: true,
    headerPos: 'fixed',
    showUserPanel: true,
    navPos: 'side',
    dir: 'ltr',
    sidenavOpened: true,
    sidenavCollapsed: true,
    language: 'en-CA',
  });

  formSubscription = Subscription.EMPTY;

  get isHeaderPosAbove() {
    return this.form.get('headerPos')?.value === 'above';
  }

  get isNavPosTop() {
    return this.form.get('navPos')?.value === 'top';
  }

  get isShowHeader() {
    return this.form.get('showHeader')?.value === true;
  }

  private readonly key = 'CRM-settings';

  constructor(
    private layoutService: LayoutService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form.patchValue(this.options);

    this.formSubscription = this.form.valueChanges.subscribe(value => {
      this.sendOptions(value as AppSettings);
    });
  }

  ngOnDestroy(): void {
  }

  sendOptions(options: AppSettings) {
    this.optionsChange.emit(options);
  }
}
