import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { PaginatedStories, Story } from './../../models/story.model';
import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-stories',
  templateUrl: 'stories.page.html',
  styleUrls: ['stories.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StoriesPage {
  stories: PaginatedStories;
  currentPage: number;
  currentFilter?: Tag;
  isAuthenticated: Observable<boolean>;

  constructor(private apiSvc: ApiService, private router: Router, private authSvc: AuthService) { }
  ionViewWillEnter() {
    this.isAuthenticated = this.authSvc.isAuthenticated();
    this.loadStories();
  }

  startStory() {
    this.router.navigateByUrl('story/start');
  }

  viewStory(story: Story) {
    this.router.navigate(['/story/view', story.id]);
  }

  deleteStory(story: Story) {
    this.apiSvc.delete(`api/Stories/${story.id}`).subscribe(() => {
      this.loadStories();
    });
  }

  public loadStories(page: number = 1) {
    if (this.currentFilter && this.currentFilter.id) {
      return this.loadStoriesForTag(this.currentFilter, page);
    }

    this.apiSvc.get('api/Stories', { 'page': page }).subscribe((response: PaginatedStories) => {
      this.stories = response;
      this.currentPage = page;
      console.log(this.stories);
    });
  }

  public loadStoriesForTag(tag: Tag, page: number = 1) {
    this.apiSvc.get('api/Stories/filter/' + tag.id, { 'page': page }).subscribe((response: PaginatedStories) => {
      this.stories = response;
      this.currentPage = page;
      this.currentFilter = tag;
      console.log(this.stories);
    });
  }

  public removeFilter() {
    this.currentFilter = null;
    this.loadStories();
  }
}
