class Assassin extends Character {
  constructor(name) {
    super(name);
    this.className = "Assassin";
    this.hp = 6;
    this.dmg = 6;
    this.spellName = "Frappe de l'ombre";
    this.max_mana = 20;
    this.mana = 20;
    this.costSpecialAbility = 20;
    this.shadowParams = [0, 0];
  }

  shadowHitInitialize = (ennemy) => {
    if(this.castingSpell() ) {
      this.shadowParams = [1, ennemy];
      console.log(`${this.name} disparaît dans la pénombre`);
    }
  }

  shadowHit = (ennemy) => {
    console.log(`${this.name} sort de la pénombre !`);
    this.shadowParams = [0, 0];

    this.dealDamage(ennemy, 7);

    if ( ennemy.status === "loser" ) {
      console.log(`${this.name} a réussi la Frappe de l'Ombre !`);
      this.mana += 20;
    } else if ( ennemy.status === "playing" ) {
      console.log(`${this.name} devient fou! Il subit des dégâts`);
      this.takeDamage(this, 7); 
    }

    
  }

  takeDamage = (attacker, dmgReceived) => {
    if (this.shadowParams[0] === 1) {
      console.log(`${attacker.name} attaque une ombre ! C'est sans effet..`);
    } else {
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
  }
}