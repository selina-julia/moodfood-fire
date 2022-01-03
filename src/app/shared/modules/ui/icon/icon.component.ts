import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit {
  @Input() iconName!: string;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitzer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'home',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/home.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'like',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/love.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'plus',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/plus.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'moodfood-small',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/moodfood_small.svg'
      )
    );
  }

  ngOnInit(): void {}
}
