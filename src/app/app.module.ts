import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
//import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from './demo/services/auth.service';
import { LoginComponent } from './demo/login/login.component';
import { UserComponent } from './demo/user/user.component';

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
    FournisseurComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule, 
    SharedModule, 
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [NavigationItem, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
