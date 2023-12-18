import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavLogoComponent } from './theme/layout/admin/nav-bar/nav-logo/nav-logo.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { SharedModule } from './theme/shared/shared.module';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { BatimentComponent } from './demo/elements/batiment/batiment.component';
import { ClientComponent } from './demo/elements/client/client.component';
import { MaterielComponent } from './demo/elements/materiel/materiel.component';
import { OuvrierComponent } from './demo/elements/ouvrier/ouvrier.component';
import { FournisseurComponent } from './demo/elements/fournisseur/fournisseur.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './demo/services/auth.service';
import { LoginComponent } from './demo/login/login.component';
import { UserComponent } from './demo/user/user.component';
import { VenteComponent } from './demo/elements/vente/vente.component';
import { DepenseComponent } from './demo/elements/depense/depense.component';
import { BandeComponent } from './demo/elements/bande/bande.component';


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import { NutritionComponent } from './demo/elements/nutrition/nutrition.component';
import { MortaliteComponent } from './demo/elements/mortalite/mortalite.component';
import { TresorerieComponent } from './demo/elements/tresorerie/tresorerie.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './demo/services/auth-interceptor.service';
import { NotAutorizedComponent } from './demo/elements/not-autorized/not-autorized.component';
import { OeufComponent } from './demo/elements/oeuf/oeuf.component';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RamassageOeufComponent } from './demo/elements/ramassage-oeuf/ramassage-oeuf.component';
import { AppartementComponent } from './demo/elements/appartement/appartement.component';
import { PaiementComponent } from './demo/elements/paiement/paiement.component';
import { LocataireComponent } from './demo/elements/locataire/locataire.component';
import { ChangePasswordComponent } from './demo/elements/change-password/change-password.component';
import {MatDialogModule} from '@angular/material/dialog';
import { EditComponent } from './demo/elements/bande/dialog/edit/edit.component'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ContratLocationComponent } from './demo/elements/contrat-location/contrat-location.component';
import { DialogComponent } from './demo/elements/locataire/dialog/dialog/dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EditBatimentComponent } from './demo/elements/batiment/dialog/edit-batiment/edit-batiment.component';
import { EditClientComponent } from './demo/elements/client/dialog/edit-client/edit-client.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavBarComponent,
    NavLeftComponent,
    NavRightComponent,
    NavigationComponent,
    NavLogoComponent,
    NavContentComponent,
    NavGroupComponent,
    NavItemComponent,
    NavCollapseComponent,
    ConfigurationComponent,
    GuestComponent,
    BatimentComponent,
    ClientComponent,
    MaterielComponent,
    OuvrierComponent,
    OeufComponent,
    FournisseurComponent,
    LoginComponent,
    UserComponent,
    VenteComponent,
    DepenseComponent,
    BandeComponent,
    NutritionComponent,
    MortaliteComponent,
    TresorerieComponent,
    NotAutorizedComponent,
    RamassageOeufComponent,
    AppartementComponent,
    PaiementComponent,
    LocataireComponent,
    ChangePasswordComponent,
    EditComponent,
    ContratLocationComponent,
    DialogComponent,
    EditBatimentComponent,
    EditClientComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatSelectModule,
    CommonModule,
    NgbDropdownModule,
    MatButtonModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule

    

  ],
  providers: [NavigationItem, AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {}
