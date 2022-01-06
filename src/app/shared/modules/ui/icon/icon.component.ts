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
      'arrow',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/right.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'like',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/love.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'heart-full',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/heart-full.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'heart',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/heart.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'chef',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/chef.svg'
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

    this.matIconRegistry.addSvgIcon(
      'search',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/search.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'dots',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/dots.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'edit',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/write.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'trash',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/trash.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'filter',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/filter.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'menu',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/hamburger.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'close',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/close.svg'
      )
    );
  }

  ngOnInit(): void {}
}
