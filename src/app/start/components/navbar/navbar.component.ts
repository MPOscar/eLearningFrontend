import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  Inject,
  Input,
} from "@angular/core";
import { DialogLoginService } from "../../../shared/services/dialog-login.service";
//
import { DOCUMENT } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import "rxjs/add/operator/filter";
import { UserService } from "../../../shared/services/user.service";
import { AuthenticationService } from "../../../shared/services/authentication.service";
import { ShowProgressService } from "../../../shared/services/show-progress.service";
import { APIInfo } from "../../../models/APIInfo";
import { APIInfoService } from "../../../shared/services/data.service";
import { isNullOrUndefined } from "util";
import { RavenErrorHandler } from "../../../shared/services/raven-error-handler.service";
import { ThemeService } from "../../../shared/services/theme.service";
import { TranslateService } from "@ngx-translate/core";
import { DomSanitizer, SafeStyle } from "@angular/platform-browser";
import { TranslatableSnackBarService } from "../../../shared/services/translatable-snack-bar.service";
//
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from "@angular/common";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  private toggleButton: any;

  private sidebarVisible: boolean;

  title = "app works!";

  showProgressBar = false;

  apiInfo: APIInfo;

  avatarBackgroundImage: SafeStyle | undefined;

  private _router: Subscription;

  @Input() showTransparent = true;

  constructor(
    public location: Location,
    private element: ElementRef,
    public dialogLoginService: DialogLoginService,
    private router: Router,
    private authenticationService: AuthenticationService,
    public userService: UserService,
    private showProgress: ShowProgressService,
    private apiInfoService: APIInfoService,
    private ravenErrorHandler: RavenErrorHandler,
    private snackBar: TranslatableSnackBarService,
    private themeService: ThemeService,
    public translate: TranslateService,
    private domSanitizer: DomSanitizer,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.sidebarClose();
    const navbar: HTMLElement = this.element.nativeElement.children[0];
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    this.renderer.listen("window", "scroll", (event) => {
      const number = window.scrollY;
      var _location = this.location.path();
      _location = _location.split("/")[2];

      if (number > 150 || window.pageYOffset > 150) {
        navbar.classList.remove("navbar-transparent");
      } else if (
        _location !== "login" &&
        this.location.path() !== "/nucleoicons"
      ) {
        if (this.showTransparent) {
          navbar.classList.add("navbar-transparent");
        }
      }
    });

    if (!this.showTransparent) {
      navbar.classList.remove("navbar-transparent");
    }

    const lang =
      localStorage.getItem("lang") ||
      this.translate.getBrowserLang() ||
      this.translate.getDefaultLang();
    this.translate.use(lang);

    this.authenticationService.reloadUser();

    this.apiInfoService
      .readAPIInfo()
      .then((info: any) => {
        this.ravenErrorHandler.setup(info.sentryDsn);
        this.apiInfo = info;
      })
      .catch((err) => {
        this.snackBar.open("home.backendError", { err: err.error }, null);
      });

    this.updateCurrentUser();

    this.userService.data.subscribe((actualProfilePicturePath) => {
      if (
        actualProfilePicturePath === undefined &&
        this.userService.user.profile.picture
      ) {
        actualProfilePicturePath = this.userService.user.profile.picture.path;
      }
      if (
        actualProfilePicturePath === undefined ||
        actualProfilePicturePath === ""
      ) {
        this.avatarBackgroundImage = undefined;
        return;
      }

      actualProfilePicturePath = "/api/" + actualProfilePicturePath;
      this.avatarBackgroundImage = this.domSanitizer.bypassSecurityTrustStyle(
        `url(${actualProfilePicturePath})`
      );
    });
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName("html")[0];
    setTimeout(function () {
      toggleButton.classList.add("toggled");
    }, 500);
    html.classList.add("nav-open");

    this.sidebarVisible = true;
  }
  sidebarClose() {
    const navbar: HTMLElement = this.element.nativeElement.children[0];
    this.toggleButton = navbar.getElementsByClassName("navbar-toggler")[0];
    console.log(navbar.getElementsByClassName("navbar-toggler"));
    const html = document.getElementsByTagName("html")[0];
    this.toggleButton.classList.remove("toggled");
    this.sidebarVisible = false;
    html.classList.remove("nav-open");
  }
  sidebarToggle() {
    // const toggleButton = this.toggleButton;
    // const body = document.getElementsByTagName('body')[0];
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }

  isDocumentation() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee === "/documentation") {
      return true;
    } else {
      return false;
    }
  }

  login() {
    this.dialogLoginService.openLogin({ nada: "algo" });
  }

  updateCurrentUser() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      this.userService.setUser(storedUser);
    }
  }

  changeLanguage(lang: string) {
    localStorage.setItem("lang", lang);
    this.translate.use(lang);
  }

  hasWarning() {
    return (
      !isNullOrUndefined(this.apiInfo) &&
      !isNullOrUndefined(this.apiInfo.nonProductionWarning)
    );
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn;
  }

  logout() {
    delete this.avatarBackgroundImage;
    this.authenticationService.logout();
  }

  toggleProgressBar() {
    this.showProgressBar = !this.showProgressBar;
  }

  isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  isStudent(): boolean {
    return this.userService.isStudent();
  }

  specialContainerStyle(): string {
    const routeTest = /^(\/|\/login|\/register|\/reset|\/activation-resend)$/.test(
      this.router.url
    );

    return routeTest && !this.isLoggedIn() ? "special-style" : "";
  }

  contentStyle(): string {
    let style = "app-content";
    // Don't add padding when displaying non-plaintext files such as PDFs via a FileComponent.
    const routeTest = /^\/file/.test(this.router.url);
    if (!routeTest) {
      style += " app-content-padding";
    }
    return style;
  }
}
