import { Component, OnInit } from '@angular/core';

import { AuthService, SocialUser } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { isDevMode } from '@angular/core';
import { Config , configService} from './config/config.service';
import {loginService, Login } from './api/api.service';



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

  private user: SocialUser;
  public loggedIn: boolean;

  loadPage() {

  }

  getConfig(){
    this.configService.getConfig()
      .subscribe(
        (configData: Config) => this.config = { ...configData }, // success path
        error => this.error = error // error path
      );
  }

  dologin(){
    this.loginService.postLogin(this.user.idToken)
      .subscribe(
        (loginData: Login) => this.login = { ...loginData }, // success path
        error => this.error = error // error path
      );

  }

  showConfig(){
    if (this.loggedIn) {
      isDevMode && console.debug("Affichage de la configuration dans les logs");
      isDevMode && console.debug(this.config);

    }

  }
  ngOnInit() {

    this.authService.authState.subscribe((user) => {
      if (user != null){
        isDevMode && console.debug("Récupération de la session");
        this.user = user;
        this.loggedIn = (user != null);
        isDevMode && console.debug(this.user);
        this.loginService.googleLogin(this.config);
        this.dologin()
        this.loginService.postLogin(this.user.idToken);
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
