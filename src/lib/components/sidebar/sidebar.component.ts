import { Component, Output, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { LayoutService } from '../../services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [LayoutService],
  encapsulation: ViewEncapsulation.None,
})
export class SidebarComponent {
  @Input() showToggle = true;
  @Input() showUser = true;
  @Input() showHeader = true;
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();

  constructor(public service: LayoutService) {}
}
