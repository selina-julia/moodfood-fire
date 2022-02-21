import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  @Output() refineItems = new EventEmitter();
  @Input() searchInput!: string;

  constructor() {}

  public onSearchInputChange(event: Event) {
    const target = event.target as HTMLButtonElement;
    if (target) {
      this.refineItems.emit(target.value);
    }
  }
}
