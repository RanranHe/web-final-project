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
import {MenuComponent} from "./restaurant-search-results/menu/menu.component";
import {CartComponent} from "./cart/cart.component";
import {OrderListUserComponent} from "./order-list-user/order-list-user.component";
import {OrderListManagerComponent} from "./order-list-manager/order-list-manager.component";
import {OrderAssignManagerComponent} from "./order-assign-manager/order-assign-manager.component";
 

export const appRoutes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
  {path: 'restaurant-search', component: RestaurantSearchComponent},
  {path: 'restaurant-create', component: RestaurantCreateComponent},
  {path: 'restaurant-update', component: RestaurantUpdateComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'list/:key', component: RestaurantSearchResultsComponent},
  {path: 'restaurant/:apikey/menu', component: MenuComponent, canActivate:[AuthGuard]},
  {path: 'cart', component: CartComponent, canActivate:[AuthGuard]},
  {path: 'orderList', component: OrderListUserComponent},
  {path: 'orderListManager', component: OrderListManagerComponent},
  {path: 'orderAssignManager', component: OrderAssignManagerComponent}
];
