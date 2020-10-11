import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
profile = [{name: 'WHO // ', value: 'SWAPNIL JAIN'},
{name: 'WHAT // ', value: 'FRONTEND WEB DEVELOPER'},
{name: 'WHERE // ', value: 'PUNE,INDIA'},
{name: 'WHEN // ', value: 'DEC,2012 - PRESENT'},
{name: 'WHY // ', value: 'PASSION'}];

technologies = ['Angular2+', 'D3.js', 'NodeJs', 'AGILE', 'HTML', 'CSS', 'JAVASCRIPT'];
tools = ['VS Code', 'GIT', 'BITBUCKET', 'JIRA', 'JENKINS'];
  constructor() { }

  ngOnInit(): void {
  }

}
