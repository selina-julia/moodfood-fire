import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { HeaderTitleService } from 'src/app/shared/services/headerTitle/headerTitle.service';

@Component({
  selector: 'app-header-top-bar',
  templateUrl: './header-top-bar.component.html',
  styleUrls: ['./header-top-bar.component.scss'],
})
export class HeaderTopBarComponent implements OnInit {
  public title = '';
  public currentUser?: User;

  constructor(private headerTitleService: HeaderTitleService) {}

  ngOnInit(): void {
    this.headerTitleService.title.subscribe((updatedTitle) => {
      this.title = updatedTitle;
    });
  }
}
