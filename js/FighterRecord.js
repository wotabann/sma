class FighterRecord {
  constructor() {
    this.fighter    = "ファイター名";
    this.gameCount  = 0;
    this.winCount   = 0;
    this.loseCount  = 0;
    this.totalStock = 0;
  }

  get winOver() {
    return this.winCount - this.loseCount;
  }

  get winRate() {
    if (this.gameCount > 0) {
      return this.winCount / this.gameCount;
    }
    return 0;
  }

  get stockRate() {
    if (this.gameCount > 0) {
      return this.totalStock / this.gameCount;
    }
    return 0;
  }
}
