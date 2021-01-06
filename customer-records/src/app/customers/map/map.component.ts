import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map: google.maps.Map;
  mapHeight: string;
  mapWidth: string;
  private isEnabled: boolean;
  private markers: google.maps.Marker[] = [];

  @Input() height: number;
  @Input() width: number;

  @ViewChild('mapContainer', { static: true }) gmap: ElementRef;

  constructor(private route: ActivatedRoute, private router: Router) { }

  // Necessary since a map rendered while container is hidden
  // will not load the map tiles properly and show a grey screen
  @Input() get enabled(): boolean {
    return this.isEnabled;
  }

  set enabled(isEnabled: boolean) {
    this.isEnabled = isEnabled;
    this.init();
  }
  private _customers: Customer[] = null;
  @Input() public get customers() {
    return this._customers;
  }

  public set customers(value: any[]) {
    this._customers = value;
  }

  init() {
    // Need slight delay to avoid grey box when google script has previously been loaded.
    // Otherwise map <div> container may not be visible yet which causes the grey box.
    setTimeout(() => {
      this.ensureScript();
    }, 200);
  }

  ngOnInit(): void {
    if (this.customers[0].latitude && this.customers[0].longitude) {
      if (this.mapHeight && this.mapWidth) {
        this.mapHeight = this.height + 'px';
        this.mapWidth = this.width + 'px';
      } else {
        const hw = this.getWindowHeightWidth(this.gmap.nativeElement.ownerDocument);
        this.mapHeight = hw.height + 'px';
        this.mapWidth = hw.width + 'px';
      }
    }
  }
  private getWindowHeightWidth(document: HTMLDocument) {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;

    let height = window.innerHeight
      || document.documentElement.clientHeight
      || document.body.clientHeight;

    if (width > 1080) { width = 1080; }
    if (height > 400) { height = 400; }

    return { height: height, width: width };
  }


  private ensureScript() {
    const document = this.gmap.nativeElement.ownerDocument;
    const script = <HTMLScriptElement>document.querySelector('script[id="googlemaps"]');
    if (script) {
      if (this.isEnabled) {
        this.renderMap();
      }
    } else {
      const mapsScript = document.createElement('script');
      mapsScript.id = 'googlemaps';
      mapsScript.type = 'text/javascript';
      mapsScript.async = true;
      mapsScript.defer = true;
      mapsScript.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBuieX47pY4iqbhOudBLF94wfbpH5Qqj0I';
      mapsScript.onload = () => {
        if (this.isEnabled) {
          this.renderMap();
        }
      };
      document.body.appendChild(mapsScript);
    }
  }
  private renderMap() {
    const coordinates = new google.maps.LatLng(this.customers[0].latitude, this.customers[0].longitude);
    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);

    if(this.customers.length) {
      for (const customer of this.customers) {
        const latlng = this.createLatLong(customer.latitude, customer.longitude);
        const markerText = `${customer.firstName} ${customer.lastName}`;
        this.createMarker(latlng, markerText, customer.id);
      }
    }
  }

  private createLatLong(latitude: number, longitude: number) {
    return (latitude && longitude) ? new google.maps.LatLng(latitude, longitude) : null;
  }

  private createMarker(position: google.maps.LatLng, title: string, id: number) {
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

  marker.addListener('click', () => {
   this.router.navigate(['./', id, 'details'], {relativeTo: this.route});
  });
}

}
