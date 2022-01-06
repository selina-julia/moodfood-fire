import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RecipeDetailsComponent } from './modules/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './modules/recipe-form/recipe-form.component';
import { RecipesModule } from './modules/recipes/recipes.module';
import { FooterComponent } from './shared/modules/layout/footer/footer.component';
import { HeaderTopBarComponent } from './shared/modules/layout/header-top-bar/header-top-bar.component';
import { HeaderComponent } from './shared/modules/layout/header/header.component';
import { IconComponent } from './shared/modules/ui/icon/icon.component';
import { IconModule } from './shared/modules/ui/icon/icon.module';
import { SearchBarComponent } from './shared/modules/ui/search-bar/search-bar.component';
import { SearchBarModule } from './shared/modules/ui/search-bar/search-bar.module';
import { UserGreetingComponent } from './shared/modules/ui/user-greeting/user-greeting.component';
import { UserGreetingModule } from './shared/modules/ui/user-greeting/user-greeting.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeDetailsComponent,
    RecipeFormComponent,
    FooterComponent,
    HeaderTopBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
