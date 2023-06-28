import { Component, ElementRef, Input, QueryList, Renderer2, TrackByFunction, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ABP, RoutesService, TreeNode } from '@abp/ng.core';

// import { MenuService } from '@core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SidemenuComponent {
  // Note: Ripple effect make page flashing on mobile
  @Input() ripple = false;

  @ViewChildren('childrenContainer') childrenContainers!: QueryList<ElementRef<HTMLDivElement>>;

  rootDropdownExpand = {} as { [key: string]: boolean };

  trackByFn: TrackByFunction<TreeNode<ABP.Route>> = (_, item) => item.name;

  constructor(public readonly routesService: RoutesService, protected renderer: Renderer2) {
    routesService.visible$.subscribe(
      x => console.log(x)
    );
  }

  isDropdown(node: TreeNode<ABP.Route>) {
    return !node?.isLeaf || this.routesService.hasChildren(node.name);
  }

  closeDropdown() {
    this.childrenContainers.forEach(({ nativeElement }) => {
      this.renderer.addClass(nativeElement, 'expanded');
      setTimeout(() => this.renderer.removeClass(nativeElement, 'expanded'), 0);
    });
  }
}
