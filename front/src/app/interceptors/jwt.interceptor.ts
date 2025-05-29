import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SessionService } from '../services/session.service';

@Injectable({ providedIn: 'root' })
export class JwtInterceptor implements HttpInterceptor {
    private readonly apiUrl = 'http://localhost:3001/api'; // Adjust the API URL as needed
    constructor(private sessionService: SessionService) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler) {
        if (this.sessionService.isLogged) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.sessionService.sessionInformation!.token}`,
                },
            });
        }
        request = request.clone({
            url: this.apiUrl + request.url
        });
        return next.handle(request);
    }
}
