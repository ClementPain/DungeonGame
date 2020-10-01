class Berzerker extends Character {
  constructor(name) {
    super(name);
    this.className = "Guerrier";
    this.hp = 8;
    this.dmg = 4;
    this.spellName = "Rage";
    this.max_mana = 0;
    this.mana = 0;
    this.costSpecialAbility = 0;
  }

  rage = () => {
    if(this.hp > 1) {
      this.hp -= 1;
      this.dmg += 1;
      console.log(`${this.name} a maintenant ${this.dmg} points de dégâts et ${this.hp} points de vie`)
    } else {
      console.log(`${this.name} n'a plus qu'un point de vie !`);
    }
  }
}