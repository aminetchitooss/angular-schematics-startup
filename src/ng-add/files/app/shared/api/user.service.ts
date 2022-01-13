import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Response_Type } from '../interfaces/utils';
import { User_Model } from '../store/user/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private PROFIL_API_URL = '/Api/Profil/';
  currentUser: User_Model | null = null;

  bypassManagerList = ['amine.tchita.infogene@servier.com', 'ghada.sassi.infogene@servier.com'];

  constructor(private apiservice: ApiService, private _store: Store<{ user: User_Model }>) {
    if (!this.currentUser) _store.select('user').subscribe((r) => (this.currentUser = r));
  }

  getProfil(): Observable<Response_Type<User_Model>> {
    const vUrl = this.PROFIL_API_URL + 'GetCurrentUser?base64=true';
    return this.apiservice.getService(vUrl); //.pipe(map((res: User_Model) => ({ ...res, ISMANAGER: this.bypassManagerList.some((upn) => upn == res.UPN) })));
  }
}
