import {Injectable} from '@angular/core';

export class LoggingService {
  message: string;

  printLog(newMessage: string) {
    console.log(newMessage);
    console.log(this.message);
    this.message = newMessage;
  }
}
