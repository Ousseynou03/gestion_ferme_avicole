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
            icon: 'ti ti-typography'
          },
          {
            id: 'ouvrier',
            title: 'Ouvrier',
            type: 'item',
            classes: 'nav-item',
            url: '/ouvrier',
            icon: 'ti ti-typography'
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
            id: 'batiment',
            title: 'Vente',
            type: 'item',
            classes: 'nav-item',
            url: '/vente',
            icon: 'fa fa-user'
          },
          {
            id: 'Trésorerie',
            title: 'Trésorerie',
            type: 'item',
            classes: 'nav-item',
            url: '/tresorerie',
            icon: 'ti ti-typography'
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
            icon: 'fa fa-user'
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
            icon: 'fa fa-user'
          },
        ]
      },

    ]
  },


  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/berry-angular/',
        icon: 'ti ti-vocabulary',
        target: true,
        external: true
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
