import {Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {LoginComponent} from "./login/login.component";
import {RestaurantSearchComponent} from "./restaurant-search/restaurant-search.component";
import {RestaurantCreateComponent} from "./restaurant-create/restaurant-create.component";
import {RestaurantUpdateComponent} from "./restaurant-update/restaurant-update.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./services/authGuard";
import {RestaurantSearchResultsComponent} from "./restaurant-search-results/restaurant-search-results.component";


export const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'restaurant-search', component: RestaurantSearchComponent},
  {path: 'restaurant-create', component: RestaurantCreateComponent},
  {path: 'restaurant-update', component: RestaurantUpdateComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'list/:key', component: RestaurantSearchResultsComponent}
];
