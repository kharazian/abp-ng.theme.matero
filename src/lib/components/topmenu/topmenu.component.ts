import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  TrackByFunction,
  ViewChildren,
  ViewEncapsulation,
  HostBinding,
  AfterViewInit,
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ABP, RoutesService, TreeNode } from '@abp/ng.core';

export interface TopmenuState {
  active: boolean;
  route: string;
}

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopmenuComponent {
  @HostBinding('class') class = 'crm-topmenu';

  trackByFn: TrackByFunction<TreeNode<ABP.Route>> = (_, item) => item.name;

  constructor(public readonly routesService: RoutesService, protected renderer: Renderer2) {}


  isDropdown(node: TreeNode<ABP.Route>) {
    return !node?.isLeaf || this.routesService.hasChildren(node.name);
  }
}
