class Fighter extends Character {
  constructor(name) {
    super(name);
    this.className = "Chevalier";
    this.hp = 12; 
    this.dmg = 3;
    this.spellName = "Vision ténébreuse";
    this.max_mana = 40;
    this.mana = 40;
    this.costSpecialAbility = 20;
    this.shield = [0, 0]; // shield = protection against damages for 2 rounds
  }

  darkVision = (ennemy) => {
    if(this.castingSpell() ) {
      this.shield = [2, 2];
      console.log(`${this.name} lève son bouclier et a maintenant 2 points d'armure`);
      this.dealDamage(ennemy, this.dmg + 2);
    }
  }

  shieldDuration = () => {
    if (this.shield[1] > 0) {
      this.shield[1] -= 1; // faire baisser la durée de vie du bouclier
      if (this.shield[1] === 0) {
        this.shield[0] = 0; // remettre l'armure à zéro au bout de deux tours
        console.log(`${this.name} n'a plus de bouclier et est maintenant vulnérable`);
      }
    }
  }

  takeDamage = (attacker, dmgReceived) => {
    if(dmgReceived - this.shield[0] < this.hp) {
      dmgReceived > this.shield[0] ? this.hp -= dmgReceived - this.shield[0] : this.hp = this.hp; // ne perds pas de pdv si bouclier >= dmg (sinon peut en gagner)
      
      this.shield[0] > 0 ? console.log(`${this.name} pare le coup et ne subit que ${dmgReceived - this.shield[0]} points de dégâts`) : console.log(`${attacker.name} inflige ${dmgReceived} points de dégats à ${this.name}`); // s'il a un bouclier, il réduit les dégâts
    } else {
      this.hp = 0;
      this.status = "loser";
      attacker.mana + 20 <= attacker.max_mana ? attacker.mana += 20 : attacker.mana = attacker.max_mana; // ajouter 20 de mana à l'attaquant en cas de décès
      console.log(`${this.name} est mort(e)`);
    }
  }
}