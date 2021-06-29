import { Story, GENRES } from './../../models/story.model';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { Tag } from '../../models/tag.model';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';
import { switchMap } from "rxjs/operators";

@Component({
  selector: 'app-edit-story',
  templateUrl: 'edit.story.page.html',
})
export class EditStoryPage implements OnInit {
  story: Story;
  GENRES = GENRES;
  tags;

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) { }

  ionViewWillEnter() {

  }

  ngOnInit() {
    this.loadStory();
    this.loadTags();
  }

  loadStory() {
    this.route.params
      .pipe(switchMap((params: Params) => this.apiSvc.get('api/Stories/' + params['id'])))
      .subscribe(response => {
        this.story = response.story;
        this.cd.detectChanges();
      });
  }

  loadTags() {
    this.apiSvc.get('api/Stories/Tags')
      .subscribe(
        tags => {
          this.tags = tags;
        },
        (err) => {
          console.log(err);
        });
  }

  saveStory() {
    this.apiSvc.put('api/Stories/' + this.story.id, this.story).subscribe(
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

  compareWith(o1: Tag, o2: Tag | Tag[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: Tag) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }
}
