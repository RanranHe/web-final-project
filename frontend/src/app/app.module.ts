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

// Services
import {UserService} from './services/userService';
import {AuthenticationService} from './services/authenticationService';

// Routes
import { appRoutes } from './route';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    MainComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [UserService, AuthenticationService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
