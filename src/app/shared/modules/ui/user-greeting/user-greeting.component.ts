import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-greeting',
  templateUrl: './user-greeting.component.html',
  styleUrls: ['./user-greeting.component.scss'],
})
export class UserGreetingComponent implements OnInit {
  public userName = 'Alan';
  public initialLetter!: string;

  ngOnInit(): void {
    this.initialLetter = this.userName.charAt(0);
  }
}
