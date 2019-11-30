// Modules
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from "@angular/router";

// Components
import {AppComponent} from './app.component';
import {NavBarComponent} from './nav-bar/nav-bar.component'
import {MainComponent} from './main/main.component'
import {LoginComponent} from './login/login.component'

// Services
import {UserService} from './services/userService';
import {AuthenticationService} from './services/authenticationService';
import {RestaurantService} from './services/restuarantService';
import {DataTransfer} from './services/dataTransfer';

// Routes
import { appRoutes } from './route';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { RestaurantCreateComponent } from './restaurant-create/restaurant-create.component';
import { RestaurantUpdateComponent } from './restaurant-update/restaurant-update.component';




@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    MainComponent,
    LoginComponent,
    RestaurantSearchComponent,
    RestaurantCreateComponent,
    RestaurantUpdateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [UserService, AuthenticationService, RestaurantService, DataTransfer],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
