import { Story, GENRES } from './../../models/story.model';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-start-story',
  templateUrl: 'start.story.page.html',
})
export class StartStoryPage {
  story = new Story();
  GENRES = GENRES;

  constructor(
    private apiSvc: ApiService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
  ) { }

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
  goToList() {
    this.navCtrl.navigateBack('/stories');
  }
}
