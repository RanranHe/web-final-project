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
import {ProfileComponent} from './profile/profile.component';
import {RestaurantCreateComponent} from  "./restaurant-create/restaurant-create.component";
import {RestaurantUpdateComponent} from "./restaurant-update/restaurant-update.component";
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
import {DataTransfer} from './services/dataTransfer';

// Routes
import { appRoutes } from './route';
import { RestaurantSearchComponent } from './restaurant-search/restaurant-search.component';
import { OrderService } from './services/orderService';
import { OrderAssignManagerComponent } from './order-assign-manager/order-assign-manager.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderListManagerComponent } from './order-list-manager/order-list-manager.component';
import { OrderListUserComponent } from './order-list-user/order-list-user.component';
import { OrderNewComponent } from './order-new/order-new.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from 'ng-pick-datetime';
import { OwlMomentDateTimeModule } from 'ng-pick-datetime-moment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddDeliveryManComponent } from './add-delivery-man/add-delivery-man.component';
import { DeliveryManComponent } from './delivery-man/delivery-man.component';


export const MY_MOMENT_FORMATS = {
  parseInput: 'DD/MM/YYYY',
  fullPickerInput: 'DD/MM/YYYY hh:mm a',
  datePickerInput: 'DD/MM/YYYY',
  timePickerInput: 'hh:mm a',
  monthYearLabel: 'MMM-YYYY',
  dateA11yLabel: 'LL',
  monthYearA11yLabel: 'MMMM-YYYY'
};

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
    RestaurantCreateComponent,
    RestaurantSearchResultsComponent,
    RestaurantUpdateComponent,
    RestaurantSearchComponent,
    RestaurantListComponent,
    RestaurantComponent,
    MenuComponent,
    LeftSideComponent,
    ItemComponent,
    OrderAssignManagerComponent,
    OrderListComponent,
    OrderListManagerComponent,
    OrderListUserComponent,
    OrderNewComponent,
    AddDeliveryManComponent,
    DeliveryManComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    OwlMomentDateTimeModule
  ],
  providers: [CookieService, UserService, AuthenticationService, RestaurantService, CartService, DataTransfer, OrderService,{ provide: OWL_DATE_TIME_FORMATS, useValue: MY_MOMENT_FORMATS }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}