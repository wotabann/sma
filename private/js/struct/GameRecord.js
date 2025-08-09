class GameRecord {
  constructor() {
    this.id            = 0;
    this.date          = "2025-01-01";
    this.stock         = 0;
    this.winUserName   = "test";
    this.loseUserName  = "test";
    this.winFighterId  = 0;
    this.loseFighterId = 0;
    this.isDisabled    = 0;
  }

  toJsonObject() {
    return {
      id:            this.id,
      date:          this.date,
      stock:         this.stock,
      winUserName:   this.winUserName,
      loseUserName:  this.loseUserName,
      winFighterId:  this.winFighterId,
      loseFighterId: this.loseFighterId,
      isDisabled:    this.isDisabled,
    };
  }

  toString() {
    var winner;
    var loser;
    if (this.winFighterId == this.loseFighterId) {
      winner = this.winUserName;
      loser  = this.loseUserName;
    }
    else {
      winner = Fighter.idToName[this.winFighterId];
      loser  = Fighter.idToName[this.loseFighterId];
    }

    var string = "";
    string += "・日付: " + this.date + "\n";
    string += "・勝ち: " + winner + "　(+" + this.stock + ")\n";
    string += "・負け: " + loser;
    return string;
  }
}
