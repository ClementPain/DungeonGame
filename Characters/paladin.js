class Paladin extends Character {
  constructor(name) {
    super(name);
    this.className = "Paladin";
    this.hp = 16;    
    this.dmg = 2;
    this.spellName = "Lumière divine"
    this.max_mana = 160;
    this.mana = 160;
    this.costSpecialAbility = 40;
  }

  healingLighting = (ennemy) => {
    if(this.castingSpell() ) {
      this.hp <= 11 ? this.hp += 5 : this.hp = 16; // heal max 16
      console.log(`${this.name} se soigne 5 points de vie et a maintenant ${this.hp} points de vie`);
      this.dealDamage(ennemy, 4); // damage
    }
  }
}