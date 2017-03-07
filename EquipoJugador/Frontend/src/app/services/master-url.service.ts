import { Injectable } from '@angular/core';

@Injectable()
export class MasterUrlService {
  private _url:string;
  constructor() {
    this._url="http://localhost:1337/";
    // this._url="https://ide.c9.io/belenquispi/examen-twj-quispibelen";
  }
  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }
}
