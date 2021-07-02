import { Story, GENRES } from './../../models/story.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { Tag } from '../../models/tag.model';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';
import { switchMap } from "rxjs/operators";
import { Fragment } from '../../models/fragment.model';

@Component({
  selector: 'app-edit-fragment',
  templateUrl: 'edit.fragment.page.html',
})
export class EditFragmentPage implements OnInit {
  fragment: Fragment

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadFragment();
  }

  loadFragment() {
    this.route.params
      .pipe(switchMap((params: Params) => this.apiSvc.get('api/Stories/Fragments/' + params['id'])))
      .subscribe(response => {
        this.fragment = response;
        this.cd.detectChanges();
      });
  }

  saveFragment() {
    this.apiSvc.put('api/Stories/' + this.fragment.storyId + '/Fragments/' + this.fragment.id, this.fragment).subscribe(
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
    this.navCtrl.navigateBack('/story/view/' + this.fragment.storyId);
  }
}
