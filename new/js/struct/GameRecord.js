class GameRecord {
  constructor() {
    this.id         = 0;
    this.date       = "2025-01-01";
    this.rate       = 0;
    this.stock      = 0;
    this.fighterId  = 0;
    this.isVip      = 0;
    this.isDisabled = 0;
  }

  toLineString(separator = ", ", prefix = "【", suffix = "】") {
    var lineString = prefix;
    lineString += this.date + separator;
    lineString += this.rate + separator;
    lineString += this.stock + separator;
    lineString += Fighter.idToName[this.fighterId] + suffix;
    return lineString;
  }
}
