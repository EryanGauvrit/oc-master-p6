import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  
    mobileQuery: MediaQueryList;
    private _mobileQueryListener: () => void;
  
    constructor(
      private router: Router,
      private sessionService: SessionService,
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher) {
        this.mobileQuery = media.matchMedia('(max-width: 650px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    public $isLogged(): Observable<boolean> {
      return this.sessionService.$isLogged();
    }

    public logout(): void {
      this.sessionService.logOut();
      this.router.navigate(['auth'])
    }
}
