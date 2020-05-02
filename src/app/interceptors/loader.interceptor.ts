import { Injectable, Injector } from "@angular/core";
import {
    HttpEvent,
    HttpRequest,
    HttpHandler,
    HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { finalize, delay } from "rxjs/operators";
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private injector: Injector, private loaderService: Ng4LoadingSpinnerService) { }
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        // if (!req.url.includes("albums")) {
        //   return next.handle(req);
        // }
        //console.warn("LoaderInterceptor");
        const loaderService = this.loaderService;

        // const loaderService = this.injector.get(Ng4LoadingSpinnerService);

        if (!localStorage.getItem('multiple_http_'))
            loaderService.show();

        return next.handle(req).pipe(
            // delay(3000),
            finalize(() => { if (!localStorage.getItem('multiple_http_')) loaderService.hide() })
        );
    }
}
