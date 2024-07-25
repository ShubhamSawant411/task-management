import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {

  images = [20, 4, 180].map((n) => `https://picsum.photos/id/${n}/900/500/?blur`);

}
