import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BoxListComponent } from './box-list/box-list.component';
import { SingleBoxComponent } from './box-list/single-box/single-box.component';
import { BoxFormComponent } from './box-list/box-form/box-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BoxsService } from './services/boxs.service';
import { AuthGuardService } from './services/auth-guard.service';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'boxs', canActivate: [AuthGuardService], component: BoxListComponent },
  { path: 'boxs/new', canActivate: [AuthGuardService], component: BoxFormComponent },
  { path: 'boxs/view/:id', canActivate: [AuthGuardService], component: SingleBoxComponent},
  { path: '', redirectTo: 'boxs', pathMatch: 'full'},
  { path: '**', redirectTo: 'boxs' }
];
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BoxListComponent,
    SingleBoxComponent,
    BoxFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [AuthService, BoxsService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
