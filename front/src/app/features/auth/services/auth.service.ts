import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SessionInformation } from 'src/app/interfaces/sessionInformation.interface';
import { LoginRequest } from '../interfaces/loginRequest.interface';
import { RegisterRequest } from '../interfaces/registerRequest.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public register(registerRequest: RegisterRequest): Observable<SessionInformation> {
    return this.httpClient.post<SessionInformation>(`/auth/register`, registerRequest).pipe(
      tap((session: SessionInformation) => {
        this.putSessionInLocalStorage(session);
      })
    );
  }

  public login(loginRequest: LoginRequest): Observable<SessionInformation> {
    return this.httpClient.post<SessionInformation>(`/auth/login`, loginRequest).pipe(
      tap((session: SessionInformation) => {
        this.putSessionInLocalStorage(session);
      })
    );
  }

  private putSessionInLocalStorage(session: SessionInformation): void {
    localStorage.setItem('session', JSON.stringify(session));
  }
}
