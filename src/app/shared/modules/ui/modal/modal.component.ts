import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type ModalData = {
  headline: string,
  description: string,
  actionButton: string,
  cancelButton: string
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Output() action = new EventEmitter();
  @Input() title: string | undefined;
  @Input() modalData?: ModalData;
  @Input() type!: 'warning' | 'info' | 'success';


  constructor() {}

  ngOnInit(): void {
    console.log(this.title);
  }

  public onCancel() {
    this.cancel.emit('cancel');
  }

  public onAction() {
    this.action.emit('action');
  }

  public getTypeColor(): string {
    if(!this.type) {
      return '';
    }
    switch(this.type) {
      case 'info':
        return 'blue';
      case 'warning':
        return 'red';
      case 'success':
        return 'green';
    }
  }
}
