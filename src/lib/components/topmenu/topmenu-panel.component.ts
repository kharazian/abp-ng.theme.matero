import {
  Component,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { NavigationEnd, Router, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TopmenuState } from './topmenu.component';
import { ABP, RoutesService, TreeNode } from '@abp/ng.core';

@Component({
  selector: 'app-topmenu-panel',
  templateUrl: './topmenu-panel.component.html',
})
export class TopmenuPanelComponent {
  @ViewChild(MatMenu, { static: true }) menuPanel!: MatMenu;

  @Input() items;
  @Input() parentRoute: string[] = [];
  @Input() level = 1;
  @Output() routeChange = new EventEmitter<any>();

  constructor(public readonly routesService: RoutesService) {}

  isDropdown(node: TreeNode<ABP.Route>) {
    return !node?.isLeaf || this.routesService.hasChildren(node.name);
  }

}
