import { Component, OnDestroy } from '@angular/core';
import { LoadingService } from 'app/services/loading.service';
import { Observable } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html'
})

export class LoaderComponent implements OnDestroy {
  showLoader$: Observable<boolean>;
  private alive: boolean;
  constructor(private loadingService: LoadingService) {
    this.alive = true;
    this.showLoader$ = this.loadingService.loaderState$.pipe(
      takeWhile(() => this.alive)
    );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
