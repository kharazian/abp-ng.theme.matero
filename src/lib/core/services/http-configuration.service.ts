import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from '../services/message/message.service';
import { LogService } from '../services/log/log.service';
import { HttpResponse } from '@angular/common/http';
import { IErrorInfo, IAjaxResponse } from '../models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class HttpConfigurationService {
  constructor(
    private _messageService: MessageService,
    private _logService: LogService,
    private _route: Router
  ) {}

  defaultError = <IErrorInfo>{
    message: 'An error has occurred!',
    details: 'Error details were not sent by server.',
  };

  defaultError401 = <IErrorInfo>{
    message: 'You are not authenticated!',
    details: 'You should be authenticated (sign in) in order to perform this operation.',
  };

  defaultError403 = <IErrorInfo>{
    message: 'You are not authorized!',
    details: 'You are not allowed to perform this operation.',
  };

  defaultError404 = <IErrorInfo>{
    message: 'Resource not found!',
    details: 'The resource requested could not be found on the server.',
  };

  logError(error: IErrorInfo): void {
    this._logService.error(error);
  }

  showError(error: IErrorInfo): any {
    if (error.details) {
      return this._messageService.error(error.details, error.message || this.defaultError.message);
    } else {
      return this._messageService.error(error.message || this.defaultError.message);
    }
  }

  handleTargetUrl(targetUrl: string): void {
    if (!targetUrl) {
      location.href = '/';
    } else {
      location.href = targetUrl;
    }
  }

  handleUnAuthorizedRequest(messagePromise: any, targetUrl?: string) {
    if (
      this._route.url &&
      (this._route.url.startsWith('/account/login') ||
        this._route.url.startsWith('/account/session-locked'))
    ) {
      return;
    }

    if (messagePromise) {
      messagePromise.done(() => {
        this.handleTargetUrl(targetUrl || '/');
      });
    } else {
      this.handleTargetUrl(targetUrl || '/');
    }
  }

  handleNonCrmErrorResponse(response: HttpResponse<any>) {
    switch (response.status) {
      case 401:
        this.handleUnAuthorizedRequest(this.showError(this.defaultError401), '/');
        break;
      case 403:
        this.showError(this.defaultError403);
        break;
      case 404:
        this.showError(this.defaultError404);
        break;
      default:
        this.showError(this.defaultError);
        break;
    }
  }

  handleCrmResponse(response: HttpResponse<any>, ajaxResponse: IAjaxResponse): HttpResponse<any> {
    let newResponse: HttpResponse<any>;
    if (ajaxResponse.success) {
      newResponse = response.clone({
        body: ajaxResponse.result,
      });

      if (ajaxResponse.targetUrl) {
        this.handleTargetUrl(ajaxResponse.targetUrl);
      }
    } else {
      newResponse = response.clone({
        body: ajaxResponse.result,
      });

      if (!ajaxResponse.error) {
        ajaxResponse.error = this.defaultError;
      }

      this.logError(ajaxResponse.error);
      this.showError(ajaxResponse.error);

      if (response.status === 401) {
        this.handleUnAuthorizedRequest(null, ajaxResponse.targetUrl);
      }
    }

    return newResponse;
  }

  getCrmAjaxResponseOrNull(response: HttpResponse<any>): IAjaxResponse | null {
    if (!response || !response.headers) {
      return null;
    }

    const contentType = response.headers.get('Content-Type');
    if (!contentType) {
      this._logService.warn('Content-Type is not sent!');
      return null;
    }

    if (contentType.indexOf('application/json') < 0) {
      this._logService.warn('Content-Type is not application/json: ' + contentType);
      return null;
    }

    const responseObj = JSON.parse(JSON.stringify(response.body));
    if (!responseObj.__abp) {
      return null;
    }

    return responseObj as IAjaxResponse;
  }

  handleResponse(response: HttpResponse<any>): HttpResponse<any> {
    const ajaxResponse = this.getCrmAjaxResponseOrNull(response);
    if (ajaxResponse == null) {
      return response;
    }

    return this.handleCrmResponse(response, ajaxResponse);
  }

  blobToText(blob: any): Observable<string> {
    return new Observable<string>((observer: any) => {
      if (!blob) {
        observer.next('');
        observer.complete();
      } else {
        const reader = new FileReader();
        reader.onload = function () {
          observer.next(this.result);
          observer.complete();
        };
        reader.readAsText(blob);
      }
    });
  }
}
