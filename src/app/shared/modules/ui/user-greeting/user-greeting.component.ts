import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';

@Component({
  selector: 'app-user-greeting',
  templateUrl: './user-greeting.component.html',
  styleUrls: ['./user-greeting.component.scss'],
})
export class UserGreetingComponent implements OnInit {
  public initialLetter?: string;
  public currentUser?: User;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.refreshCurrentUser();
  }

  public refreshCurrentUser(): void {
    this.authService.fetchUser();

    this.authService.user$.subscribe((val) => {
      if (val) {
        this.currentUser = val;
      }
    });
  }

  public getInitialLetter(): string | undefined {
    return this.currentUser?.firstName?.charAt(0);
  }

  public onLogout() {
    this.authService.logout();
  }
}
