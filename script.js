let timerId = 0;
const timers = [];

document.getElementById("start-timer-btn").addEventListener("click", startTimer);

function startTimer() {
  const hours = parseInt(document.getElementById("hours").value) || 0;
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;
  
  let totalSeconds = hours * 3600 + minutes * 60 + seconds;
  if (totalSeconds <= 0) return alert("Please set a valid time.");

  const timer = {
    id: timerId++,
    remainingTime: totalSeconds,
    interval: null
  };
  timers.push(timer);

  renderTimers();
  startCountdown(timer);
}

function startCountdown(timer) {
  timer.interval = setInterval(() => {
    timer.remainingTime -= 1;
    renderTimers();

    if (timer.remainingTime <= 0) {
      clearInterval(timer.interval);
      endTimer(timer);
    }
  }, 1000);
}

function endTimer(timer) {
  document.getElementById(`timer-${timer.id}`).classList.add("timer-ended");

  const audio = new Audio('alram.mp3'); 
  audio.play();
}

function stopTimer(id) {
  const timer = timers.find(t => t.id === id);
  clearInterval(timer.interval);
  timers.splice(timers.indexOf(timer), 1);
  renderTimers();
}

function renderTimers() {
  const timerContainer = document.getElementById("active-timers");
  timerContainer.innerHTML = "";

  timers.forEach(timer => {
    const timerElement = document.createElement("div");
    timerElement.className = "timer";
    timerElement.id = `timer-${timer.id}`;

    const hours = Math.floor(timer.remainingTime / 3600);
    const minutes = Math.floor((timer.remainingTime % 3600) / 60);
    const seconds = timer.remainingTime % 60;
    timerElement.innerHTML = `
      <span>Time left: ${hours}h ${minutes}m ${seconds}s</span>
      <button class="stop-timer" onclick="stopTimer(${timer.id})">Stop Timer</button>
    `;
    
    timerContainer.appendChild(timerElement);
  });
}
