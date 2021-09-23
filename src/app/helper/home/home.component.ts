import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  components = [{name: 'Bar Graph', src: '/assets/thumbnails/bar.jpg', route: '/bar'},
  {name: 'Line Graph', src: '/assets/thumbnails/line.jpg', route: '/line'},
  {name: 'Stack Graph', src: '/assets/thumbnails/stack.jpg', route: '/stack'},
  {name: 'Area Graph', src: '/assets/thumbnails/area.jpg', route: '/area'},
  {name: 'Pie Graph', src: '/assets/thumbnails/pie.jpg', route: '/pie'},
  {name: 'Donut Graph', src: '/assets/thumbnails/donut.jpg', route: '/donut'},
  {name: 'Scatter Graph', src: '/assets/thumbnails/scatter.jpg', route: '/scatter'},
  {name: 'Horizontal Bar Graph', src: '/assets/thumbnails/horizontal-bar.jpg', route: '/horizontal-bar'},
  {name: 'Grouped Bar Graph', src: '/assets/thumbnails/group-bar.jpg', route: '/grouped-bar'},
  {name: 'Bubble Graph', src: '/assets/thumbnails/bubble.jpg', route: '/bubble'},
  {name: 'Scatter with Multiple Shapes Graph', src: '/assets/thumbnails/scatter-multi-shape.jpg', route: '/scatter-shape'}];

  constructor() { }

  ngOnInit(): void {
  }

}
