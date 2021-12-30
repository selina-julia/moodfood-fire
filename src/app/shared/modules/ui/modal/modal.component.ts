import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Output() cancel = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Input() title: string | undefined;

  constructor() {}

  ngOnInit(): void {
    console.log(this.title);
  }

  public onCancel() {
    this.cancel.emit('cancel');
  }

  public onDelete() {
    this.delete.emit('delete');
  }
}
