import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import {} from 'googlemaps';
import { Customer } from 'src/app/customers/customer.model';
import { CustomerService } from 'src/app/shared/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css'],
})
export class CustomerDetailsComponent implements OnInit, AfterViewInit {
  id: number;
  customer: Customer;
  map: google.maps.Map;

  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;

  private markers: google.maps.Marker[] = [];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.route.parent.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.customer = this.customerService.getCustomer(this.id - 1);
    });
  }

  ngAfterViewInit() {
    const coordinates = new google.maps.LatLng(this.customer.latitude, this.customer.longitude);
    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    const latlng = this.createLatLong(this.customer.latitude, this.customer.longitude);
    this.createMarker(latlng, this.customer.address);
  }

  private createLatLong(latitude: number, longitude: number) {
    return (latitude && longitude) ? new google.maps.LatLng(latitude, longitude) : null;
  }


private createMarker(position: google.maps.LatLng, title: string) {
  const infowindow = new google.maps.InfoWindow({
    content: title
  });

  const marker = new google.maps.Marker({
    position: position,
    map: this.map,
    title: title,
    animation: google.maps.Animation.DROP
  });

  this.markers.push(marker);

  // marker.addListener('click', () => {
  //   infowindow.open(this.map, marker);
  // });
}

}
