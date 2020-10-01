class Monk extends Character {
  constructor(name) {
    super(name);
    this.className = "Moine";
    this.hp = 8;
    this.dmg = 3;
    this.spellName = "Soin";
    this.max_mana = 200;
    this.mana = 200;
    this.costSpecialAbility = 25 ;
    this.healParams = "";
  }

  heal = (ennemy) => {
    if(this.castingSpell() ) {
      this.hp = 8;
      console.log(`${this.name} se soigne !`);
      
      // reduce damages of an ennemy
      if (ennemy.dmg > 0) {
        this.healParams = ennemy;
        ennemy.dmg -= 1;
      }
      console.log(`${ennemy.name} est touché par la grace divine`);
    }
  }

  healReset = () => {
    if (this.healParams !== "") {
      this.healParams.dmg += 1;
      this.healParams = "";
    }
  }
}