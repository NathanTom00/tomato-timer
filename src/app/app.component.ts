import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pomodoro-timer';

  counterTime = { mins: 25, secs: 0 };
  percent = 100;
  percentToSub = 100/(this.counterTime.mins*60 + this.counterTime.secs)
  timerStarting = false
  intervalID!: any
  paused = false
  constructor() {}

  startTimer(event : any) {
    this.timerStarting = true
    this.intervalID = this.doCountdown()
  }

  doCountdown(){
    return setInterval(() => {
      if (this.counterTime.mins == 0 && this.counterTime.secs == 0){
        this.timerStarting = false;
        clearInterval(this.intervalID);
      }
      if(this.counterTime.secs == 0){
        this.counterTime.mins -= 1
        this.counterTime.secs = 59
      }else{
        this.counterTime.secs -=1
        this.percent -= this.percentToSub
      }
    }, 1000);
  }

  pauseTimer(){
    this.paused = true;
    clearInterval(this.intervalID);
  }

  resumeTimer(){
    this.paused = false;
    this.intervalID = this.doCountdown()
  }

  resetTimer(){
    this.counterTime = { mins: 25, secs: 0 };
    this.percent=100
    this.timerStarting = false
    this.paused = false
  }

}
