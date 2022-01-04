import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar.component';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [SearchBarComponent],
  imports: [CommonModule, IconModule],
  exports: [SearchBarComponent],
})
export class SearchBarModule {}
