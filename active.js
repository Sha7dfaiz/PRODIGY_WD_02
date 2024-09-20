const buttonElements=document.querySelectorAll(".button");
buttonElements. forEach(button =>{
    button.addEventListener('mouseover', () =>{
        button.classList.add('zoom-in');
    });
    button.addEventListener('mouseout',() =>{
        button.classList.remove('zoom-in');
    });
});
function showElement() {
    const startButton = document.getElementById('mainStart');
    const containerElement = document.getElementById('container');
    // Hide the button 
    startButton.style.opacity = '0';
    startButton.style.visibility = 'hidden';
    // Show the container
    containerElement.classList.add('visible');
    setTimeout(() => {
        containerElement.classList.add('show');
    }, 300);  
}
let [seconds, minutes, hours ]=[0,0,0];
let hoursTime= document.querySelector("#hours");
let minutesTime= document.querySelector("#minutes");
let secondsTime= document.querySelector("#seconds");
let int =null;
let laps =[];
document.getElementById("start").addEventListener("click", ()=>{
    if(int!==null){
        clearInterval(int);
    }
    int= setInterval(displayTimer,1000) //Update every second
});
document.getElementById("pause").addEventListener("click",()=>{
    clearInterval(int);
});
document.getElementById("lap").addEventListener("click",()=>{
    recordLap();
});
document.getElementById("reset").addEventListener("click",()=>{
    clearInterval(int);
    [seconds, minutes, hours ]=[0,0,0];
    hoursTime.innerHTML="00";
    minutesTime.innerHTML="00";
    secondsTime.innerHTML="00";
    document.getElementById("notification-container").innerHTML="";
});
function displayTimer(){
    seconds++;
    if(seconds == 60){
        seconds= 0;
        minutes++;
        if(minutes==60){
            minutes= 0;
            hours++;
        }
    }
let h= hours < 10 ? "0" + hours:hours;
let m= minutes < 10 ? "0" + minutes:minutes;
let s= seconds < 10 ? "0" + seconds:seconds;

hoursTime.innerHTML= `${h}`;
minutesTime.innerHTML= `${m}`;
secondsTime.innerHTML= `${s}`;
}
document.getElementById("notification").addEventListener("click",()=>{
    showLapsAsNotification();
});
function recordLap(){
    let h= hours < 10 ? "0" + hours:hours;
    let m= minutes < 10 ? "0" + minutes:minutes;
    let s= seconds < 10 ? "0" + seconds:seconds;
    laps.push(`Lap: ${h}:${m}:${s}`);
};
function showLapsAsNotification(){
    laps.forEach(lap =>{
        showLapNotification(lap);
    });
    laps=[];
};
function showLapNotification(lap){
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.innerText= lap;
    const notificationContainer= document.getElementById("notification-container");
    notificationContainer. appendChild(notification);
    setTimeout(()=>{
        notification.classList.add("show");
    },100);
    setTimeout(()=>{
        notification.classList.remove("show");
        setTimeout(()=>{
            notification.remove();
        },300);
    },4000);
}

