import { Story, GENRES } from './../../models/story.model';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Comment, PaginatedComments } from '../../models/comment.model';
import { Observable } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { ActivatedRoute, Params } from "@angular/router";
import { User } from '../../models/user.model';
import { Fragment, PaginatedFragments } from '../../models/fragment.model';

@Component({
  selector: 'app-view-story',
  templateUrl: 'view.story.page.html',
  styleUrls: ['view.story.page.scss'],
})
export class ViewStoryPage {
  isAuthenticated: Observable<boolean>;
  currentUser: User;
  storyDataLoaded: boolean = false;
  comments: PaginatedComments;
  newComment = new Comment();
  newFragment = new Fragment();
  @Input() story: Story;
  fragments: PaginatedFragments;
  currentFragmentsPage: number;
  currentCommentsPage: number;

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private authSvc: AuthService,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.isAuthenticated = this.authSvc.isAuthenticated();

    this.isAuthenticated.subscribe(
      isAuth => {
        if (!isAuth) {
          return;
        }

        this.authSvc.getCurrentUser().subscribe(
          user => {
            this.currentUser = user;
          },
          error => console.log(error)
        );
      }
    );

    this.loadStory();
  }

  loadStory() {
    this.route.params
      .pipe(switchMap((params: Params) => this.apiSvc.get(`api/Stories/${params['id']}`)))
      .subscribe(
        storyData => {
          this.story = storyData.story;
          this.comments = storyData.comments;
          this.fragments = storyData.fragments;
          this.currentFragmentsPage = 1;
          this.currentCommentsPage = 1;
          this.storyDataLoaded = true;
          this.cd.detectChanges();
        },
        (err) => {
          console.log(err);
        }
    );
  }

  loadFragments(page: number = 1) {
    this.apiSvc.get('api/Stories/' + this.story.id + '/Fragments', { 'page': page }).subscribe((response: PaginatedFragments) => {
      this.fragments = response;
      this.currentFragmentsPage = page;
      this.cd.detectChanges();
    });
  }

  loadComments(page: number = 1) {
    this.apiSvc.get('api/Stories/' + this.story.id + '/Comments', { 'page': page }).subscribe((response: PaginatedFragments) => {
      this.comments = response;
      this.currentCommentsPage = page;
      this.cd.detectChanges();
    });
  }

  saveComment() {
    this.newComment.storyId = this.story.id;
    this.newComment.userId = this.currentUser.id;

    this.apiSvc.post('api/Stories/' + this.story.id + '/comments', this.newComment)
      .subscribe(
        () => {
          this.loadStory();
          this.newComment = new Comment();
        },
        (err) => {
          let message = 'Validation error';
          const errorsArray = err?.error?.errors;
          if (errorsArray) {
            message = Object.values(errorsArray)[0] as string;
          }
          this.alertCtrl
            .create({
              header: 'Error',
              message: message,
              buttons: ['Ok'],
            })
            .then((al) => al.present());
        }
      );
  }

  deleteComment(commentId: number) {
    this.apiSvc.delete('api/Stories/' + this.story.id + '/comments/' + commentId).subscribe(
      () => {
        this.comments.entities = this.comments.entities.filter(c => c.id !== commentId),
          this.cd.detectChanges();
      },
      (err) => {
        let message = 'Error';
        const errorsArray = err?.error?.errors;
        if (errorsArray) {
          message = Object.values(errorsArray)[0] as string;
        }
        this.alertCtrl
          .create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
          })
          .then((al) => al.present());
      }
    );
  }

  saveFragment(isLast: boolean = false) {
    this.newFragment.storyId = this.story.id;
    this.newFragment.userId = this.currentUser.id;
    this.newFragment.isLast = isLast;

    this.apiSvc.post('api/Stories/' + this.story.id + '/fragments', this.newFragment)
      .subscribe(
        () => {
          this.loadStory();
          this.newFragment = new Fragment();
        },
        (err) => {
          let message = 'Validation error';
          const errorsArray = err?.error?.errors;
          if (errorsArray) {
            message = Object.values(errorsArray)[0] as string;
          }
          this.alertCtrl
            .create({
              header: 'Error',
              message: message,
              buttons: ['Ok'],
            })
            .then((al) => al.present());
        }
      );
  }

  deleteFragment(fragmentId: number) {
    this.apiSvc.delete('api/Stories/' + this.story.id + '/fragments/' + fragmentId).subscribe(
      () => {
        this.fragments.entities = this.fragments.entities.filter(f => f.id !== fragmentId);
          this.cd.detectChanges();
      },
      (err) => {
        let message = 'Error';
        const errorsArray = err?.error?.errors;
        if (errorsArray) {
          message = Object.values(errorsArray)[0] as string;
        }
        this.alertCtrl
          .create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
          })
          .then((al) => al.present());
      }
    );
  }

  removeTag(tagId: number) {

    this.apiSvc.delete('api/Stories/' + this.story.id + '/tags/' + tagId).subscribe(
      () => {
        this.story.tags = this.story.tags.filter(f => f.id !== tagId);
        this.cd.detectChanges();
      },
      (err) => {
        let message = 'Error';
        const errorsArray = err?.error?.errors;
        if (errorsArray) {
          message = Object.values(errorsArray)[0] as string;
        }
        this.alertCtrl
          .create({
            header: 'Error',
            message: message,
            buttons: ['Ok'],
          })
          .then((al) => al.present());
      }
    );
  }

  getFragmentColumnSize()
  {
    return this.isAuthenticated ? 11 : 12;
  }

  getFragmentActionsColumnSize() {
    return this.isAuthenticated ? 1 : 0;
  }

  goToList() {
    this.navCtrl.navigateBack('/stories');
  }
}
