import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  BrowserModule,
  BrowserTransferStateModule,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RecipesModule } from './modules/recipes/recipes.module';
import { RecipesComponent } from './modules/recipes/recipes.component';
import { HeaderComponent } from './shared/modules/layout/header/header.component';
import { RecipeDetailsComponent } from './modules/recipe-details/recipe-details.component';
import { RecipeFormComponent } from './modules/recipe-form/recipe-form.component';
import { FooterComponent } from './shared/modules/layout/footer/footer.component';
import { ButtonComponent } from './shared/modules/ui/button/button.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { IconComponent } from './shared/modules/ui/icon/icon.component';
import { HeaderTopBarComponent } from './shared/modules/layout/header-top-bar/header-top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RecipeDetailsComponent,
    RecipeFormComponent,
    FooterComponent,
    IconComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
