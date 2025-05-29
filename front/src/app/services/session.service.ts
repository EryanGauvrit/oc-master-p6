import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SessionInformation } from '../interfaces/sessionInformation.interface';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public isLogged = false;
  public sessionInformation: SessionInformation | undefined;

  private isLoggedSubject = new BehaviorSubject<boolean>(this.isLogged);

  public $isLogged(): Observable<boolean> {
    const session = this.getSessionFromLocalStorage();
    if (session) {
        this.sessionInformation = session;
        this.isLogged = true;
        this.isLoggedSubject.next(this.isLogged);
    }
    return this.isLoggedSubject.asObservable();
  }

  public logIn(user: SessionInformation): void {
    this.sessionInformation = user;
    this.isLogged = true;
    this.next();
  }

  public logOut(): void {
    this.sessionInformation = undefined;
    this.isLogged = false;
    this.removeSessionFromLocalStorage();
    this.next();
  }

  private next(): void {
    this.isLoggedSubject.next(this.isLogged);
  }

  private removeSessionFromLocalStorage(): void {
    localStorage.removeItem('session');
  }

  private getSessionFromLocalStorage(): SessionInformation | undefined {
    const session = localStorage.getItem('session');
    if (session) {
      return JSON.parse(session) as SessionInformation;
    }
    return undefined;
  }
}
