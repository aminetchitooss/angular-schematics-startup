import { SchematicContext, Tree } from "@angular-devkit/schematics";
import { MsalSchematicOption } from ".";
import { updateFile } from "./update-file";

const appHtmlUpdatedContent = `
<ng-container *ngIf="!isIE">
  <router-outlet *ngIf="!isIframe"></router-outlet>
</ng-container>

`;

export function updateAppHtml(options: MsalSchematicOption) {
  return (_host: Tree, _context: SchematicContext) => {
    return updateFile(_host, _context, "app.component.html", appHtmlUpdatedContent, options);
  };
}

const appTsUpdatedContent = `import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { filter, takeUntil } from 'rxjs/operators';
import { SwUpdate } from '@angular/service-worker';
import { interval, Subject } from 'rxjs';

const isIE: boolean = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isIE: boolean = isIE;
  isIframe = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(private _msalBroadcastService: MsalBroadcastService, private _msalService: MsalService, public _updates: SwUpdate) {
    if (_updates.isEnabled) interval(6 * 60 * 60).subscribe(() => _updates.checkForUpdate().then(() => console.log('checking for updates')));
    this.checkForUpdates();
  }

  public checkForUpdates(): void {
    this._updates.available.subscribe((event) => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    this._updates.activateUpdate().then(() => document.location.reload());
  }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal

    this._msalService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this._msalBroadcastService.msalSubject$
      .pipe(filter((msg: EventMessage) => msg.eventType === EventType.ACCOUNT_ADDED || msg.eventType === EventType.ACCOUNT_REMOVED))
      .subscribe((result: EventMessage) => {
        if (this._msalService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        }
      });

    this._msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.checkAndSetActiveAccount();
      });
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this._msalService.instance.getActiveAccount();

    if (!activeAccount && this._msalService.instance.getAllAccounts().length > 0) {
      let accounts = this._msalService.instance.getAllAccounts();
      this._msalService.instance.setActiveAccount(accounts[0]);
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
`;

export function updateAppTs(options: MsalSchematicOption) {
  return (_host: Tree, _context: SchematicContext) => {
    return updateFile(_host, _context, "app.component.ts", appTsUpdatedContent, options);
  };
}
