import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from "@angular/router";
import { switchMap } from "rxjs/operators";
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-edit-comment',
  templateUrl: 'edit.comment.page.html',
})
export class EditCommentPage implements OnInit {
  comment: Comment

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadComment();
  }

  loadComment() {
    this.route.params
      .pipe(switchMap((params: Params) => this.apiSvc.get('api/Stories/Comments/' + params['id'])))
      .subscribe(response => {
        this.comment = response;
        this.cd.detectChanges();
      });
  }

  saveComment() {
    this.apiSvc.put('api/Stories/' + this.comment.storyId + '/Comments/' + this.comment.id, this.comment).subscribe(
      () => {
        this.navCtrl.pop();
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

  goToStory() {
    this.navCtrl.navigateBack('/story/view/' + this.comment.storyId);
  }
}
