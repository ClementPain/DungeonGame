class Game {
  constructor(nbPlayers) {
    this.turnLeft = 10;
    this.players = [];
    this.status = "playing";
    this.nbPlayers = nbPlayers;
    this.nbClasses = 7;
  }

  play = () => {
    prompt("Bienvenue dans le donjon ! Les champions s'affrontent pour le trésor");
    
    this.setPlayersNames();

    console.log("Voici les joueurs : ");
    this.showPlayers();

    while (this.turnLeft > 0 && this.status === "playing") {
      this.startTurn();
    }

    this.endGame();
  }

  setPlayersNames = () => {
    for (let i = 1; i <= this.nbPlayers; i++) {
    let nb = Math.floor(Math.random() * this.nbClasses) + 1;
      
      switch(nb) {
        case 1 :
          let namePlayer1 = prompt(`Le champion numéro ${i} est un Chevalier. Choisissez-lui un nom :`)
          let player1 = new Fighter(namePlayer1);
          this.players.push(player1);
          break;
        case 2 :
          let namePlayer2 = prompt(`Le champion numéro ${i} est un Paladin. Choisissez-lui un nom :`)
          let player2 = new Paladin(namePlayer2);
          this.players.push(player2);
          break;
        case 3 :
          let namePlayer3 = prompt(`Le champion numéro ${i} est un Moine. Choisissez-lui un nom :`)
          let player3 = new Monk(namePlayer3);
          this.players.push(player3);
          break;
        case 4 :
          let namePlayer4 = prompt(`Le champion numéro ${i} est un Guerrier. Choisissez-lui un nom :`)
          let player4 = new Berzerker(namePlayer4);
          this.players.push(player4);
          break;
        case 5 :
          let namePlayer5 = prompt(`Le champion numéro ${i} est un Assassin. Choisissez-lui un nom :`)
          let player5 = new Assassin(namePlayer5);
          this.players.push(player5);
          break;
        case 6 :
          let namePlayer6 = prompt(`Le champion numéro ${i} est un Magicien. Choisissez-lui un nom :`)
          let player6 = new Wizard(namePlayer6);
          this.players.push(player6);
          break;
        case 7 :
          let namePlayer7 = prompt(`Le champion numéro ${i} est un Saboteur. Choisissez-lui un nom :`)
          let player7 = new Saboteur(namePlayer7);
          this.players.push(player7);
          break;
      }
    }
  }

  startTurn = () => {
    if ( this.checkForWinner() === false ) {
      console.log("                ¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤¤                      ")
      console.log(`Le tour ${10 - this.turnLeft + 1} commence`);
      
      let charactersAlive = this.players.filter(player => player.status === "playing");

      for (let thisPlayer of charactersAlive) {
        console.log("=========================");

        if (thisPlayer.status === "loser") {
          console.log(`${thisPlayer.name} est mort(e) ce tour ci`);
        } else {
          console.log(`C'est au tour de ${thisPlayer.name} (${thisPlayer.hp} points de vie, ${thisPlayer.dmg} points de dégâts, ${thisPlayer.mana} points de mana)`);
          this.turnPlayer(thisPlayer);
        }
      }

      this.skipTurn();
    } 
  }

  turnPlayer = (thisPlayer) => {
    if ( this.checkForWinner() === false ) {
      // faire baisser la durée de vie du bouclier du chevalier et lancer la Frappe de l'ombre de l'assassin
      if (thisPlayer.className === "Chevalier") { thisPlayer.shieldDuration() };
      if (thisPlayer.className === "Assassin" && thisPlayer.shadowParams[0] === 1) { thisPlayer.shadowHit(thisPlayer.shadowParams[1]) };

      if (thisPlayer.status === "playing") { // check if assassin didn't kill himself with shadowHit
        let thisPlayerChoice = prompt(`${thisPlayer.name} - Que voulez-vous faire ? (1- Attaquer un joueur, 2- Utiliser ${thisPlayer.spellName}, 3- Consulter l'état des joueurs)`);
        
        switch(thisPlayerChoice) {
          case '1' :
            this.attackPlayers(thisPlayer);
            break;
          case '2' :
            this.spellPlayers(thisPlayer);
            break;
          case '3' :
            this.showPlayers(thisPlayer);
            this.turnPlayer(thisPlayer); 
            break;

          default :
            console.log(`Veuillez saisir une option correcte`);
            this.turnPlayer(thisPlayer); 
            break;
        }
      }
    }
  }

  checkForWinner = () => {
    if ( this.players.filter(player => player.status === "playing").length === 1 ) {
      this.status = "over";
      return true;
    } else {
      return false;
    }
  }

  attackPlayers = (thisPlayer) => {
    let otherPlayers = this.players.filter(player => player != thisPlayer && player.status === "playing").map(player => player.name);
        
    while (true) {
      let characterAttacked = prompt(`${thisPlayer.name} - Qui voulez-vous attaquer ? (${otherPlayers}) - quitter : choisir une autre option`);

      if ( otherPlayers.map( playerName => playerName.toLowerCase() ).includes(characterAttacked.toLowerCase() ) ) {
        thisPlayer.dealDamage(this.players.find(character => character.name.toLowerCase() === characterAttacked.toLowerCase() ), thisPlayer.dmg);
        break;
      } else if (characterAttacked.toLowerCase() === "quitter") {
        this.turnPlayer(thisPlayer);
      } else {
        console.log("Veuillez choisir un des personnages disponibles");
      }
    }
  }

  spellPlayers = (thisPlayer) => {
    switch(thisPlayer.className) {
      case 'Chevalier' :
        thisPlayer.darkVision(this.choiceSpellTarget(thisPlayer));
        break;
      case 'Paladin' :
        thisPlayer.healingLighting(this.choiceSpellTarget(thisPlayer));
        break;
      case 'Moine' :
        thisPlayer.heal();
        break;
      case 'Guerrier' :
        thisPlayer.rage();
        break;
      case 'Assassin' :
        thisPlayer.shadowHitInitialize(this.choiceSpellTarget(thisPlayer));
        break;
      case 'Magicien' :
        thisPlayer.fireball(this.choiceSpellTarget(thisPlayer));
        break;
      case 'Saboteur' :
        thisPlayer.sabotage(this.choiceSpellTarget(thisPlayer));
        break;      
    }
  }

  choiceSpellTarget = (thisPlayer) => {
    let otherPlayers = this.players.filter(player => player != thisPlayer && player.status === "playing").map(player => player.name);
        
    while (true) {
      let characterAttacked = prompt(`${thisPlayer.name} - Qui voulez-vous attaquer ? (${otherPlayers}) - quitter : choisir une autre option`);

      if ( otherPlayers.map( playerName => playerName.toLowerCase() ).includes(characterAttacked.toLowerCase() ) ) {
        return this.players.find(character => character.name.toLowerCase() === characterAttacked.toLowerCase() );
        break;
      } else if (characterAttacked.toLowerCase() === "quitter") {
        this.turnPlayer(thisPlayer);
      } else {
        console.log("Veuillez choisir un des personnages disponibles");
      }
    }
  }

  showPlayers = (thisPlayer) => {
    console.log("---------------------");
    console.log("Etat des joueurs :");
    for (let player of this.players) {
      console.log(`${player.name} - ${player.hp} points de vie, ${player.dmg} points de dégâts, ${player.mana} points de mana, ${player.className}`);
    }
    console.log("---------------------");
  }
  

  skipTurn = () => {
    this.turnLeft -= 1;
    
    if(this.turnLeft === 1) {
      console.log(`C'est le dernier tour !`);
    } else if(this.turnLeft === 0) {
      console.log(`La partie est terminée`);
      this.status = "over";
    }
  }

  endGame = () => {
    this.players.forEach(player => { if (player.status === "playing") {player.status = "winner"} });
    let arrayWinners = this.players.filter( player => player.status === "winner" ).map( player => player.name );
    
    arrayWinners.length > 1 ? console.log(`${arrayWinners} ont gagnés !`) : console.log(`${arrayWinners} a gagné !`);
  }
}


let game1 = new Game(5);

game1.play();