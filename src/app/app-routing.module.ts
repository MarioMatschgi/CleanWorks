import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLoginComponent } from 'src/libraries/authentication/components/auth-login/auth-login.component';
import { AuthRegisterComponent } from 'src/libraries/authentication/components/auth-register/auth-register.component';
import { AuthResetComponent } from 'src/libraries/authentication/components/auth-reset/auth-reset.component';
import { AuthVerifyEmailComponent } from 'src/libraries/authentication/components/auth-verify-email/auth-verify-email.component';
import { AuthLoginGuard } from 'src/libraries/authentication/guards/auth-login.guard';
import { AboutComponent } from './components/about/about.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppointmentsComponent } from './components/objectives/appointments/appointments.component';
import { GradesComponent } from './components/objectives/grades/grades.component';
import { GroupsComponent } from './components/objectives/groups/groups.component';
import { HomeworkComponent } from './components/objectives/homework/homework.component';
import { SubjectsComponent } from './components/objectives/subject/subjects.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'me',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: AuthLoginComponent },
      { path: 'register', component: AuthRegisterComponent },
      { path: 'verify-email', component: AuthVerifyEmailComponent },
      { path: 'reset-password', component: AuthResetComponent },
    ],
    canActivate: [AuthLoginGuard],
    data: { inverted: true },
  },
  {
    path: 'me/settings',
    component: SettingsComponent,
    canActivate: [AuthLoginGuard],
  },
  {
    path: 'me/about',
    component: AboutComponent,
  },
  {
    path: ':gid',
    canActivate: [AuthLoginGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'homework', component: HomeworkComponent },
      { path: 'appointments', component: AppointmentsComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'subjects', component: SubjectsComponent },
      { path: 'grades', component: GradesComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
