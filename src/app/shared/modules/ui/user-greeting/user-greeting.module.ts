import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGreetingComponent } from './user-greeting.component';

@NgModule({
  declarations: [UserGreetingComponent],
  imports: [CommonModule],
  exports: [UserGreetingComponent],
})
export class UserGreetingModule {}
