import { Story, GENRES } from './../../models/story.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { Tag } from '../../models/tag.model';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-create-tag',
  templateUrl: 'create.tag.page.html',
})
export class CreateTagPage {
  tag: Tag = new Tag();

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  saveTag() {
    this.apiSvc.post('api/Stories/Tags', this.tag).subscribe(
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

  goToList() {
    this.navCtrl.navigateBack('/tags');
  }
}
