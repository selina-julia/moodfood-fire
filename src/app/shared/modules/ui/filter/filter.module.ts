import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [FilterComponent],
  imports: [CommonModule, ButtonModule],
  exports: [FilterComponent],
})
export class FilterModule {}
