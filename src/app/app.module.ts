import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RecipesModule } from './recipes/recipes.module';
import { RecipesComponent } from './recipes/recipes.component';
import { HeaderComponent } from './header/header.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, RecipeDetailsComponent, RecipeFormComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    RecipesModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
