import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddItemComponent } from './add-item/add-item.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';
import { LogoutComponent } from './logout/logout.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo:'/home',
    pathMatch:'full'
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'add',
    component:AddItemComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'movie/:id',
    component:MovieDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path:'signin',
    component:LoginComponent,
  },
  {
    path:'signout',
    component:LogoutComponent,
  },
  {
    path:'signup',
    component:RegisterComponent,
  },
  {
    path:'search',
    component:SearchComponent,
  },
  {
    path:'**',
    component:PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [
  AddItemComponent,
  HomeComponent,
  PageNotFoundComponent,
  LoginComponent,
  LogoutComponent,
  RegisterComponent,
  SearchComponent,
  MovieDetailComponent,
]
