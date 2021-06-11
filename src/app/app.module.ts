import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SliderComponent } from './slider/slider.component';
import { CardsComponent } from './cards/cards.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavSearchComponent } from './nav-search/nav-search.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ProductCollectionComponent } from './product-collection/product-collection.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

import {ProductlistService } from './productlist.service';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './shared/product.service';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { LoginComponent} from '../app/login/login.component'

import { RegistrationComponent} from '../app/registration/registration.component'
import { ProfileComponent} from '../app/profilepage/profilepage.component'
import { Profile} from '../app/profile'
import { ProfilesService} from '../app/profiles.service'
import { LoginService} from '../app/login.service'
import { RegistrationService} from '../app/registration.service';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import {CartService} from './cart.service'

import { AuthGuard } from "./auth-guard.service";
import {Role} from "../_models/roles";
import { JwtInterceptor } from './jwt-interceptor.interceptor';
import { ErrorInterceptor } from './error-interceptor.interceptor';
import { AdminComponent } from './admin/admin.component';
import { AdminOrdersComponent } from './admin-orders/admin-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SliderComponent,
    CardsComponent,
    FooterComponent,
    NavSearchComponent,
    AboutComponent,
    HomeComponent,
    ProductCollectionComponent,
    ProductDetailComponent,
    AddProductComponent,
    EditProductComponent,
    DeleteProductComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    ShoppingCartComponent,
    AdminComponent,
    AdminOrdersComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    // SidebarModule.forRoot()
    FormsModule,
    BrowserModule,
    RouterModule.forRoot([
      {path: 'about', component: AboutComponent},
      {path: 'home', component: HomeComponent},
      {path: 'collection', component: ProductCollectionComponent,},
      {path: 'product-detail/:_id', component: ProductDetailComponent,canActivate: [AuthGuard],},
      {path: 'addproduct', component: AddProductComponent,canActivate: [AuthGuard],data: { roles: [Role.admin] }},
      {path: 'edit/:_id', component: EditProductComponent,canActivate: [AuthGuard],data: { roles: [Role.admin] }},
      {path: 'delete/:_id', component: DeleteProductComponent,canActivate: [AuthGuard],data: { roles: [Role.admin] }},
      {path: 'login', component: LoginComponent,},
      {path: 'profile', component: ProfileComponent,canActivate: [AuthGuard]},
      {path: 'registration', component: RegistrationComponent},
      {path: 'admin', component: AdminComponent ,canActivate: [AuthGuard],data: { roles: [Role.admin] }},
      {path: 'adminorders', component: AdminOrdersComponent ,canActivate: [AuthGuard],data: { roles: [Role.admin] }},
      {path: 'cart', component: ShoppingCartComponent,canActivate: [AuthGuard],data: { roles: [Role.user] }},

      {path: '**', redirectTo: '/home', pathMatch: 'full'},
      // {path: '404', component: NotFoundComponent},
      // {path: '**', redirectTo: '/404'}
      // data: { roles: [Role.Admin] }

    ]),
    HttpClientModule


  ],
  providers: [ProductlistService,RegistrationService,LoginService,ProfilesService,CartService ,

    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }






