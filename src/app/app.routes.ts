import { Routes } from '@angular/router';
import { PlayWithJsonComponent } from './components/core/play-with-json/play-with-json.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { AppsComponent } from './components/core/apps/apps.component';
import { TimeComponent } from './components/core/time/time.component';
import { JsonDiffComponent } from './components/core/json-diff/json-diff.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/apps'
  },
  {
    path: 'apps',
    component: AppsComponent
  },
  {
    path: 'jsonplay',
    component: PlayWithJsonComponent
  },
  {
    path: 'jsondiff',
    component: JsonDiffComponent
  },
  {
    path: 'time',
    component: TimeComponent
  },
  {
    path: 'calendar',
    component: TimeComponent
  },
  { path: '**', component: NotFoundComponent },
];
