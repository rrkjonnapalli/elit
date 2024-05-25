import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private __logger = console.log;

  constructor() { }

  log = this.__logger;
  info = this.__logger;
  error = this.__logger;
  debug = this.__logger;
}
