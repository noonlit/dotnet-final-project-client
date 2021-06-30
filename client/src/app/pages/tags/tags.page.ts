import { Router } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: 'tags.page.html',
  styleUrls: ['tags.page.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TagsPage {
  tags: Tag[];
  isAuthenticated: Observable<boolean>;

  constructor(private apiSvc: ApiService, private router: Router, private authSvc: AuthService) { }
  ionViewWillEnter() {
    this.isAuthenticated = this.authSvc.isAuthenticated();
    this.loadTags();
  }

  createTag() {
    this.router.navigateByUrl('tag/create');
  }

  editTag(tag: Tag) {
    this.router.navigate(['/tag/edit', tag.id]);
  }

  deleteTag(tag: Tag) {
    this.apiSvc.delete(`api/Stories/Tags/${tag.id}`).subscribe(() => {
      this.loadTags();
    });
  }

  public loadTags() {
    this.apiSvc.get('api/Stories/Tags').subscribe((response: Tag[]) => {
      this.tags = response;
    });
  }
}
