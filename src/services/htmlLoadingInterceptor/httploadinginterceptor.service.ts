import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LodingstateService } from '../loadingState/lodingstate.service';

@Injectable({
  providedIn: 'root'
})
export class HttploadinginterceptorService implements HttpInterceptor {

  private _requests: HttpRequest<any>[] = [];
  constructor(private loadingState: LodingstateService, private http: HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._requests.push(req);
    this.loadingState.changeLoading(true);
    var that = this;
    next.handle(req).subscribe(() => that.removeRequest(req));
    return next.handle(req);
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this._requests.indexOf(req);
    if ( i >= 0) {
       this._requests.splice(i, 1);
    }
      this.loadingState.changeLoading(this._requests.length > 0);
    }
}
