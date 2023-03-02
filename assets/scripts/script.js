let startButton = document.querySelector(".startButton");
let startScreen = document.querySelector(".startScreen");
let mainGame = document.querySelector(".mainGame");
let ammo = document.querySelectorAll(".ammo");
let endGame = document.querySelector(".endGame");
let score = document.querySelectorAll(".score");
let multiplier = document.querySelector(".multiplier");
let username = document.querySelectorAll(".name");
let classement = document.querySelector(".leaderboard");

startButton.addEventListener('click', () => //hide la couche avec bouton start, affiche la mainGame et demare la partie
{
    if (username[0].value != "") {
        startScreen.style.display = "none";
        mainGame.style.display = "flex";
        startGame();
    }
})
console.log('salut');
function startGame() { //depart de la partie
    addGlobalListener(); //rends tte la page clickable
    setInterval(() => { //appele la fonction spawnDuck tte les secondes
        superDuckChance=getRandomInt(1,100);
        if (superDuckChance>=10)
            spawnDuck();
        else
            spawnSuperDuck();
    }, 1000);
}

function getRandomInt(min, max) { //renvoie un nombre aleatoire entre min et max
    return Math.floor(Math.random() * (max - min)) + min;
}

function spawnDuck() { //fait spawn un cannard a un endroit aleatoire et le fait senvoler
    let xPos = getRandomInt(0, 725);
    let yPos = getRandomInt(0, 75);
    let newDuck = document.createElement("img");
    newDuck.setAttribute("src", "./assets/images/duck.gif");
    newDuck.setAttribute("draggable", "false");
    newDuck.setAttribute("data-value", "true");
    newDuck.style.bottom = yPos + "px";
    newDuck.style.left = xPos + "px";
    newDuck.setAttribute("class", "duck");
    mainGame.insertAdjacentElement("afterbegin", newDuck);
    let duration = getRandomInt(1000, 4000);

    newDuck.animate( //fait voler le canard dans une direction random avec un temps random
        [
            {
                transform: 'translateY(' + 450 - yPos + 'px' + ') translateX(' + 800 - xPos + 'px' + ') rotate(90deg)'
            },
            {
                transform: 'translateY(' + getRandomInt(-800, -450) + 'px) translateX(' + getRandomInt(-300, 300) + 'px) rotate(' + getRandomInt(45, 135) + 'deg)'
            }
        ],
        {
            duration: duration,
            iterations: 1
        });

    setTimeout(() => { //supprime le canard au bout dun certain temps
        newDuck.remove();
    }, duration);

}

function spawnSuperDuck() { //fait spawn un super cannard a un endroit aleatoire et le fait senvoler
    let xPos = getRandomInt(0, 725);
    let yPos = getRandomInt(0, 75);
    let newDuck = document.createElement("img");
    newDuck.setAttribute("src", "./assets/images/duck.png");
    newDuck.setAttribute("draggable", "false");
    newDuck.setAttribute("data-value", "true");
    newDuck.setAttribute("health",2);
    newDuck.style.bottom = yPos + "px";
    newDuck.style.left = xPos + "px";
    newDuck.setAttribute("class", "superDuck");
    mainGame.insertAdjacentElement("afterbegin", newDuck);
    let duration = getRandomInt(1000, 4000);

    newDuck.animate( //fait voler le canard dans une direction random avec un temps random
        [
            {
                transform: 'translateY(' + 450 - yPos + 'px' + ') translateX(' + 800 - xPos + 'px' + ') rotate(90deg)'
            },
            {
                transform: 'translateY(' + getRandomInt(-800, -450) + 'px) translateX(' + getRandomInt(-300, 300) + 'px) rotate(' + getRandomInt(45, 135) + 'deg)'
            }
        ],
        {
            duration: duration,
            iterations: 1
        });

    setTimeout(() => { //supprime le canard au bout dun certain temps
        newDuck.remove();
    }, duration);

}

function addGlobalListener() {
    let cpt = 10
    var music = document.createElement("audio");
    music.setAttribute("src", "./assets/audio/jesus-loves-uke.mp3");
    music.volume = "0.2";
    music.loop = true;
    music.play();
    mainGame.addEventListener('click', (e) => {
        if (e.target.classList.contains("duck") && e.target.getAttribute("data-value") == "true") {
            var tbh = document.createElement("audio");
            var rust = document.createElement("audio");
            e.target.setAttribute("data-value", "false");
            tbh.setAttribute("src", "./assets/audio/tbh.mp3");
            rust.setAttribute("src", "./assets/audio/rust-headshot.mp3");
            tbh.volume = "0.2";
            rust.volume = "0.3";
            tbh.play();
            rust.play();
            e.target.setAttribute("src", "./assets/images/yipee.gif");
            setTimeout(() => {
                e.target.remove();
            }, 1000);

            score[0].innerHTML = (parseInt(score[0].innerHTML) + 1 * parseInt(multiplier.innerHTML)).toString();
            multiplier.innerHTML = (parseInt(multiplier.innerHTML) + 1).toString();

        }
        else if (e.target.classList.contains("superDuck") && e.target.getAttribute("data-value") == "true") {
            var rust = document.createElement("audio");
            rust.setAttribute("src", "./assets/audio/rust-headshot.mp3");
            rust.volume = "0.3";
            rust.play();
            e.target.setAttribute("health", e.target.getAttribute("health")-1);
            if (e.target.getAttribute("health")==0) {
                var twenyone = document.createElement("audio");
                twenyone.setAttribute("src", "./assets/audio/9+10.mp3");
                twenyone.volume = "0.2";
                twenyone.play();
                e.target.setAttribute("data-value", "false");
                e.target.setAttribute("src", "./assets/images/yipee.gif");
                setTimeout(() => {
                    e.target.remove();
                    console.log("faihssbidsh");
                }, 1000);
                score[0].innerHTML = (parseInt(score[0].innerHTML) + 10 * parseInt(multiplier.innerHTML)).toString();
                multiplier.innerHTML = (parseInt(multiplier.innerHTML) + 1).toString(); 
            }
        }
        else {
            var boom = document.createElement("audio");
            var waaa = document.createElement("audio");
            boom.setAttribute("src", "./assets/audio/vine-boom.mp3");
            waaa.setAttribute("src", "./assets/audio/waaa.mp3");
            boom.volume = "0.2";
            waaa.volume = "0.2";
            boom.play();
            waaa.play();
            cpt--;
            if (cpt == 0) {
                let leaderboard = [];
                let PlayerCard =
                {
                    playerName: username[0].value,
                    playerScore: score[0].innerHTML
                };
                if (localStorage.getItem("leaderboard")) {
                    let tab = JSON.parse(localStorage.getItem("leaderboard"));
                    tab.push(PlayerCard);
                    localStorage.setItem("leaderboard", JSON.stringify(tab));
                }
                else {
                    leaderboard.push(PlayerCard);
                    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
                }
                mainGame.style.display = "none";
                endGame.style.display = "flex";
                music.pause();
                score[1].innerHTML = score[0].innerHTML;
                username[1].innerHTML = username[0].value;
                let leaderboard2 = localStorage.getItem("leaderboard");
                leaderboard2 = JSON.parse(leaderboard2);
                leaderboard2.sort(compareFn);
                leaderboard2.reverse();
                let newLeaderboard = [];
                if (leaderboard2.length > 10) {
                    let index = 0;
                    leaderboard2.forEach((elem) => {
                        if (index < 10) {
                            newLeaderboard.push(elem);
                            index++;
                        }
                    })
                }
                else {
                    newLeaderboard = leaderboard2;
                }
                let place = newLeaderboard.length + 1;
                newLeaderboard.reverse();
                newLeaderboard.forEach(player => {
                    place--;
                    let placement = document.createElement("div");
                    placement.setAttribute("class", "ranking");
                    let rank = document.createElement("p");
                    let joueur = document.createElement("p");
                    let joueurScore = document.createElement("p");
                    rank.setAttribute("class", "leaderboardPlayer");
                    joueur.setAttribute("class", "leaderboardPlayerName");
                    joueurScore.setAttribute("class", "leaderboardPlayer");
                    rank.innerHTML = place;
                    joueur.innerHTML = player.playerName;
                    joueurScore.innerHTML = player.playerScore;
                    placement.insertAdjacentElement("beforeend", rank);
                    placement.insertAdjacentElement("beforeend", joueur);
                    placement.insertAdjacentElement("beforeend", joueurScore);
                    classement.insertAdjacentElement("afterbegin", placement);
                });

            }
            else {
                multiplier.innerHTML = "1";
                ammo[cpt].remove();
            }
        }
    })
}

function compareFn(a, b) { //ca qui fonctionne pas
    return a.playerScore - b.playerScore;

}