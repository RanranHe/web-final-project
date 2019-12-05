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
import {SignUpComponent} from "./sign-up/sign-up.component";
import {FooterComponent} from './footer/footer.component';
import {CartComponent} from "./cart/cart.component";
import {CartItemComponent} from "./cart/cart-item/cart-item.component";
import {ProfileComponent} from './profile/profile.component'
import {RestaurantSearchResultsComponent} from "./restaurant-search-results/restaurant-search-results.component";
import {RestaurantListComponent} from "./restaurant-search-results/restaurant-list/restaurant-list.component";
import {RestaurantComponent} from "./restaurant-search-results/restaurant/restaurant.component";
import {MenuComponent} from "./restaurant-search-results/menu/menu.component";
import {LeftSideComponent} from "./restaurant-search-results/menu/left-side/left-side.component";
import {ItemComponent} from "./restaurant-search-results/menu/item/item.component";

// Services
import {UserService} from './services/userService';
import {AuthenticationService} from './services/authenticationService';
import {RestaurantService} from "./services/restaurantService";
import {CartService} from "./services/cartService";
import {CookieService} from "ngx-cookie-service";

// Routes
import { appRoutes } from './route';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    MainComponent,
    CartComponent,
    CartItemComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    RestaurantSearchResultsComponent,
    RestaurantListComponent,
    RestaurantComponent,
    MenuComponent,
    LeftSideComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [CookieService, UserService, AuthenticationService, RestaurantService, CartService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
