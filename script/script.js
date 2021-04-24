// all the magic will happen now ! 

class Hero {
    constructor(align, alive, power, eye, first_appearance, gsm, hair, id, name, page_id, sex, urlslug, year) {
        this.align = align;
        this.alive = alive;
        this.power = power;
        this.eye = eye;
        this.first_appearance = first_appearance;
        this.gsm = gsm;
        this.hair = hair;
        this.id = id;
        this.name = name;
        this.page_id = page_id;
        this.sex = sex;
        this.urlslug = urlslug;
        this.year;
    }
}

class Character {
    constructor() {
        this.marvelheros = [];
    }

    addHeroToMarvel(align, alive, power, eye, first_appearance, gsm, hair, id, name, page_id, sex, urlslug, year) {
        let hero = new Hero(align, alive, power, eye, first_appearance, gsm, hair, id, name, page_id, sex, urlslug, year);
        this.marvelheros.push(hero);
    }
    data() {
         return this.marvelheros;
    }

}
let MARVEL = new Character();

function loadData() {
    fetch("./marvel.json").then(data => {
        return data.json();
    }).then(json => {
        json.forEach(e => {
            MARVEL.addHeroToMarvel(e.align, e.alive, e.power, e.eye, e.first_appearance, e.gsm, e.hair, e.id, e.name, e.page_id, e.sex, e.urlslug, e.year);
        });
    });
    console.log("Data loaded successfully");
}

function CharacterBehaivor() {
    let array = MARVEL.data();
    let arr = array.map(e => {
        return "Charactor " + e.name + " is " + e.align;
    });
    console.table(arr);
}

function Search() {
    let str = "";
    let array = MARVEL.data();
    let searchInput = document.getElementById("searchInput").value;
     let searchinfo = document.getElementById("searchinfo");
    array.filter(e => {
        if (e.name.includes(searchInput)) {
             str = str + `<h3>Name of your hero is ${e.name}</h3><br>
            <h4>Here is more Info :</h4><br>
            <b>Align :</b>       ${e.align}<br>
            <b>Alive :</b>       ${e.alive}<br>
            <b>Power :</b>       ${e.power}<br>
            <b>Eye color :</b>   ${e.eye}<br>
            <b>Hair :</b>        ${e.hair}<br>
            <b>Gender :</b>      ${e.sex}<br>
            <b>Year :</b>        ${e.year}<br>`
        }

    });
    searchinfo.innerHTML = str;
}






let good_or_bad = document.getElementById("good_or_bad");
good_or_bad.addEventListener("click", CharacterBehaivor);

let search = document.getElementById("search");
search.addEventListener("click", Search);


// selecting one answer only andload data automatically
window.onload = function () {

    loadData();
    
        let chks = document.querySelectorAll(".checkbox");
        for (let i = 0; i < chks.length; i++) {
            chks[i].onclick = function () {
                for (var i = 0; i < chks.length; i++) {
                    if (chks[i] != this && this.checked) {
                        chks[i].checked = false;
                    }
                }
            };
        }
    };



// Create a random Method :D be as creative as possible :)

let playbutton = document.getElementById("play");
playbutton.addEventListener("click", play);

let AnotherHero = document.getElementById("AnotherHero");
AnotherHero.addEventListener("click", replay);


 let ganswer="";

function play(){
    document.getElementById("game").style.display="block";
    console.log("hi");
    document.querySelector("#guss").innerHTML="Guess this character's eyes color";
    let heros = MARVEL.data();
    let heroName = document.getElementById("heroName");

    let randomNum = Math.floor(Math.random() * (140));
    heroName.innerHTML = heros[randomNum].name;
    let answer = heros[randomNum].eye;
    ganswer=answer;
    let answerbutton = document.getElementById("answer");
    answerbutton.addEventListener("click", game);   
}


function game() {
    let check = document.querySelectorAll(".checkbox");
    let result = document.getElementById("result");
    
    let eyecolor = "";
    let answer=ganswer;    
    for (let i = 0; i < check.length; i++) {
        if (check[i].checked) {
            eyecolor = check[i].name;
        }
    }
    result.style.display="block";
    let str = "";
    if (answer.includes(eyecolor)) {
        str = "Congrats ! Your answer is correct"
    } else {
        str = "Your answer is wrong , Try again :)"
    }
    result.innerText = str;
}


function replay() {
    play();
    document.getElementById("result").style.display="none";

}



