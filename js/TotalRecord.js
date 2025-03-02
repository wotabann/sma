class TotalRecord {

  constructor() {
    this.gameCount  = 0;
    this.winCount   = 0;
    this.loseCount  = 0;
    this.totalStock = 0;
    this.rate       = 0;
    this.maxRate    = 0;
    this.minRate    = 9999;
    this.maxWin     = 0;
    this.maxLose    = 0;
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
