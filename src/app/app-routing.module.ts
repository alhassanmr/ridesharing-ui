import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesLayoutComponent } from './layouts/pages-layout/pages-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/pages-layout/pages-layout.module').then( m => m.PagesLayoutModule)
      }
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./layouts/auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
      }
    ]
  }
]



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
