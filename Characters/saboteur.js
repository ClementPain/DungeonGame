class Saboteur extends Character {
  constructor(name) {
    super(name);
    this.className = "Saboteur";
    this.hp = 8;
    this.dmg = 3;
    this.spellName = "Sabotage";
    this.max_mana = 100;
    this.mana = 100;
    this.costSpecialAbility = 40;
    this.sabotageParams = [];
  }

  sabotage = (ennemy) => {
    if(this.castingSpell() ) {
      if ( this.sabotageParams.includes(ennemy) ) { // can't sabotage twice the same ennemy
        console.log(`Le sabotage a raté...`);
      } else {
        this.sabotageParams.push(ennemy); 
        console.log(`${this.name} prépare un sale coup !`);
      }
    }
  }

  takeDamage = (attacker, dmgReceived) => {
    if (this.sabotageParams.includes(attacker) ) {
      this.sabotageParams.splice(this.sabotageParams.indexOf(attacker), 1); // delete the sabotage from the parameters
      
      console.log(`L'arme de ${attacker.name} se retourne contre lui !`);
      this.dealDamage(attacker, dmgReceived); // send back the damages to the attacker

    } else {
      console.log(`${attacker.name} inflige ${dmgReceived} points de dégats à ${this.name}`); 

      if(dmgReceived < this.hp) {
        this.hp -= dmgReceived;
      } else {
        this.hp = 0;
        this.status = "loser";
        attacker.mana + 20 <= attacker.max_mana ? attacker.mana += 20 : attacker.mana = attacker.max_mana; // add 20 mana if the victim is killed
        console.log(`${this.name} est mort(e)`);
      }
    }
  }
}