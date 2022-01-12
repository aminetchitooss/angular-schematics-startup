import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus, AuthenticationResult } from '@azure/msal-browser';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { validateEmail } from '../shared/global-utils/functions';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  loginDisplay: boolean | null = null;

  userNameCtrl = new FormControl('amine.tchita.infogene@servier.com', [Validators.required]);
  nameChangeSub: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    private msalBroadcastService: MsalBroadcastService,
    private msalService: MsalService,

    private router: Router
  ) {}

  ngOnInit(): void {
    this.msalBroadcastService.msalSubject$.pipe(filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS)).subscribe((result: EventMessage) => {
      console.log(result);
      const payload = result.payload as AuthenticationResult;
      this.msalService.instance.setActiveAccount(payload.account);
    });

    this.msalBroadcastService.inProgress$.pipe(filter((status: InteractionStatus) => status === InteractionStatus.None)).subscribe(() => {
      this.setLoginDisplay();
    });
  }

  setLoginDisplay() {
    this.loginDisplay = this.msalService.instance.getAllAccounts().length > 0;
    if (this.loginDisplay) {
      localStorage['save'] = 'true';
      const vUrlRedirect = this.authService.getRedirectAfterLogin();
      this.authService.clearRedirectAfterLogin();
      this.router.navigate([vUrlRedirect]);
    }
  }

  ngAfterViewInit(): void {
    this.detectUserNameChanges();
  }

  detectUserNameChanges() {
    this.nameChangeSub = this.userNameCtrl.valueChanges.subscribe(() => {
      const valid =
        validateEmail(this.userNameCtrl.value) &&
        (this.userNameCtrl.value.toUpperCase().split('SERVIER').length > 1 || this.userNameCtrl.value.toUpperCase().split('BIOGARAN').length > 1);
      this.userNameCtrl.setErrors({
        wrongMail: !valid
      });
      if (valid) this.userNameCtrl.updateValueAndValidity({ emitEvent: false });
    });
  }

  connect() {
    if (this.userNameCtrl.valid) {
      this.authService.loginWithHint(this.userNameCtrl.value);
    } else {
      alert('Veuillez saisir votre adresse e-mail Servier ou Biogaran');
    }
  }

  ngOnDestroy() {
    if (this.nameChangeSub) this.nameChangeSub.unsubscribe();
  }
}
