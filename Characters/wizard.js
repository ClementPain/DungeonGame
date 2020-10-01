class Wizard extends Character {
  constructor(name) {
    super(name);
    this.className = "Magicien";
    this.hp = 11;
    this.dmg = 2;
    this.spellName = "Boule de feu";
    this.max_mana = 200;
    this.mana = 200;
    this.costSpecialAbility = 25;
  }

  fireball = (ennemy) => {
    if(this.castingSpell() ) {
      console.log(`${this.name} lance une énorme boule de feu en direction de l'ennemi !`);
      this.dealDamage(ennemy, 5);
    }
  }
}