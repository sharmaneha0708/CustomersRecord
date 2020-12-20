import { Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {

  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  map: google.maps.Map;

  mapComponentRef: ComponentRef<any>;

  @ViewChild('mapContainer', { read: ViewContainerRef })
  private mapsViewContainerRef: ViewContainerRef;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    this.displayMode = DisplayModeEnum.Card;
  }

  changeDisplayMode(mode: DisplayModeEnum) {
    this.displayMode = mode;
  }

  async loadMapComponent() {
    this.changeDisplayMode(DisplayModeEnum.Map);
    if (!this.mapsViewContainerRef.length) {
      // Lazy load MapComponent
    const { MapComponent } = await import('src/app/customers/map/map.component');
    const component = this.componentFactoryResolver.resolveComponentFactory(MapComponent);
    this.mapComponentRef = this.mapsViewContainerRef.createComponent(component);
    this.mapComponentRef.instance.enabled = true;
    }
 }

}

enum DisplayModeEnum {
  Card = 0,
  Grid = 1,
  Map = 2,
}
