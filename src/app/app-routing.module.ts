import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { authGuard } from './guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { OnlinePaymentComponent } from './components/online-payment/online-payment.component';
import { CashPaymentComponent } from './components/cash-payment/cash-payment.component';
import { UserOrdersComponent } from './components/user-orders/user-orders.component';

const routes: Routes = [
  {
    path: '', canActivate: [authGuard], component: BlankLayoutComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },
      { path: 'cart', component: CartComponent, title: 'Cart' },
      { path: 'products', component: ProductsComponent, title: 'Products' },
      { path: 'onlinePayment/:id', component: OnlinePaymentComponent, title: 'Online Payment' },
      { path: 'cashPayment/:id', component: CashPaymentComponent, title: 'Cash Payment' },
      { path: 'allorders', component: UserOrdersComponent, title: 'All Orders' },
      { path: 'details/:id', component: DetailsComponent },
      { path: 'categories', component: CategoriesComponent, title: 'Categories' },
      { path: 'brands', component: BrandsComponent, title: 'Brands' },
      { path: 'forgetPassword', component: ForgetPasswordComponent, title: 'Forget Password' },
    ]
  },
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forget', component: ForgetPasswordComponent, title: 'Forget Password' },
    ]
  },
  { path: '**', component: NotfoundComponent, title: 'NotFound' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
