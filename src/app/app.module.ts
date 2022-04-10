import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireAnalyticsModule } from "@angular/fire/compat/analytics";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import {
    BrowserModule,
    BrowserTransferStateModule
} from "@angular/platform-browser";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "../environments/environment";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { RecipeDetailsComponent } from "./modules/recipe-details/recipe-details.component";
import { RecipeFormComponent } from "./modules/recipe-form/recipe-form.component";
import { RecipesModule } from "./modules/recipes/recipes.module";
import { FooterComponent } from "./shared/modules/layout/footer/footer.component";
import { HeaderTopBarComponent } from "./shared/modules/layout/header-top-bar/header-top-bar.component";
import { HeaderComponent } from "./shared/modules/layout/header/header.component";
import { IconComponent } from "./shared/modules/ui/icon/icon.component";
import { IconModule } from "./shared/modules/ui/icon/icon.module";
import { SearchBarComponent } from "./shared/modules/ui/search-bar/search-bar.component";
import { SearchBarModule } from "./shared/modules/ui/search-bar/search-bar.module";
import { UserGreetingComponent } from "./shared/modules/ui/user-greeting/user-greeting.component";
import { UserGreetingModule } from "./shared/modules/ui/user-greeting/user-greeting.module";
import { AuthFormComponent } from "./modules/auth-form/auth-form.component";
import { ButtonModule } from "./shared/modules/ui/button/button.module";
import { RegisterFormComponent } from "./modules/register-form/register-form.component";
import { AuthenticationService } from "./shared/services/authentication/authentication.service";
import { RegisterFormModule } from "./modules/register-form/register-form.module";
import { UserSettingsComponent } from "./modules/user-settings/user-settings.component";
import { UserSettingsFormComponent } from "./modules/user-settings-form/user-settings-form.component";
import { ModalModule } from "./shared/modules/ui/modal/modal.module";
import { ImageUploadModule } from "./shared/modules/ui/image-upload/image-upload.module";
import {
    NgxGoogleAnalyticsModule,
    NgxGoogleAnalyticsRouterModule
} from "ngx-google-analytics";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        RecipeDetailsComponent,
        RecipeFormComponent,
        FooterComponent,
        HeaderTopBarComponent,
        AuthFormComponent,
        RegisterFormComponent,
        UserSettingsComponent,
        UserSettingsFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        NgxGoogleAnalyticsModule.forRoot("G-LVEDLGLE1T"),
        NgxGoogleAnalyticsRouterModule,
        AngularFireAnalyticsModule,
        AngularFirestoreModule,
        RecipesModule,
        AngularFireStorageModule,
        BrowserTransferStateModule,
        NoopAnimationsModule,
        MatIconModule,
        HttpClientModule,
        IconModule,
        SearchBarModule,
        UserGreetingModule,
        RegisterFormModule,
        ButtonModule,
        ModalModule,
        ImageUploadModule
    ],
    providers: [AuthenticationService],
    bootstrap: [AppComponent]
})
export class AppModule {}
