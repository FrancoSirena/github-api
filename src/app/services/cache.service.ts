import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';

interface ICache {
  url: string;
  response: any;
  date: number;
}

@Injectable()
export class CacheService {
  private memoryCache: Array<ICache>;

  constructor() {
    this.memoryCache = new Array<ICache>();
  }

  get(req: HttpRequest<any>) {
    const cache = this.memoryCache.find(item => item.url === req.urlWithParams);
    if (cache && cache.date < (new Date()).setMinutes(-30)) return cache;
    return null;
  }

  set(req: HttpRequest<any>, response: any) {
    let index = this.memoryCache.findIndex(item => item.url === req.urlWithParams);
    if (index === -1) index = this.memoryCache.push();
    this.memoryCache[index] = {
      date: Date.now(),
      url: req.urlWithParams,
      response: response
    };
  }
}
