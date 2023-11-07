import {
  Component,
  ElementRef,
  Input,
  QueryList,
  Renderer2,
  TrackByFunction,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { ABP, RoutesService, TreeNode } from '@abp/ng.core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent {
  // Note: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  @ViewChildren('crmDropdownToggle') crmDropdownToggle!: QueryList<ElementRef<HTMLUListElement>>;

  rootDropdownExpand = {} as { [key: string]: boolean };

  trackByFn: TrackByFunction<TreeNode<ABP.Route>> = (_, item) => item.name;

  constructor(public readonly routesService: RoutesService, protected renderer: Renderer2) {
    routesService.visible$.subscribe(result => console.log(result));
  }

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
}
