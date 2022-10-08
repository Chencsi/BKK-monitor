var url = window.location.href;
var lastPart = url.substr(url.lastIndexOf('#') + 1);

async function getBus(){
    // a fetch kuld egy kerest a szervernek
    // addig nem megy tovabb amig nem kap valaszt
    await new Promise(r => setTimeout(r, 500)); // time.sleep
    const bus = await (await fetch("http://127.0.0.1:5500/src/scripts/buses/" + lastPart + ".json")).json();
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
    var time = today.getHours() + ":" + today.getMinutes();
    document.querySelector(".last-stop").innerText = lastStop;
    document.querySelector(".bus-number").innerText = lastPart;
    document.querySelector(".time").innerText = time;
}

init();

/*
async function init(){
    await getBus();
    console.log("asd")
}
getBus().then(()=>{
    console.log("asd")
});
console.log("hello")
*/