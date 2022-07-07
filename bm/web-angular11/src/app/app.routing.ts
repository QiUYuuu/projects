import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/system/login/login.component';
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },

  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },

  // {
  //   path: '',
  //   component: HomeComponent,
  //   data: {
  //     title: 'Home'
  //   },
  //   children: [
  //     {
  //       path: 'new-tab',
  //       component: NewTabComponent,
  //       data: {
  //         title: '首页',
  //         cid: '041FF088415C6BBF458F9475FEE79986'
  //       }
  //     },
  //     {
  //       path: 'owner',
  //       data: { pcode: '098' },
  //       loadChildren: () => import('./views/shopowner/shopowner.module').then(m => m.ShopownerModule)
  //     },
  //   ]
  // },
  { path: '**', redirectTo: '/login' },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
