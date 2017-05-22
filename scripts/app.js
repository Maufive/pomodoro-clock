//Listing all my global variables and binding html elements
let countdown;
let sessionTime = 0;
let breakTime = 0;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const container = document.querySelector('#pie');
const increaseTimer = document.querySelector('.increase_session');
const decreaseTimer = document.querySelector('.decrease_session');
const sessionTimer = document.querySelector('.sessionTimer');
const sessionStart = document.querySelector('.start_session');
const increaseBreak = document.querySelector('.increase_break');
const decreaseBreak = document.querySelector('.decrease_break');
const breakTimer = document.querySelector('.breakTimer');
const breakStart = document.querySelector('.start_break');
var workWork = document.querySelector('#workWork');
var jobsDone = document.querySelector('#jobsDone');

function playWork(){
  workWork.play();
}

function playJobs(){
  jobsDone.play();
}

function timer(seconds) {
  //Clearing any ongoing timers
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  displaySecondsLeft(seconds);
  displayEndTime(then);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    //check if we should stop
    if(secondsLeft < 0) {
      clearInterval(countdown)
      return;
    }
    //display it
    displaySecondsLeft(secondsLeft);
  }, 1000);

}

function displaySecondsLeft(seconds) {
  const minutes =  Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : '' }${remainderSeconds}`;

  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  endTime.textContent = `The timer will end at ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

//FORM TIMER STARTS HERE
document.customForm.addEventListener('submit', function(e){
  e.preventDefault();
  //Should you start a new timer, this will clear the html
  container.innerHTML = '';
  const mins = this.minutes.value;

  //duration variable for the timer below
  //duration assumes that the input in the submitfield
  //is in minutes.
  const duration = this.minutes.value * 60000;
  timer(mins * 60);
  this.reset();

  var bar = new ProgressBar.Circle(pie, {
    color: '#fff',
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'linear',
    duration: duration,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#aaa', width: 1 },
    to: { color: '#fff', width: 4 },
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value + '%');
      }
    }
  });
  bar.text.style.fontFamily = '"Inconsolata", Helvetica, sans-serif';
  bar.text.style.fontSize = '2rem';
  bar.animate(1.0);  // From 0 to 100%
});
//FORM TIMER ENDS HERE

//SESSION TIMER STARTS HERE
increaseTimer.addEventListener('click', function(e){
  sessionTime = sessionTime + 1;
  sessionLength();
});

decreaseTimer.addEventListener('click', function(e){
  sessionTime = sessionTime - 1;
  sessionLength();
});

function sessionLength() {
  if(sessionTime < 0) {
    sessionTime = 0;
  }
  var display = `${sessionTime}:00`;
  sessionTimer.textContent = display;
}

sessionStart.addEventListener('click', function(e){
  e.preventDefault();
  container.innerHTML = '';
  const duration = sessionTime * 60000;
  const mins = sessionTime;
  timer(mins * 60);
  document.querySelector('.title').innerHTML = 'Session progress';
  playWork();
  var bar = new ProgressBar.Circle(pie, {
    color: '#fff',
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'linear',
    duration: duration,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#aaa', width: 1 },
    to: { color: '#fff', width: 4 },
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      }
      if (value === 100){
        playJobs();
      }

    }
  });
  bar.text.style.fontFamily = '"Inconsolata", Helvetica, sans-serif';
  bar.text.style.fontSize = '2rem';
  bar.animate(1.0);  // From 0 to 100%
});
//SESSION TIMER ENDS HERE

//BREAK TIMER STARTS HERE
increaseBreak.addEventListener('click', function(e){
  breakTime = breakTime + 1;
  breakLength();
});

decreaseBreak.addEventListener('click', function(e){
  breakTime = breakTime - 1;
  breakLength();
});

function breakLength() {
  if(breakTime < 0) {
    breakTime = 0;
  }
  var display = `${breakTime}:00`;
  breakTimer.textContent = display;
}

breakStart.addEventListener('click', function(e){
  e.preventDefault();
  container.innerHTML = '';
  const duration = breakTime * 60000;
  const mins = breakTime;
  timer(mins * 60);
  document.querySelector('.title').innerHTML = 'Enjoy your break!';

  var bar = new ProgressBar.Circle(pie, {
    color: '#fff',
    style: null,
    strokeWidth: 4,
    trailWidth: 1,
    easing: 'linear',
    duration: duration,
    text: {
      autoStyleContainer: false
    },
    from: { color: '#aaa', width: 1 },
    to: { color: '#fff', width: 4 },
    step: function(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);

      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      }
    }
  });
  bar.text.style.fontFamily = '"Inconsolata", Helvetica, sans-serif';
  bar.text.style.fontSize = '2rem';
  bar.animate(1.0);  // From 0 to 100%
});
//BREAK TIMER ENDS HERE



var bar = new ProgressBar.Circle(pie, {
  color: '#fff',
  strokeWidth: 4,
  trailWidth: 1,
  easing: 'linear',
  duration: 0,
  text: {
    autoStyleContainer: false
  },
  from: { color: '#aaa', width: 1 },
  to: { color: '#fff', width: 4 }
});
bar.text.style.fontFamily = '"Inconsolata", Helvetica, sans-serif';
bar.text.style.fontSize = '2rem';
bar.animate(1.0);  // From 0 to 100%
