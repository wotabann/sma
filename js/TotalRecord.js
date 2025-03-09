class TotalRecord {

  constructor() {
    // 外部公開用プロパティ
    this._gameCount  = 0;
    this._winCount   = 0;
    this._loseCount  = 0;
    this._totalStock = 0;
    this._rate       = 0;
    this._maxRate    = 0;
    this._minRate    = 9999;
    this._maxWin     = 0;
    this._maxLose    = 0;
    this._lastDate   = "-";

    // 内部計算用プロパティ
    this._winningStreak = 0;
    this._lossingStreak = 0;
  }

  add(date, rate, stock) {
    this._winningStreak = (stock > 0) ? (this._winningStreak + 1) : 0;
    this._lossingStreak = (stock < 0) ? (this._lossingStreak + 1) : 0;

    this._gameCount++;
    this._winCount   += (stock > 0) ? 1 : 0;
    this._loseCount  += (stock < 0) ? 1 : 0;
    this._totalStock += stock;
    this._rate        = rate;
    this._maxRate     = Math.max(this._maxRate, rate);
    this._minRate     = Math.min(this._minRate, rate);
    this._maxWin      = Math.max(this._maxWin,  this._winningStreak);
    this._maxLose     = Math.max(this._maxLose, this._lossingStreak);
    this._lastDate    = date;
  }

  get gameCount() {
    return this._gameCount;
  }

  get winCount() {
    return this._winCount;
  }

  get loseCount() {
    return this._loseCount;
  }

  get totalStock() {
    return this._totalStock;
  }

  get rate() {
    return this._rate;
  }

  get maxRate() {
    return this._maxRate;
  }

  get minRate() {
    return this._minRate;
  }

  get maxWin() {
    return this._maxWin;
  }

  get maxLose() {
    return this._maxLose;
  }

  get lastDate() {
    return this._lastDate;
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
