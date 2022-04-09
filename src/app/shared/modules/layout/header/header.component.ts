import { Component, OnInit } from "@angular/core";
import { User } from "src/app/shared/models/user";
import { AuthService } from "src/app/shared/services/auth/auth.service";

@Component({
    selector: "app-header",
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
    public navExpanded = false;
    public isMobileNavVisible = false;
    public currentUser?: User;

    public mainNavItems = [
        {
            label: "Dashboard",
            link: "",
            icon: "home",
            iconSize: 7,
            isVisibleWithoutLogin: true
        },
        {
            label: "Rezepte",
            link: "myrecipes",
            icon: "cooking",
            iconSize: 7,
            isVisibleWithoutLogin: true
        },
        {
            label: "Favoriten",
            link: "favorites",
            icon: "like",
            iconSize: 7,
            isVisibleWithoutLogin: false
        },
        {
            label: "Erstellen",
            link: "create",
            icon: "plus",
            iconSize: 6,
            isVisibleWithoutLogin: false
        }
    ];

    public bottomNavItems = [
        {
            label: "Einstellungen",
            link: "settings",
            icon: "settings",
            iconSize: 8,
            isVisibleWithoutLogin: false
        }
    ];

    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.refreshCurrentUser();
    }

    public onArrowClick() {
        this.navExpanded = !this.navExpanded;
    }

    public closeNav() {
        this.navExpanded = false;
    }

    public toggleMobileNav() {
        this.isMobileNavVisible = !this.isMobileNavVisible;
    }

    public refreshCurrentUser(): void {
        this.authService.user$.subscribe((val) => {
            console.log(val);
            this.currentUser = val?.email ? val : undefined;
        });
    }
}
