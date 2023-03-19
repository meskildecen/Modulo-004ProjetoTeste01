// Charmander ou Squirtle - Guerreiro ou Mago
// Rattata ou Butterfree

class Character {

    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;
    constructor(name){
        this.name = name;
    }
    get life(){
        return this._life;
    }
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife; 
    }
}

// class Charmander extends Character {
//     constructor (name) {
//         super(name);
//         this.life = 282;
//         this.attack = 52;
//         this.defense = 43;
//         this. maxLife = this.life;
//     }
// }

class Charmander extends Character {
    constructor(name, pokedexNumber) {
        super(name);
        this.life = 282;
        this.attack = 52;
        this.defense = 43;
        this.maxLife = this.life;
        this.pokedexNumber = pokedexNumber;
    }
}

class Squirtle extends Character {
    constructor(name) {
        super(name);
        this.life = 440;
        this.attack = 48;
        this.defense = 65;
        this.maxLife = this.life
    }
}

class Rattata extends Character {
    constructor () {
        super('Little Monster');
        this.life = 300;
        this.attack = 56;
        this.defense = 35;
        this.maxLife = this.life;
    }
}

class Butterfree extends Character {
    constructor() {
        super('Butterfree');
        this.life = 324;
        this.attack = 45;
        this.defense = 50;
        this.maxLife = this.life
    }
}

class Stage {
    constructor(fighter1, fighter2, fighter1El, fighter2El, logObject) {
        this.fighter1 = fighter1;
        this.fighter2 = fighter2;
        this.fighter1El = fighter1El;
        this.fighter2El = fighter2El;
        this.log = logObject;
    }

    start() {
        this.update(); //Todo: Evento do botão de atacar.
        
        this.fighter1El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter1, this.fighter2));
        this.fighter2El.querySelector('.attackButton').addEventListener('click', () => this.doAttack(this.fighter2, this.fighter1));
    }

    update() {
        //Fighter 1
        this.fighter1El.querySelector('.name').innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`;
        let f1Pct = (this.fighter1.life / this.fighter1.maxLife) * 100;
        this.fighter1El.querySelector('.bar').style.width = `${f1Pct}%`;
        //Fighter 2
        this.fighter2El.querySelector('.name').innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`;
        let f2Pct = (this.fighter2.life / this.fighter2.maxLife) * 100;
        this.fighter2El.querySelector('.bar').style.width = `${f2Pct}%`;
    }

    doAttack(attacking, attacked) {
    if(attacking.life <= 0 || attacked.life <= 0) {
        let winner = attacking.life > 0 ? attacking.name : attacked.name;
        alert(`${winner} venceu a luta!`);
        window.location.reload(true);
        return;
    }

    let attackFactor = (Math.random() * 2).toFixed(2);
    let defenseFactor = (Math.random() *2).toFixed(2);
    let actualAttack = attacking.attack * attackFactor;
    let actalDefense = attacked.defense * defenseFactor;

    if(actualAttack > actalDefense) {
        attacked.life -= actualAttack;
        this.log.addMessage(`${attacking.name} causou ${actualAttack.toFixed(2)} de dano em ${attacked.name}`);
    } else {
        this.log.addMessage(`${attacked.name} conseguiu defender...`)
    }

    this.update();

    if(attacking.life <= 0 || attacked.life <= 0) {
        let winner = attacking.life > 0 ? attacking.name : attacked.name;
        let winnerMessage = document.getElementById('winner-message');
            winnerMessage.innerHTML = `${winner} venceu!`;
            winnerMessage.style.display = 'block';
        let atacarBotton = document.getElementById('atacarBotton');
            atacarBotton.style.display = 'none';
        let atacarBotton2 = document.getElementById('atacarBotton2');
            atacarBotton2.style.display = 'none';    
            setTimeout(function() {
                location.reload(true);
              }, 2000);   
        return;
    }
}
}

class Log{
    list = [];
    constructor(listEl){
        this.listEl = listEl;
    }

    addMessage(msg) {
        this.list.push(msg);
        this.render();
    }

    render(){
        this.listEl.innerHTML= "";

        for(let i in this.list) {
            this.listEl.innerHTML += `<li>${this.list[i]}</li>`;
        }
    }
}