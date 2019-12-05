import {Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./services/authGuard";
import {RestaurantSearchResultsComponent} from "./restaurant-search-results/restaurant-search-results.component";
import {MenuComponent} from "./restaurant-search-results/menu/menu.component";
import {CartComponent} from "./cart/cart.component";

export const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'list/:key', component: RestaurantSearchResultsComponent},
  {path: 'restaurant/:apikey/menu', component: MenuComponent, canActivate:[AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate:[AuthGuard]}];

