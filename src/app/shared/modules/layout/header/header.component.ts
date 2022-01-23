import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public navExpanded = false;
  public isMobileNavVisible = false;
  public currentUser?: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.refreshCurrentUser();
  }

  public onArrowClick() {
    this.navExpanded = !this.navExpanded;
  }

  public closeNav() {
    this.navExpanded = false;
  }

  public toggleMobileNav() {
    this.isMobileNavVisible = !this.isMobileNavVisible;
  }

  public refreshCurrentUser(): void {
    this.authService.fetchUser();

    this.authService.user$.subscribe((val) => {
      if (val) {
        this.currentUser = val;
      }
    });
  }
}
