import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from 'src/libraries/authentication/components/auth-login/auth-login.component';
import { AuthRegisterComponent } from 'src/libraries/authentication/components/auth-register/auth-register.component';
import { AuthResetComponent } from 'src/libraries/authentication/components/auth-reset/auth-reset.component';
import { AuthVerifyEmailComponent } from 'src/libraries/authentication/components/auth-verify-email/auth-verify-email.component';
import { AuthLoginGuard } from 'src/libraries/authentication/guards/auth-login.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/objectives/appointments/appointments.component';
import { GroupsComponent } from './components/objectives/groups/groups.component';
import { HomeworkComponent } from './components/objectives/homework/homework.component';
import { SubjectsComponent } from './components/objectives/subject/subjects.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        canActivate: [AuthLoginGuard],
        children: [
          { path: '', component: DashboardComponent },
          { path: 'homework', component: HomeworkComponent },
          { path: 'appointments', component: AppointmentsComponent },
          { path: 'groups', component: GroupsComponent },
          { path: 'subjects', component: SubjectsComponent },
        ],
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
