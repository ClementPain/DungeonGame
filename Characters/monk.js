class Monk extends Character {
  constructor(name) {
    super(name);
    this.className = "Moine";
    this.hp = 8;
    this.dmg = 2;
    this.spellName = "Soin";
    this.max_mana = 200;
    this.mana = 200;
    this.costSpecialAbility = 25 ;
  }

  heal = () => {
    if(this.castingSpell() ) {
      this.hp = 8;
      console.log(`${this.name} se soigne !`);
    }
  }
}