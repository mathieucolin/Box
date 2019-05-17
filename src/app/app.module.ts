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
import { AngularFireAuth } from '@angular/fire/auth';


import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database-deprecated';
import { AdminComponent } from './admin/admin.component';
import { AdminGuardService } from './services/admin-guard.service';

const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'boxs', canActivate: [AuthGuardService], component: BoxListComponent },
  { path: 'boxs/new', canActivate: [AuthGuardService], component: BoxFormComponent },
  { path: 'boxs/view/:id', canActivate: [AuthGuardService], component: SingleBoxComponent},
  { path: 'admin', canActivate: [AdminGuardService, AuthGuardService], component: AdminComponent },
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
    HeaderComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatSnackBarModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
  ],
  providers: [AuthService, BoxsService, AuthGuardService, AdminGuardService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
