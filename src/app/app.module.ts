import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { ServerInterceptor } from './interceptors/server.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { RepositoryContainerComponent } from './components/repository-container/repository-container.component';
import { GitHubService } from './services/github.service';
import { LoadingService } from './services/loading.service';
import { LoaderComponent } from './components/loader/loader.component';
import { MaterialModule } from './material.module';
import { RepositoryComponent } from '@comp/repository/repository.component';
import { UserContainerComponent } from '@comp/user-container/user-container.component';
import { UserComponent } from '@comp/user/user.component';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ServerInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
];
@NgModule({
  declarations: [
    AppComponent,
    RepositoryContainerComponent,
    LoaderComponent,
    RepositoryComponent,
    UserContainerComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    httpInterceptorProviders,
    GitHubService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
