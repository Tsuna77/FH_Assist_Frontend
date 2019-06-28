import { Component, OnInit } from '@angular/core';

import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { isDevMode } from '@angular/core';
import { Config, configService } from './config/config.service';
import { loginService, Login } from './api/api.service';

export class User {
  socialUser: SocialUser;
  state: number = User._ANONYMOUS;

  static readonly _ANONYMOUS: number = 0;
  static readonly _CONNECTING: number = 1;
  static readonly _CONNECTED: number = 2;
}

@Component({
  selector: 'app-page',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  page: Object;
  error: any;
  config: Config;
  login: Login;

  constructor(private authService: AuthService, private configService: configService, private loginService: loginService) { }
  title = 'Fun-hospital';

  user: User;

  get userConnected(){
    return User._CONNECTED;
  }
  get userConnecting(){
    return User._CONNECTING;
  }
  get userAnonymous(){
    return User._ANONYMOUS;
  }

  loadPage() {

  }

  getConfig() {
    this.configService.getConfig()
      .subscribe(
        (configData: Config) => this.config = { ...configData }, // success path
        error => this.error = error // error path
      );
  }

  dologin() {
    this.user.state = User._CONNECTING;
    isDevMode && console.debug("Demande de connection au serveur");
    this.loginService.postLogin(this.user.socialUser.idToken)
      .subscribe(
        (loginData: Login) => {
          this.login = { ...loginData },
          isDevMode && console.debug("Connecté");
            this.user.state = User._CONNECTED
        }, // success path
        error => {
          this.error = error,
           isDevMode && console.debug("Connection refusé");
            this.user.state = User._ANONYMOUS
        } // error path
      );


  }

  showConfig() {
    if (this.user.state == User._CONNECTED) {
      isDevMode && console.debug("Affichage de la configuration dans les logs");
      isDevMode && console.debug(this.config);

    }

  }
  ngOnInit() {
    this.user=new User();
    this.authService.authState.subscribe((user) => {
      if (user != null) {
        isDevMode && console.debug("Récupération de la session");
        this.user.socialUser = user;
        this.user.state = User._CONNECTING;
        isDevMode && console.debug(this.user);
        this.loginService.googleLogin(this.config);
        this.dologin()
      }
    });
    isDevMode && console.debug("App starting...")
    this.getConfig()
  }

  signInWithGoogle(): void {
    isDevMode && console.debug("Connection via les services google")
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);

  }


  signOut(): void {
    this.authService.signOut();
  }

  pageRecap() {
    isDevMode && console.debug("Chargement de la page de Récap");
  }
  pageSalles() {
    isDevMode && console.debug("Chargement de la page des Salles");
  }
  pageSoins() {
    isDevMode && console.debug("Chargement de la page des Soins");
  }
}
