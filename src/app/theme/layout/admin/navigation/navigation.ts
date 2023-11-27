import { Injectable } from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  icon?: string;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: Navigation[];
  role? : string;
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}
const NavigationItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Dasbord',
        type: 'item',
        classes: 'nav-item',
        url: '/default',
        icon: 'ti ti-dashboard',
        breadcrumbs: false
      }
    ]
  },
  {
    id: 'elements',
    title: 'Gestion Batiment',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'elements',
        title: 'Batilments du ferme',
        type: 'collapse',
        icon: 'fas fa-building',
        children: [
          {
            id: 'batiment',
            title: 'Batiment',
            type: 'item',
            classes: 'nav-item',
            url: '/batiment',
            icon: 'fas fa-building'
          },
          {
            id: 'materiel',
            title: 'Materiel',
            type: 'item',
            classes: 'nav-item',
            url: '/materiel',
            icon: 'fas fa-wrench'
          },
          {
            id: 'Nutrition',
            title: 'Nutrition',
            type: 'item',
            classes: 'nav-item',
            url: '/nutrition',
            icon: 'fas fa-balance-scale'
          },
        ]
      },

    ]
  },

  {
    id: 'elements',
    title: 'Gestion des individus',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'elements',
        title: 'Individu',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'utilisateur',
            title: 'Utilisateur',
            type: 'item',
            classes: 'nav-item',
            url: '/user',
            icon: 'fa fa-user'
          },
          {
            id: 'client',
            title: 'Client',
            type: 'item',
            classes: 'nav-item',
            url: '/client',
            icon: 'ti ti-user'
          },
          {
            id: 'ouvrier',
            title: 'Ouvrier',
            type: 'item',
            classes: 'nav-item',
            url: '/ouvrier',
            icon: 'fas fa-hard-hat'
          },
          {
            id: 'fournisseur',
            title: 'Fournisseur',
            type: 'item',
            classes: 'nav-item',
            url: '/fournisseur',
            icon: 'fa fa-industry'
          },
        ]
      },

    ]
  },
  {
    id: 'elements',
    title: 'Solde',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'elements',
        title: 'solde gestavicole',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'Depense',
            title: 'Depense',
            type: 'item',
            classes: 'nav-item',
            url: '/depense',
            icon: 'fas fa-money-check-alt'
          },

          {
            id: 'Vente',
            title: 'Vente',
            type: 'item',
            classes: 'nav-item',
            url: '/vente',
            icon: 'fas fa-shopping-cart'
          },
          {
            id: 'Trésorerie',
            title: 'Trésorerie',
            type: 'item',
            classes: 'nav-item',
            url: '/tresorerie',
            icon: 'fas fa-arrow-up'
          },
        ]
      },

    ]
  },
  {
    id: 'elements',
    title: 'Gestion Bande',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'elements',
        title: 'bande',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'bande',
            title: 'Bande',
            type: 'item',
            classes: 'nav-item',
            url: '/bande',
            icon: 'fas fa-band-aid'
          },
          {
            id: 'Moratlite',
            title: 'Moratlite',
            type: 'item',
            classes: 'nav-item',
            url: '/mortalite',
            icon: 'fas fa-skull'
          },
          {
            id: 'Oeuf',
            title: 'Oeuf',
            type: 'item',
            classes: 'nav-item',
            url: '/oeuf',
            icon: 'fas fa-egg'
          },
        ]
      },

    ]
  },
  {
    id: 'elements',
    title: 'Gestion Locatif',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'elements',
        title: 'Location Appartement',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'appartement',
            title: 'Apartement',
            type: 'item',
            classes: 'nav-item',
            url: '/appartement',
            icon: 'fas fa-home'
          },
        ]
      },

    ]
  },

];

@Injectable()
export class NavigationItem {

  get() {
    return NavigationItems;
  }

  
}
