import { Routes } from '@angular/router';
import { PlayWithJsonComponent } from './components/core/play-with-json/play-with-json.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AppsComponent } from './components/core/apps/apps.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/jsonplay'
  },
  {
    path: 'apps',
    component: AppsComponent
  },
  {
    path: 'jsonplay',
    component: PlayWithJsonComponent
  },
  { path: '**', component: NotFoundComponent },
];
