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
import { AuthGuard } from './demo/services/auth-guard.service';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NutritionComponent } from './demo/elements/nutrition/nutrition.component';
import { MortaliteComponent } from './demo/elements/mortalite/mortalite.component';
import { OeufComponent } from './demo/elements/oeuf/oeuf.component';
import { AuthorizationGuard } from './demo/services/authorization-guard.service';
import { NotAutorizedComponent } from './demo/elements/not-autorized/not-autorized.component';
import { RamassageOeufComponent } from './demo/elements/ramassage-oeuf/ramassage-oeuf.component';
import { AppartementComponent } from './demo/elements/appartement/appartement.component';
import { PaiementComponent } from './demo/elements/paiement/paiement.component';
import { LocataireComponent } from './demo/elements/locataire/locataire.component';
import { ChangePasswordComponent } from './demo/elements/change-password/change-password.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection vers la page de connexion par défaut
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'default',
        loadComponent: () => import('./demo/default/default.component')
      },
      { path: 'user-profile/:id', component: NavRightComponent, canActivate: [AuthGuard] },

      {
        path: 'batiment', component : BatimentComponent
      },
      {
        path: 'nutrition', component : NutritionComponent
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
        path: 'oeuf', component : OeufComponent
      },
      {
        path: 'mortalite', component : MortaliteComponent
      },
 
      {
        path: 'tresorerie', component : TresorerieComponent
      },
      {
        path: 'appartement', component : AppartementComponent
      },
      {
        path: 'paiement', component : PaiementComponent
      },
      {
        path: 'locataire', component : LocataireComponent
      },
      {
        path: 'ramassage-oeuf', component : RamassageOeufComponent
      },
      {
        path: 'change-password', component : ChangePasswordComponent
      },
      {
        path: 'user', component : UserComponent, canActivate: [AuthorizationGuard], data : {role : "admin"}
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'notAuthorized', component : NotAutorizedComponent
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
