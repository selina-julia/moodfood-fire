import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type!: 'primary' | 'textlink';
  @Input() buttonText!: string;

  constructor() {}

  ngOnInit(): void {}

  getButtonClasses(): string {
    switch (this.type) {
      case 'primary':
        return 'bg-black text-white px-3 py-2 rounded-sm block';

      case 'textlink':
        return 'bb text-black';
    }
  }
}
