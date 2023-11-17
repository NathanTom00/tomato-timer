import { Component } from '@angular/core';
import { AlertService } from './services/alert.service';

const sessions = {
  study : {
    mins: 25,
    secs: 0
  },
  break : {
    mins: 5,
    secs: 0
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pomodoro-timer';
  
  session = 'study'
  counterTime = {mins: sessions.study.mins , secs: sessions.study.secs}
  percent = 100;
  percentToSub = 100/(this.counterTime.mins*60 + this.counterTime.secs)
  timerStarting = false
  intervalID!: any
  paused = false
  constructor(private alertService : AlertService) {}

  startTimer() {
    this.timerStarting = true
    this.intervalID = this.doCountdown()
  }

  doCountdown(){
    return setInterval(() => {
      if (this.timerDone()){
        this.alertService.playAudio()
        if (this.session === 'study'){
          this.session = 'break'
          this.counterTime = {mins: sessions.break.mins, secs: sessions.break.secs}
        }
        else{
          this.session = 'study'
          this.counterTime = {mins: sessions.study.mins,secs: sessions.study.secs}
        }
        
        this.percent = 100;
        this.percentToSub = 100/(this.counterTime.mins*60 + this.counterTime.secs)
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

  timerDone() : boolean {
    return this.counterTime.mins == 0 && this.counterTime.secs == 0
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
    
    this.counterTime = (this.session === 'study')? {mins: sessions.study.mins,secs: sessions.study.secs}:{mins: sessions.break.mins, secs: sessions.break.secs} ;
    this.percent=100
    this.timerStarting = false
    this.paused = false
  }

}
