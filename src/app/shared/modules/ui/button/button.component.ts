import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type!: 'primary' | 'textlink' | 'primary-light' | 'outline';
  @Input() buttonText!: string;
  @Input() icon!: string;

  constructor() {}

  ngOnInit(): void {}

  getButtonClasses(): string {
    switch (this.type) {
      case 'primary':
        return 'bg-black text-white px-4 py-3 rounded-md block';

      case 'primary-light':
        return 'bg-white px-4 py-3 rounded-md block box-shadow';

      case 'textlink':
        return 'border-b text-black';

      case 'outline':
        return 'border border-gray-600 rounded-md bg-white px-4 py-2 text-black';
    }
    return '';
  }
}
