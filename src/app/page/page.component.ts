import { Component, OnInit, Input } from '@angular/core';

import { User } from '../app.component'

@Component({
  selector: 'app-page-content',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
