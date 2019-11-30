import {Routes} from '@angular/router';
import {MainComponent} from './main/main.component';
import {LoginComponent} from "./login/login.component";
import {RestaurantSearchComponent} from "./restaurant-search/restaurant-search.component";
import {RestaurantCreateComponent} from "./restaurant-create/restaurant-create.component";
import {RestaurantUpdateComponent} from "./restaurant-update/restaurant-update.component";

export const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'restaurant-search', component: RestaurantSearchComponent},
  {path: 'restaurant-create', component: RestaurantCreateComponent},
  {path: 'restaurant-update', component: RestaurantUpdateComponent}
];
