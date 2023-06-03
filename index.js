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
    let newMinute;
    let newSecond;
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
                mode = "count";

                getInputDiv.style.display = "none";

                if (previousStartBtnValue === "Start")
                {
                    minCountSpan.innerText = newMinute;
                    secCountSpan.innerText = newSecond;
                }

                if (previousStartBtnValue === "Pause")
                {
                    newMinute = Number(minCountSpan.innerText);
                    newSecond = Number(secCountSpan.innerText);
                }

                previousStartBtnValue = startPauseTimer.value;
                startPauseTimer.style.backgroundColor = "cornflowerblue";
                startPauseTimer.value = "Pause";

                timerDiv.style.display = "block";

                if (newMinute > 0 && newSecond === 0)
                {
                    secIsZero(newMinute, newSecond);
                }

                if (newSecond > 0 && newMinute === 0)
                {
                    minIsZero(newMinute, newSecond);
                }

                if (newSecond > 0 && newMinute > 0)
                {
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