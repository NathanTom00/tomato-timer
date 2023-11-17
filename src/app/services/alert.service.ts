import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  playAudio(): void {
    const audio = new Audio();
    audio.src = '/assets/mixkit-bell-notification-933.wav';
    audio.load();
    audio.play();
  }
}
