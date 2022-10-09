var url = window.location.href;
var lastPart = url.substr(url.lastIndexOf('#') + 1);
var stopsCount = 0;
var currentStop = 1;
var clickable = true;

async function getBus(){
    // a fetch kuld egy kerest a szervernek
    // addig nem megy tovabb amig nem kap valaszt
    await new Promise(r => setTimeout(r, 500)); // time.sleep
    // const bus = await (await fetch("../scripts/buses/" + lastPart + ".json")).json();
    const bus = await (await fetch("../scripts/buses/85.json")).json();
    var lista = document.createElement("ul");
    bus.forEach(stop => { //vegigmegy a megallokon
        const stopLi = document.createElement("li"); //csinal egy li-t
        stopLi.innerText = stop; //li-nek beleirja az aktualis megallot
        lista.appendChild(stopLi) //hozzaadja li-t a listahoz
    });
    document.getElementById("bus-stops").appendChild(lista);
    return bus;
}

async function init(){ //main function
    const stops = await getBus();
    var lastStop = stops[stops.length - 1];
    var today = new Date();
    var time = isZero(today.getHours()) + ":" + isZero(today.getMinutes());
    document.querySelector(".last-stop").innerText = lastStop;
    document.querySelector(".bus-number").innerText = 85; //lastPart
    document.getElementById("bus-number").innerText = 85;
    document.querySelector(".time").innerText = time;
    stopsCount = stops.length;
    $("ul li:nth-last-of-type(16) ~ li").hide();;
}

function isZero(n){
    n = n.toString();
    if(n.length == 1){
        return ("0" + n);
    }
    else{
        return n
    }
}

init();

$(".next-stop-main").hide();

document.getElementById("next-stop").onclick = ()=>{
    if(clickable){
        clickable = false;
        if (currentStop < stopsCount){
            $("main").hide();
            $(".next-stop-main").show();
            setTimeout(() => {
                $("main").show();
                $(".next-stop-main").hide();
            }, 3000);
            if (currentStop == stopsCount - 2){
                $("main ul").css("margin-top","78px")
            }
            else if (currentStop == stopsCount - 1){
                $("main ul").css("margin-top","133px")
            }
            $("main li:nth-child(-n+" + (currentStop + 3) + ")").show();
            $("main li:nth-child(-n+" + currentStop + ")").hide();
            currentStop += 1;
            $("main li:nth-child(-n+" + currentStop + ")").css("font-weight", "bold");
        }
    }
    clickable = true;
};

setTimeout(() => {
    time = isZero(today.getHours()) + ":" + isZero(today.getMinutes());
    document.querySelector(".time").innerText = time;
}, 60000);