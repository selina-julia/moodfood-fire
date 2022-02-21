import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { HeaderTitleService } from 'src/app/shared/services/headerTitle/headerTitle.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  public user!: User
  public isEditMode = false;

  constructor(private headerTitleService: HeaderTitleService, private authService: AuthService) { }

  ngOnInit(): void {
    this.headerTitleService.setTitle(
     'Einstellungen'
    );

    this.refreshCurrentUser()
  }

  public getInitialLetter() {
    if(!this.user?.firstName) return;
    return this.user?.firstName?.charAt(0).toUpperCase();
  }

  public editUserData():void {
    this.isEditMode = !this.isEditMode;
  }

  public async refreshCurrentUser(): Promise<void> {
    this.authService.fetchUser();

    this.authService.user$.subscribe((val) => {
      if (val) {
        // this.userId = val.uid;
        this.user = val;
      }
    });
  }

}
