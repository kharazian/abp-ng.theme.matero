import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare let jQuery: any;
declare let abp: any;

@Injectable({
  providedIn: 'root',
})
export class AbpUserConfigurationService {
  constructor(private _http: HttpClient) {}

  initialize(): void {
    this._http.get('/AbpUserConfiguration/GetAll').subscribe(result => {
      console.log(result);
      // jQuery.extend(true, abp, JSON.parse(JSON.stringify(result)));
    });
  }
}
