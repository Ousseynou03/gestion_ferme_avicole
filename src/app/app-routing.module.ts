import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';

import { BatimentComponent } from './demo/elements/batiment/batiment.component';
import { LoginComponent } from './demo/login/login.component';
import { FournisseurComponent } from './demo/elements/fournisseur/fournisseur.component';
import { UserComponent } from './demo/user/user.component';
import { MaterielComponent } from './demo/elements/materiel/materiel.component';

const routes: Routes = [
  {
    path: 'login',
    component : LoginComponent,
  },
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component')
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'batiment', component : BatimentComponent
      },
      {
        path: 'materiel', component : MaterielComponent
      },
      {
        path: 'fournisseur', component : FournisseurComponent
      },
      {
        path: 'user', component : UserComponent
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/sample-page/sample-page.component')
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
