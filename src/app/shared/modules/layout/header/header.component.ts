import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public navExpanded = false;
  public isMobileNavVisible = false;

  public onArrowClick() {
    this.navExpanded = !this.navExpanded;
  }

  public closeNav() {
    this.navExpanded = false;
  }

  public toggleMobileNav() {
    this.isMobileNavVisible = !this.isMobileNavVisible;
  }
}
