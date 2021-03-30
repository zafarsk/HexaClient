import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { MemberListComponent } from './members/member-list/member-list.component';

const routes: Routes = [
      
  {path:'', component: MemberListComponent},
  {path:'errors', component: TestErrorComponent},
  {path:'not-found', component:NotFoundComponent},
  {path:'server-error', component: ServerErrorComponent},
  {path:'**', component: NotFoundComponent,pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
