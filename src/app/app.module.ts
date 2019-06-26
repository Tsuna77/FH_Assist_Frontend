// import lib material
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatToolbarModule, MatMenuModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgModule } from '@angular/core';

//import { AppRoutingModule } from './app-routing.module';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider/*, FacebookLoginProvider*/ } from "angularx-social-login";

import { HttpClientModule } from '@angular/common/http';

// appli
import { AppComponent } from './app.component';
import { configService } from "./config/config.service"
import { loginService } from "./api/api.service"
//import { ContentService } from './shared/services/content.service';


import { secret } from '../environments/secret';
import { PageComponent } from './page/page.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(secret.GOOGLE_API_KEY)
  }//,
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider("Facebook-App-Id")
  // }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    PageComponent
  ],
  imports: [
//    AppRoutingModule,
    SocialLoginModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    FlexLayoutModule,
    MatSidenavModule
  ],
  providers: [
    configService,
    loginService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
