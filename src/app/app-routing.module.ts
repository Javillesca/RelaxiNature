import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetailsMeditationComponent } from './components/details-meditation/details-meditation.component';
import { DetailsRelaxComponent } from './components/details-relax/details-relax.component';
import { MeditationComponent } from './components/meditation/meditation.component';
import { RelaxComponent } from './components/relax/relax.component';

const routes: Routes = [
  { path: 'relax', component: RelaxComponent, data: { routeName: 'title_relax' }},
  { path: 'meditation', component: MeditationComponent, data: { routeName: 'title_meditation' }},
  { path: 'detailrelax/:id', component: DetailsRelaxComponent, data: { routeName: 'title_relax' }},
  { path: 'detailmeditation/:id/:time', component: DetailsMeditationComponent, data: { routeName: 'title_meditation' }},
  { path: '**', pathMatch: 'full', redirectTo: 'relax' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
