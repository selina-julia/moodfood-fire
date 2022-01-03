import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public navExpanded = false;
  constructor() {}

  ngOnInit(): void {}

  public onArrowClick() {
    this.navExpanded = !this.navExpanded;
  }

  public closeNav() {
    this.navExpanded = false;
  }
}
