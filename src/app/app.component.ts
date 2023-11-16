import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pomodoro-timer';

  counterTime = { mins: 25, secs: 0 };

  constructor() {}

  startTimer(event : any) {
    event.target.disabled = true;
    let intervalID = setInterval(() => {
      if (this.counterTime.mins == 0 && this.counterTime.secs == 0)
        clearInterval(intervalID);

      if(this.counterTime.secs == 0){
        this.counterTime.mins -= 1
        this.counterTime.secs = 59
      }else
        this.counterTime.secs -=1
    }, 1000);
  }
}
