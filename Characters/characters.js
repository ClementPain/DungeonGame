class Character {
  constructor(name, className, hp, dmg, spellName, max_mana, mana, costSpecialAbility, status) {
    this.name = name;
    this.className = className;
    this.hp = hp;
    this.dmg = dmg;
    this.spellName = spellName;
    this.max_mana = max_mana;
    this.mana = mana;
    this.costSpecialAbility = costSpecialAbility;
    this.status = "playing";
  }

  takeDamage = (attacker, dmgReceived) => {
    console.log(`${attacker.name} inflige ${dmgReceived} points de dégats à ${this.name}`);    
    if(dmgReceived < this.hp) {
      this.hp -= dmgReceived;
    } else {
      this.hp = 0;
      this.status = "loser";
      attacker.mana + 20 <= attacker.max_mana ? attacker.mana += 20 : attacker.mana = attacker.max_mana; // ajouter 20 de mana à l'attaquant en cas de décès
      console.log(`${this.name} est mort(e)`);
    }
  }

  dealDamage = (defender, dmgDealt) => { // using this method for basic attacks and spells
    defender.takeDamage(this, dmgDealt);
  }

  castingSpell = () => { // check if a character can cast a spell
    if(this.mana >= this.costSpecialAbility) {
      this.mana -= this.costSpecialAbility;
      return true;
    } else {
      console.log(`${this.name} n'a pas assez de mana`);
      return false;
    }
  }
}


// voir comment utiliser super // la gestion des tours ?