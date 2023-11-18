import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';

import { BatimentComponent } from './demo/elements/batiment/batiment.component';
import { LoginComponent } from './demo/login/login.component';
import { FournisseurComponent } from './demo/elements/fournisseur/fournisseur.component';
import { UserComponent } from './demo/user/user.component';
import { MaterielComponent } from './demo/elements/materiel/materiel.component';
import { OuvrierComponent } from './demo/elements/ouvrier/ouvrier.component';
import { ClientComponent } from './demo/elements/client/client.component';
import { VenteComponent } from './demo/elements/vente/vente.component';
import { DepenseComponent } from './demo/elements/depense/depense.component';
import { BandeComponent } from './demo/elements/bande/bande.component';
import { TresorerieComponent } from './demo/elements/tresorerie/tresorerie.component';

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
        path: 'batiment', component : BatimentComponent
      },

      {
        path: 'fournisseur', component : FournisseurComponent
      },
      {
        path: 'ouvrier', component : OuvrierComponent
      },
      {
        path: 'client', component : ClientComponent
      },
      {
        path: 'vente', component : VenteComponent
      },
      {
        path: 'materiel', component : MaterielComponent
      },
      {
        path: 'depense', component : DepenseComponent
      },
      {
        path: 'bande', component : BandeComponent
      },
      {
        path: 'tresorerie', component : TresorerieComponent
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
