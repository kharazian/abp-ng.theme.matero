import {
  Component,
  ElementRef,
  QueryList,
  Renderer2,
  TrackByFunction,
  ViewChildren,
  ViewEncapsulation,
  HostBinding,
} from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { ABP, RoutesService, TreeNode } from '@abp/ng.core';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TopmenuComponent {
  @HostBinding('class') class = 'crm-topmenu';

  private menuSubscription = Subscription.EMPTY;
  private routerSubscription = Subscription.EMPTY;

  @ViewChildren('crmDropdownToggle') crmDropdownToggle!: QueryList<ElementRef<HTMLUListElement>>;

  rootDropdownExpand = {} as { [key: string]: boolean };

  trackByFn: TrackByFunction<TreeNode<ABP.Route>> = (_, item) => item.name;

  constructor(public readonly routesService: RoutesService, protected renderer: Renderer2) {}

  dropdownExpand(node: TreeNode<ABP.Route>) {
    this.rootDropdownExpand[node.name] = !this.rootDropdownExpand[node.name];
    this.closeDropdown();
  }

  nodeLevel(node: TreeNode<ABP.Route>) {
    let level = 0;
    let tempNode = node;
    while (tempNode.parent) {
      level++;
      tempNode = tempNode.parent;
    }
    return level;
  }

  isDropdown(node: TreeNode<ABP.Route>) {
    return !node?.isLeaf || this.routesService.hasChildren(node.name);
  }

  closeDropdown() {
    this.crmDropdownToggle.forEach(({ nativeElement }) => {
      if (this.rootDropdownExpand[nativeElement.getAttribute('type')]) {
        this.renderer.addClass(nativeElement, 'expanded');
      } else {
        this.renderer.removeClass(nativeElement, 'expanded');
      }
    });
  }

  onRouteChange(rla: RouterLinkActive, index: number) {
    // this.routerSubscription.unsubscribe();
    // this.routerSubscription = this.router.events
    //   .pipe(filter(event => event instanceof NavigationEnd))
    //   .subscribe(e => {
    //     this.menuStates.forEach(item => (item.active = false));
    //     setTimeout(() => (this.menuStates[index].active = rla.isActive));
    //   });
  }
}
