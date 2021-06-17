import { StoriesPage } from './pages/stories/stories.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { ViewStoryPage } from './pages/view-story-page/view.story.page';
import { StartStoryPage } from './pages/start-story-page/start.story.page';

const routes: Routes = [
  {
    path: 'stories',
    component: StoriesPage,
  },
  {
    path: 'story/start',
    component: StartStoryPage,
  },
  {
    path: 'story/view/:id',
    component: ViewStoryPage,
  },
  {
    path: '',
    redirectTo: 'stories',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
