import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  components = [{name: 'Bar Chart', src: '/assets/thumbnails/bar.jpg', route: '/bar'},
  {name: 'Line Chart', src: '/assets/thumbnails/line.jpg', route: '/line'},
  {name: 'Stack Chart', src: '/assets/thumbnails/stack.jpg', route: '/stack'},
  {name: 'Area Chart', src: '/assets/thumbnails/area.jpg', route: '/area'},
  {name: 'Pie Chart', src: '/assets/thumbnails/pie.jpg', route: '/pie'},
  {name: 'Donut Chart', src: '/assets/thumbnails/donut.jpg', route: '/donut'},
  {name: 'Scatter Chart', src: '/assets/thumbnails/scatter.jpg', route: '/scatter'},
  {name: 'Horizontal Bar Chart', src: '/assets/thumbnails/horizontal-bar.jpg', route: '/horizontal-bar'},
  {name: 'Grouped Bar Chart', src: '/assets/thumbnails/group-bar.jpg', route: '/grouped-bar'},
  {name: 'Bubble Chart', src: '/assets/thumbnails/bubble.jpg', route: '/bubble'},
  {name: 'Scatter with Multiple Shapes Chart', src: '/assets/thumbnails/scatter-multi-shape.jpg', route: '/scatter-shape'}];

  constructor() { }

  ngOnInit(): void {
  }

}
