import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Router
// import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';
//Fontawsome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
// Component
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponentComponent } from './pages/home-component/home-component.component';
import { FooterComponent } from './footer/footer.component';
import { DessertComponent } from './pages/dessert/dessert.component';
import { LoginComponent } from './pages/login/login.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { Checkout1Component } from './pages/checkout1/checkout1.component';
import { Checkout2Component } from './pages/checkout2/checkout2.component';
import { SuccessComponent } from './pages/success/success.component';
import { DataService } from './data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path:'', component: HomeComponentComponent },
  { path:'dessert', component: DessertComponent },
  { path:'login', component: LoginComponent },
  { path:'cart', component: CartComponent },
  { path:'checkout', component: CheckoutComponent },
  { path:'checkout1', component: Checkout1Component },
  { path:'checkout2', component: Checkout2Component },
  { path:'success', component: SuccessComponent },

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
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    // AppRoutingModule
    RouterModule.forRoot(routes),
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxPaginationModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
