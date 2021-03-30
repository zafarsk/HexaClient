import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';


import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { NgHttpLoaderModule } from 'ng-http-loader';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RegisterComponent,
    MemberListComponent,
    NotFoundComponent,
    TestErrorComponent,
    ServerErrorComponent,
    TextInputComponent,
    DateInputComponent,
    
    RolesModalComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    NgHttpLoaderModule
    
  ],
  providers: [
    // AlertifyService,
    // AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true},  
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},   
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi:true} 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
