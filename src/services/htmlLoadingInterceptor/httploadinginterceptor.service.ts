import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpClient, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingstateService } from '../loadingState/loadingstate.service';

@Injectable({
  providedIn: 'root'
})
export class HttploadinginterceptorService implements HttpInterceptor {

  private _requests: HttpRequest<any>[] = [];
  constructor(private loadingState: LoadingstateService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._requests.push(req);
    this.loadingState.changeLoading(true);
    var that = this;
    return next.handle(req).pipe(
      finalize(() => that.removeRequest(req))
    );
  }

  removeRequest(req: HttpRequest<any>) {
    const i = this._requests.indexOf(req);
    if ( i >= 0) {
       this._requests.splice(i, 1);
    }
      this.loadingState.changeLoading(this._requests.length > 0);
    }
}
