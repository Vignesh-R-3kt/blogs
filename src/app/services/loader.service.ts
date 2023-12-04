import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loaderState: Subject<any> = new Subject<boolean>();

  constructor() { }

  getLoaderState() {
    return this.loaderState.asObservable();
  }

  show() {
    return this.loaderState.next(true);
  }

  close() {
    return this.loaderState.next(false);
  }
}
