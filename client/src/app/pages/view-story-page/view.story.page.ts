import { Story, GENRES } from './../../models/story.model';
import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { Comment } from '../../models/comment.model';
import { Observable } from 'rxjs';
import { switchMap } from "rxjs/operators";
import { ActivatedRoute, Params } from "@angular/router";
import { User } from '../../models/user.model';
import { Fragment } from '../../models/fragment';

@Component({
  selector: 'app-view-story',
  templateUrl: 'view.story.page.html',
  styleUrls: ['view.story.page.scss'],
})
export class ViewStoryPage {
  isAuthenticated: Observable<boolean>;
  currentUser: User;
  storyDataLoaded: boolean = false;
  comments: Comment[];
  newComment = new Comment();
  newFragment = new Fragment();
  @Input() story: Story;

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
        story => {
          this.story = story;
          console.log(story);

          this.comments = this.story.comments;
          this.storyDataLoaded = true;
          this.cd.detectChanges();
        },
        (err) => {
          console.log(err);
        }
    );
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
        this.comments = this.comments.filter(c => c.id !== commentId),
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

  saveFragment() {
    this.newFragment.storyId = this.story.id;
    this.newFragment.userId = this.currentUser.id;

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
        this.story.fragments = this.story.fragments.filter(f => f.id !== fragmentId);
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
