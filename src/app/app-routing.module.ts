import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from 'src/libraries/authentication/components/auth-login/auth-login.component';
import { AuthRegisterComponent } from 'src/libraries/authentication/components/auth-register/auth-register.component';
import { AuthResetComponent } from 'src/libraries/authentication/components/auth-reset/auth-reset.component';
import { AuthVerifyEmailComponent } from 'src/libraries/authentication/components/auth-verify-email/auth-verify-email.component';
import { AuthLoginGuard } from 'src/libraries/authentication/guards/auth-login.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthLoginGuard],
      },
      {
        path: 'auth',
        children: [
          { path: 'login', component: AuthLoginComponent },
          { path: 'register', component: AuthRegisterComponent },
          { path: 'verify-email', component: AuthVerifyEmailComponent },
          { path: 'reset-password', component: AuthResetComponent },
        ],
        canActivate: [AuthLoginGuard],
        data: { inverted: true },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
