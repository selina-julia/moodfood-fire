import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-greeting',
  templateUrl: './user-greeting.component.html',
  styleUrls: ['./user-greeting.component.scss'],
})
export class UserGreetingComponent implements OnInit {
  public userName = '';
  public initialLetter!: string;

  ngOnInit(): void {
    if (this.userName) {
      this.getInitialLetter();
    }
  }

  public getInitialLetter() {
    this.initialLetter = this.userName.charAt(0);
  }
}
