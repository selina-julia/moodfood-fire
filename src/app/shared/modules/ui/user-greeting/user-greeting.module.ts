import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGreetingComponent } from './user-greeting.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [UserGreetingComponent],
  imports: [CommonModule, IconModule],
  exports: [UserGreetingComponent],
})
export class UserGreetingModule {}
