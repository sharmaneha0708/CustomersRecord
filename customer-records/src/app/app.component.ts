import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'customer-records';
  constructor(private meta: Meta) {
    meta.updateTag({name: 'viewport', content: 'width=device-width, height=device-height, initial-scale=1'});
  }
}
