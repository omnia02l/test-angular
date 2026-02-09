import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/demandes', pathMatch: 'full' },
  { path: 'demandes', loadComponent: () => import('./features/demandes/components/demande-list/demande-list.component').then((m) => m.DemandeListComponent) },
  { path: 'demandes/new', loadComponent: () => import('./features/demandes/components/demande-create/demande-create.component').then((m) => m.DemandeCreateComponent) },
  { path: '**', redirectTo: '/demandes' },
];
