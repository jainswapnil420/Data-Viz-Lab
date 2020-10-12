import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  name: string;
  constructor() { }

  ngOnInit(): void {
  }
  sendRequest(requestForm: NgForm): void{
console.log(requestForm.value);
  }
}
