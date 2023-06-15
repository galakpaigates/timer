document.addEventListener("DOMContentLoaded", (event) => 
{
    const minInput = document.getElementById("minInput");
    const secInput = document.getElementById("secInput");
    const getInputDiv = document.getElementById("getInputDiv");
    const timerDiv = document.getElementById("timerDiv");
    const secCountSpan = document.getElementById("secCountSpan");
    const minCountSpan = document.getElementById("minCountSpan");
    const startPauseTimer = document.getElementById("startPauseTimer");
    let mode = "count";
    let newMinute = 0;
    let newSecond = 0;
    let interval;
    let previousStartBtnValue = "Start";
    let beep = document.getElementById("beep");

    function playSoundGameOver()
    {
        beep.play();
    }

    function stopSound()
    {
        allAudio.suspend();
    }

    function minIsZero(min, sec)
    {
        interval = setInterval(() =>
        {
            if (mode === "count")
            {
                sec--;
                secCountSpan.innerText = sec;

                if (sec < 1)
                {
                    mode = "stop";
                    playSoundGameOver();
                }
            }
        }, 1000)
    }

    function secIsZero(min, sec)
    {
        secCountSpan.innerText = "00";

        setTimeout(() => 
        {
            min--;
            minCountSpan.innerText = min;
            sec = 60;
            secCountSpan.innerText = sec;
        }, 1000);

        interval = setInterval(() => 
        {
            if (mode === "count")
            {
                sec--;
                secCountSpan.innerText = sec;

                if (sec < 1 && min > 0)
                {
                    min--;
                    minCountSpan.innerText = min;
                    secCountSpan.innerText = "00";
                    sec = 60;
                }

                if (sec < 1 && min < 1)
                {
                    mode = "stop";
                    playSoundGameOver();
                }
            }
        }, 1000);
    }

    function minNorSecIsZero(min, sec)
    {
        interval = setInterval(() => 
        {
            if (mode === "count")
            {
                sec--;

                if (sec > 0)
                {
                    secCountSpan.innerText = sec;
                }

                if (sec === 0)
                {
                    secCountSpan.innerText = "00";
                }

                if (sec === 0 && min > 0)
                {
                    min--;
                    minCountSpan.innerText = min;
                    sec = 60;
                }
                
                if (sec === 0 && min === 0)
                {
                    secCountSpan.innerText = "0";
                    mode = "stop";
                    playSoundGameOver();
                }
            }
        }, 1000);
    }

    function checkStartTimer()
    {    
        newMinute = Number(minInput.value);
        newSecond = Number(secInput.value); 

        if (newMinute > -1 && newSecond > -1)
        {
            if (newMinute > 0 || newSecond > 0)
            {
                getInputDiv.style.display = "none";

                if (previousStartBtnValue === "Start")
                {
                    // Things to do when pausing the timer.
                    minCountSpan.innerText = newMinute;
                    secCountSpan.innerText = newSecond;
                }

                if (previousStartBtnValue === "Pause")
                {
                    // Things to check when starting the timer.
                    if (mode === "Paused")
                    {
                        newMinute = Number(minCountSpan.innerText);
                        newSecond = Number(secCountSpan.innerText);
                    }
                    else if (mode === "stop")
                    {
                        newMinute = minInput.value;
                        newSecond = secInput.value;
                    }
                }

                if (mode === "stop")
                {
                    minCountSpan.innerText = newMinute;
                    secCountSpan.innerText = newSecond;
                }

                previousStartBtnValue = startPauseTimer.value;
                startPauseTimer.style.backgroundColor = "cornflowerblue";
                startPauseTimer.value = "Pause";

                timerDiv.style.display = "block";

                if (newMinute > 0 && newSecond === 0)
                {
                    mode = "count";
                    secIsZero(newMinute, newSecond);
                }

                if (newSecond > 0 && newMinute === 0)
                {
                    mode = "count";
                    minIsZero(newMinute, newSecond);
                }

                if (newSecond > 0 && newMinute > 0)
                {
                    mode = "count";
                    minNorSecIsZero(newMinute, newSecond);
                }
            }
        }
    }

    function pauseTimer()
    {
        previousStartBtnValue = startPauseTimer.value;
        startPauseTimer.style.backgroundColor = "limegreen";
        startPauseTimer.value = "Start";
        mode = "Paused";
    }

    document.addEventListener('click', (event) =>
    {
        const clickedElement = event.target;
        
        if (clickedElement.id === "startPauseTimer")
        {
            if (clickedElement.value === "Pause")
            {
                clearInterval(interval);
                pauseTimer();
                return;
            }
            
            if (clickedElement.value === "Start")
            {
                clearInterval(interval);
                checkStartTimer();
            }
        }
        
        if (clickedElement.id === "resetTimer")
        {
            mode = "stop";
            getInputDiv.style.display = "block";
            timerDiv.style.display = "none";
            startPauseTimer.style.backgroundColor = "limegreen";
            startPauseTimer.value = "Start";
            beep.pause();
            beep.currentTime = 0;
            clearInterval(interval);
        }

        if (clickedElement.id === "stopTimer")
        {
            mode = "stop";
            startPauseTimer.style.backgroundColor = "limegreen";
            startPauseTimer.value = "Start";
            beep.pause();
            beep.currentTime = 0;
            clearInterval(interval);
        }
    });
    
    document.addEventListener('keyup', (event) => 
    {
        const pressedKey = event.key;
        
        if (pressedKey === "Enter")
        {
            if (startPauseTimer.value === "Start")
            {
                clearInterval(interval);        
                checkStartTimer();
            }
        }
    });
})