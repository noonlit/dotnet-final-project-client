import { Story, GENRES } from './../../models/story.model';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';
import { Tag } from '../../models/tag.model';

@Component({
  selector: 'app-start-story',
  templateUrl: 'start.story.page.html',
})
export class StartStoryPage {
  story = new Story();
  GENRES = GENRES;
  tags;

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) { }

  ionViewWillEnter() {
    this.loadTags();
  }

  loadTags() {
    this.apiSvc.get('api/Stories/Tags')
      .subscribe(
        tags => {
          this.tags = tags;
          console.log(tags);
        },
        (err) => {
          console.log(err);
        });
  }

  saveStory() {
    this.story.createdAt = new Date();

    this.apiSvc.post('api/Stories', this.story).subscribe(
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

  goToList() {
    this.navCtrl.navigateBack('/stories');
  }
}
