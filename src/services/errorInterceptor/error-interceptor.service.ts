import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ErrorHelper } from '../../helpers/errorHelper';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(private toastr: ToastrService, private router: Router) { };

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      retry(1),
      catchError((error) => {
        if (error) {
          let errorMsg = ErrorHelper.getErrorMsg(error.status, error.error);
          this.toastr.error(errorMsg, "Error");
          if (error.status == "401" && (
            errorMsg == "Wrong Password !" || errorMsg == "Wrong Username !")) {
            this.router.navigate(['login']);
          }
          else if (error.status == "400" && errorMsg.indexOf("field is required.") > -1) {
            return throwError(error);
          }
          else {
            this.router.navigate(['error'], { state: { errorMsg: errorMsg}});
          }
        }
        return throwError(error);
      })
    )}
  }
