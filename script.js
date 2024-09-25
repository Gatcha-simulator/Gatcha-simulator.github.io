var count = 3;
var spin = document.getElementById("spin");
var sec = 0;
var min = 0;
var hr = 0;
var trys = document.getElementById("trys");  
var reward = document.getElementById("reward");
var timerRunning = false;
var textInput = document.getElementById('text');
var submit = document.getElementById('submit');
var inventry = document.getElementById("storage");
let price;
var inventory = {};
var random = [
    "Barrier", "Bomb", "Chop", "Rocket", "Ice", "Spin", "Magma", "Flame",
    "Spring", "Smoke", "Phoenix", "Quake", "Rumble", "Shadow", "Spike",
    "Sand", "Diamond", "Light", "Dark", "Venom", "Dragon", "Control",
    "Buddha", "Falcon", "Rubber", "Ghost", "Love", "Spider", "Sound",
    "Portal", "Pain", "Blizzard", "Gravity", "Mammoth", "T-Rex", "Dough",
    "Spirit", "Leopard", "Kitsune"
];

submit.addEventListener("click", function () {
    var textValue = textInput.value;

    if (textValue === "rijeshpro") {
        count += 1000;
        trys.innerHTML = count + " left";
        textInput.value = '';
        alert('Redeemed 1000 rolls successfully');
    }
    if (textValue === "rijesh") {
        count += 10;
        trys.innerHTML = count + " left";
        textInput.value = '';
        alert('Redeemed 10 rolls successfully');
    }
});

spin.addEventListener("click", function () {
    if (count > 0) {
        count -= 1;
        trys.innerHTML = count + " left";

        function getRandomReward() {
            const randomIndex = Math.floor(Math.random() * random.length);
            return random[randomIndex];
        }
        price = getRandomReward();
        reward.innerHTML = price;
        
        if (inventory[price]) {
            inventory[price] += 1;
        } else {
            inventory[price] = 1; 
        }
        updateInventoryDisplay();

        if (count === 0 && !timerRunning) {
            timerRunning = true;
            let timerId;

            let update = () => {
                sec++;
                if (sec === 60) {
                    min++;
                    sec = 0;
                }
                if (min === 60) {
                    hr++;
                    min = 0;
                }
                if (hr === 1) {
                    hr = 0;
                    count = 3;
                    trys.innerHTML = count + " left";
                    timerRunning = false;
                    clearInterval(timerId);
                }
            };

            timerId = setInterval(update, 1000);
        }
    } else {
        alert(hr + ' , ' + min + ' , ' + sec + " time left!");
    }
});

function updateInventoryDisplay() {
    inventry.innerHTML = "";
    for (let item in inventory) {
        inventry.innerHTML += `${inventory[item]} : ${item}<br>`; 
    }
}

let inventryCall = () => {
  if (inventry.classList.contains('yesdisp')) {
    inventry.classList.remove('yesdisp');
    inventry.classList.add('nodisp');
  }
  
  else if (inventry.classList.contains('nodisp')) {
    inventry.classList.add('yesdisp');
    inventry.classList.remove('nodisp');
  } 
};
