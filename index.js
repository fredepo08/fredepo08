//import confetti from 'https://cdn.skypack.dev/canvas-confetti';
var confetti;

const mainName = "main";
const timeName = "time";

function OnLoad(){
    const canvas = document.createElement('canvas');
    confetti = new JSConfetti(canvas);

    SetColour(255, 255, 255);
    SetText(mainName, "Vent venligst");
    SetText(timeName, "");

    Check();
}

function Check(){
    const httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var json = JSON.parse(this.responseText);
        Vis(json.up, json.checkedAt);
      }
    }
    httpRequest.open("GET", 'https://stenhusflag.azurewebsites.net/api/flag/v1/get');
    httpRequest.send();
}

function SetColour(r, g, b){
    const element = document.getElementById(mainName);
    element.style = `color: rgb(${r}, ${g}, ${b})`;
}

function SetText(elementId, text){
    const element = document.getElementById(elementId);

    element.innerHTML = text;
}

function Vis(up, time){
    if (!CheckDate()){
        SetColour(0, 182, 0);
        SetText(mainName, "Vi har fri!");
        SetText(timeName, "");
        return;
    }
    
    if (up){
        SetColour(182, 0, 0);
        SetText(mainName, "Det røde flag er oppe!");
        CreateConfetti();
        document.getElementById("noredflag").remove();
    }
    else{
        SetColour(255, 255, 255);
        SetText(mainName, "Det røde flag er nede :/");
        document.getElementById("redflag").remove();
    }
    
    setInterval(function() {
        SetText(timeName, "Sidst tjekket: " + StringToDate(time) + " siden");
    }, 0);
}

function StringToDate(time){
    console.log(time);
    var ms = Date.parse(time);
    var date = new Date(ms);
    var currentDate = new Date();
    var elapsedMs = currentDate - date;
    var elapsed = FormatDate(elapsedMs);
    console.log(elapsed);
    return elapsed;
}

function FormatDate(elapsed){
    var days = Math.floor(elapsed / (1000 * 60 * 60 * 24));
    var hours = Math.floor((elapsed % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
    var minutes = Math.floor((elapsed % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((elapsed % (1000 * 60)) / 1000);

    var hourName = "timer";
    if (hours == 1){
        hourName = "time";
    }

    var minuteName = "minutter";
    if (minutes == 1){
        minuteName = "minut";
    }

    var secondName = "sekunder";
    if (seconds == 1){
        secondName = "sekund";
    }

    return `${hours} ${hourName} ${minutes} ${minuteName} ${seconds} ${secondName}`;
}

function CheckDate(){
    var date = new Date();
    var weekDay = date.getDay();
    console.log(weekDay);
    return weekDay <= 5;
}

function CreateConfetti()
{
    confetti.addConfetti();
}