let interval, isRunning = false;
let currentRound = 0, isWork = true, timeLeft = 0;

const workInput = document.getElementById('workTime');
const restInput = document.getElementById('restTime');
const roundsInput = document.getElementById('rounds');
const display = document.getElementById('display');
const status = document.getElementById('status');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const beep = document.getElementById('beep');

startBtn.addEventListener('click', () => {
  if (!isRunning) startTimer();
});

resetBtn.addEventListener('click', resetTimer);

function startTimer() {
  isRunning = true;
  currentRound = 1;
  isWork = true;
  timeLeft = parseInt(workInput.value);
  updateStatus();
  interval = setInterval(tick, 1000);
}

function tick() {
  if (timeLeft <= 0) {
    beep.play();
    if (isWork) {
      isWork = false;
      timeLeft = parseInt(restInput.value);
    } else {
      isWork = true;
      currentRound++;
      if (currentRound > parseInt(roundsInput.value)) return resetTimer();
      timeLeft = parseInt(workInput.value);
    }
    updateStatus();
  } else {
    timeLeft--;
    updateDisplay();
  }
}

function updateDisplay() {
  let min = Math.floor(timeLeft / 60);
  let sec = timeLeft % 60;
  display.textContent = \`\${String(min).padStart(2, '0')}:\${String(sec).padStart(2, '0')}\`;
}

function updateStatus() {
  status.textContent = \`\${isWork ? 'Work' : 'Rest'} - Round \${currentRound}\`;
  updateDisplay();
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  display.textContent = "00:00";
  status.textContent = "Ready";
}