import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()
export class LoadingService {
  loaderState$: Observable<boolean>;
  private loaderState: Subject<boolean>;
  constructor() {
    this.loaderState = new Subject<boolean>();
    this.loaderState$ = this.loaderState.asObservable();
  }
  show() {
    this.loaderState.next(true);
  }

  hide() {
    this.loaderState.next(false);
  }
}
