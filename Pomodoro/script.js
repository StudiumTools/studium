// Variables

let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;

let seconds = "00"

// Display

window.onload = () => {
    document.getElementById('minutes').innerHTML = workTime;
    document.getElementById('seconds').innerHTML = seconds;

    workTitle.classList.add('active');
}

// Start Timer

function start(){

    // Change Button

    document.getElementById('start').style.display = "none";
    document.getElementById('reset').style.display = "block";

    // Change the Time

    seconds = 59;

    let workMinutes = workTime - 1;
    let breakMinutes = breakTime -1;

    breakCount = 0;

    // Countdown

    let timerFunction = () =>{
        let workTitle = document.getElementById('minutes').innerHTML = workMinutes;
        let breakTitle = document.getElementById('seconds').innerHTML = seconds; 

        // Start

        seconds = seconds - 1;

        if (seconds == 0){
            workMinutes = workMinutes - 1;
            if (workMinutes == -1 ){
                if(breakCount %2 == 0){
                    // Start Break
                    workMinutes = breakMinutes;
                    breakCount++

                } else{
                    // Continue Work
                    workMinutes = workTime;
                    breakCount++

                     // Change The Panel
 
                    workTitle.classList.add('active');
                    breakTitle.classList.remove('active');
                }
            }

            seconds = 59;
        }

    }

    // Start Countdown

    setInterval(timerFunction, 1000); // 1000 = 1s
}

 // Change The Panel

workTitle.classList.remove('active');
breakTitle.classList.add('active');