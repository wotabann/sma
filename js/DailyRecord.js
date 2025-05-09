class DailyRecord {

  constructor(date) {
    // 外部公開用プロパティ
    this._date       = date;
    this._gameCount   = 0;
    this._winCount    = 0;
    this._loseCount   = 0;
    this._totalStock  = 0;
    this._maxRate     = 0;
    this._minRate     = 9999;

    // 内部計算用プロパティ
    this._rates       = [];
    this._totalRate   = 0;
  }

  add(rate, stock) {
    this._gameCount++;
    this._winCount   += (stock > 0) ? 1 : 0;
    this._loseCount  += (stock < 0) ? 1 : 0;
    this._totalStock += stock;
    this._maxRate     = Math.max(this._maxRate, rate);
    this._minRate     = Math.min(this._minRate, rate);

    this._totalRate += rate;
    this._rates.push(rate);
  }

  get date() {
    return this._date;
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

  get winOver() {
    return this._winCount - this._loseCount;
  }

  get totalStock() {
    return this._totalStock;
  }

  get maxRate() {
    return this._maxRate;
  }

  get minRate() {
    return this._minRate;
  }

  get lastRate() {
    return this._rates[this._rates.length - 1];
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

  get latestRate() {
    if (this.gameCount > 0) {
      return this._rates[this._rates.length - 1];
    }
    return 0;
  }

  get averageRate() {
    if (this.gameCount > 0) {
      return this._totalRate / this.gameCount;
    }
    return 0;
  }

  get medianRate() {
    var length = this._rates.length;
    var index = Math.trunc(length / 2);

    if (length == 0) {
      return 0;
    }

    if ((length % 2) > 0) {
      return this._rates[index];
    }

    return Math.round((this._rates[index] + this._rates[index - 1]) / 2);
  }

}
