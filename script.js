window.onload = () => {
    document.querySelector('#calculate').onclick = calculate;
    document.querySelector('#reset').onclick = reset;
    document.querySelector('#stop').onclick = stopTimer;
};

let interval; // Global variable to manage the interval

function calculate() {
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;

    if (!date || !time) {
        alert("Please enter both date and time.");
        return;
    }

    const endTime = new Date(date + 'T' + time);

    if (isNaN(endTime.getTime())) {
        alert("Invalid date or time format.");
        return;
    }

    clearInterval(interval); // Clear any existing intervals
    interval = setInterval(() => calculateTime(endTime), 1000);
}

function calculateTime(endTime) {
    const currentTime = new Date();

    const days = document.querySelector('#countdown-days');
    const hours = document.querySelector('#countdown-hours');
    const minutes = document.querySelector('#countdown-minutes');
    const seconds = document.querySelector('#countdown-seconds');
    const alarmSound = document.querySelector('#alarm-sound');
    const timerContainer = document.querySelector('.countdown');
    const timerElemts = document.querySelectorAll('.time');




    if (endTime > currentTime) {
        const timeLeft = (endTime - currentTime) / 1000;

        days.innerHTML = Math.floor(timeLeft / (24 * 60 * 60));
        hours.innerHTML = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
        minutes.innerHTML = Math.floor((timeLeft % (60 * 60)) / 60);
        seconds.innerHTML = Math.floor(timeLeft % 60);

        if (timeLeft<=10){
            timerElemts.forEach(element => {
                element.style.color="red";
                });
             } else {
                timerElemts.forEach(element => {
                    element.style.color="";
                    });
                }
        }else{
            clearInterval(interval);
            days.innerHTML = 0;
            hours.innerHTML = 0;
            minutes.innerHTML = 0;
            seconds.innerHTML = 0;

            timerContainer.style.color = "red";
            alarmSound.play();
    }
   
}

function stopTimer() {
    clearInterval(interval);

    const alarmSound = document.querySelector('#alarm-sound');
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

function reset() {
    clearInterval(interval);
    document.querySelector('#countdown-days').innerText = 0;
    document.querySelector('#countdown-hours').innerText = 0;
    document.querySelector('#countdown-minutes').innerText = 0;
    document.querySelector('#countdown-seconds').innerText = 0;
}
