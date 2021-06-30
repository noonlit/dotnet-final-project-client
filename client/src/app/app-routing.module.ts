import { StoriesPage } from './pages/stories/stories.page';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { ViewStoryPage } from './pages/view-story-page/view.story.page';
import { StartStoryPage } from './pages/start-story-page/start.story.page';
import { EditStoryPage } from './pages/edit-story-page/edit.story.page';
import { TagsPage } from './pages/tags/tags.page';
import { EditTagPage } from './pages/edit-tag-page/edit.tag.page';
import { CreateTagPage } from './pages/create-tag-page/create.tag.page';

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
    path: 'story/edit/:id',
    component: EditStoryPage,
  },
  {
    path: 'tags',
    component: TagsPage,
  },
  {
    path: 'tag/create',
    component: CreateTagPage,
  },
  {
    path: 'tag/edit/:id',
    component: EditTagPage,
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
