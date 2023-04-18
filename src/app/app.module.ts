import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Router
// import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
//Fontawsome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
// Component
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponentComponent } from './home-component/home-component.component';
import { FooterComponent } from './footer/footer.component';
import { DessertComponent } from './dessert/dessert.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { Checkout1Component } from './checkout1/checkout1.component';
import { Checkout2Component } from './checkout2/checkout2.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path:'', component: HomeComponentComponent },
  { path:'dessert', component: DessertComponent },
  { path:'login', component: LoginComponent },
  { path:'cart', component: CartComponent },
  { path:'checkout', component: CheckoutComponent },
  { path:'checkout1', component: Checkout1Component },
  { path:'checkout2', component: Checkout2Component },
  { path:'success', component: SuccessComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponentComponent,
    FooterComponent,
    DessertComponent,
    LoginComponent,
    CartComponent,
    CheckoutComponent,
    Checkout1Component,
    Checkout2Component,
    SuccessComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes)
    // AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
