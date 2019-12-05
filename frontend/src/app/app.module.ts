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
import {ProfileComponent} from './profile/profile.component'
import {RestaurantSearchResultsComponent} from "./restaurant-search-results/restaurant-search-results.component";

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
import {RestaurantComponent} from "./restaurant-search-results/restaurant/restaurant.component";
import { OrderAssignManagerComponent } from './order-assign-manager/order-assign-manager.component';
import { OrderListDeliveryComponent } from './order-list-delivery/order-list-delivery.component';
import { OrderListManagerComponent } from './order-list-manager/order-list-manager.component';
import { OrderListUserComponent } from './order-list-user/order-list-user.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { UpdateDeliveryComponent } from './update-delivery/update-delivery.component';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    SignUpComponent,
    ProfileComponent,
    RestaurantSearchComponent,
    RestaurantCreateComponent,
    RestaurantUpdateComponent,
    RestaurantComponent,
    RestaurantSearchResultsComponent,
    OrderAssignManagerComponent,
    OrderListDeliveryComponent,
    OrderListManagerComponent,
    OrderListUserComponent,
    OrderListComponent,
    OrderNewComponent,
    UpdateDeliveryComponent
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
