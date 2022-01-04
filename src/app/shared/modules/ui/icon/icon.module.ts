import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IconComponent } from './icon.component';

@NgModule({
  declarations: [IconComponent],
  imports: [CommonModule, MatIconModule],
  exports: [IconComponent],
})
export class IconModule {}
