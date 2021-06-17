
import { SideMenuComponent } from './components/side.menu/side.menu.component';
import { StoriesPage } from './pages/stories/stories.page';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ApiService } from './services/api.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './pages/login/login.page';
import { AuthService } from './services/auth.service';
import { ViewStoryPage } from './pages/view-story-page/view.story.page';
import { StartStoryPage } from './pages/start-story-page/start.story.page';
import { TokenInterceptor } from './interceptors/auth.token.interceptor';

@NgModule({
  declarations: [
    // components
    AppComponent,
    NavbarComponent,
    SideMenuComponent,
    // pages
    StoriesPage,
    LoginPage,
    ViewStoryPage,
    StartStoryPage
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ApiService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
