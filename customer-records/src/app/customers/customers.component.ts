import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Customer } from './customer.model';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})


export class CustomersComponent implements OnInit {
  displayMode: DisplayModeEnum;
  displayModeEnum = DisplayModeEnum;
  searchText: string;
  customers: Customer[] = [];
  map: google.maps.Map;
  mapComponentRef: ComponentRef<any>;
  _filteredCustomers: Customer[] = [];

  get filteredCustomers() {
    return this._filteredCustomers;
  }

  set filteredCustomers(value: Customer[]) {
    this._filteredCustomers = value;
 }
 @Output() searchcriteria = new EventEmitter<String>();

  @ViewChild('mapContainer', { read: ViewContainerRef })
  private mapsViewContainerRef: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    this.displayMode = DisplayModeEnum.Card;
    this.getCustomersData();

  }
  searchThis(event: any) {
    this.searchcriteria.emit(this.searchText);
}
  getCustomersData() {
    debugger;
    this.dataStorageService.getCustomers()
      .subscribe((responseData: Customer[]) => {
        this.customers = this.filteredCustomers = responseData});
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
      this.mapComponentRef.instance.customers = this.customers;
      this.mapComponentRef.instance.enabled = true;
    }
  }
}

enum DisplayModeEnum {
  Card = 0,
  List = 1,
  Map = 2,
}
