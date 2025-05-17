class DailyRecord {

  constructor(date) {
    this._date       = date;
    this._gameCount  = 0;
    this._winCount   = 0;
    this._loseCount  = 0;
    this._totalStock = 0;
    this._rate       = 0;
    this._maxRate    = 0;
    this._minRate    = 9999;
    this._totalRate  = 0;
  }

  add(rate, stock) {
    this._gameCount++;
    this._winCount   += (stock > 0) ? 1 : 0;
    this._loseCount  += (stock < 0) ? 1 : 0;
    this._totalStock += stock;
    this._rate        = rate;
    this._maxRate     = Math.max(this._maxRate, rate);
    this._minRate     = Math.min(this._minRate, rate);
    this._totalRate += rate;
  }


  get date() {
    return this._date;
  }

  get gameCount() {
    return this._gameCount;
  }
  set gameCount(value) {
    this._gameCount = value;
  }

  get winCount() {
    return this._winCount;
  }
  set winCount(value) {
    this._winCount = value;
  }

  get loseCount() {
    return this._loseCount;
  }
  set loseCount(value) {
    this._loseCount = value;
  }

  get totalStock() {
    return this._totalStock;
  }
  set totalStock(value) {
    this._totalStock = value;
  }

  get rate() {
    return this._rate;
  }
  set rate(value) {
    this._rate = value;
  }

  get maxRate() {
    return this._maxRate;
  }
  set maxRate(value) {
    this._maxRate = value;
  }

  get minRate() {
    return this._minRate;
  }
  set minRate(value) {
    this._minRate = value;
  }

  get totalRate() {
    return this._totalRate;
  }
  set totalRate(value) {
    this._totalRate = value;
  }


  get winOver() {
    return this._winCount - this._loseCount;
  }

  get winRate() {
    if (this._gameCount > 0) {
      return this._winCount / this._gameCount;
    }
    return 0;
  }

  get stockRate() {
    if (this._gameCount > 0) {
      return this._totalStock / this._gameCount;
    }
    return 0;
  }

  get averageRate() {
    if (this._gameCount > 0) {
      return this._totalRate / this._gameCount;
    }
    return 0;
  }

}
