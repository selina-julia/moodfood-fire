import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent {
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

    this.matIconRegistry.addSvgIcon(
      'user',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/account.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'logout',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/logout.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'google',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/google.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'cooking',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/whisk.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'private',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/padlock.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'public',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/world.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'warning',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/warning.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'success',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/success.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'info',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/info.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'settings',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/settings.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'italian',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/italian.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'chinese',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/chinese.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'dessert',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/dessert.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'seafood',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/seafood.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'vegetarian',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/vegetarian.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'pork',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/pork.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'chicken',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/chicken.svg'
      )
    );

    this.matIconRegistry.addSvgIcon(
      'austrian',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/austrian.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'burger',
      this.domSanitzer.bypassSecurityTrustResourceUrl(
        '../../../../../assets/icons/burger.svg'
      )
    );
  }

}
