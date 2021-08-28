import { ComponentType } from '@angular/cdk/portal';
import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ComponentAddService {
  constructor(private factoryResolver: ComponentFactoryResolver) {}

  addComponentToDOM(comp: ComponentType<unknown>, vc: ViewContainerRef) {
    const factory = this.factoryResolver.resolveComponentFactory(comp);
    return vc.createComponent(factory);
  }
}
