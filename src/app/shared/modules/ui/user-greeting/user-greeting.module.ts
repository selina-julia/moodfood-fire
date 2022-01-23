import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserGreetingComponent } from './user-greeting.component';
import { IconModule } from '../icon/icon.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [UserGreetingComponent],
  imports: [CommonModule, IconModule, RouterModule],
  exports: [UserGreetingComponent],
})
export class UserGreetingModule {}
