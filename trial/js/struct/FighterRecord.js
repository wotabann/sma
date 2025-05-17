class FighterRecord {
  constructor(fighter) {
    this._fighter    = fighter;
    this._gameCount  = 0;
    this._winCount   = 0;
    this._loseCount  = 0;
    this._totalStock = 0;
  }

  add(stock) {
    this._gameCount++;
    this._winCount   += (stock > 0) ? 1 : 0;
    this._loseCount  += (stock < 0) ? 1 : 0;
    this._totalStock += stock;
  }


  set gameCount(gameCount) {
    this._gameCount = gameCount;
  }

  set winCount(winCount) {
    this._winCount = winCount;
  }

  set loseCount(loseCount) {
    this._loseCount = loseCount;
  }

  set totalStock(totalStock) {
    this._totalStock = totalStock;
  }


  get fighter() {
    return this._fighter;
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

  get winOver() {
    return this.winCount - this.loseCount;
  }

  get winRate() {
    if (this.gameCount > 0) {
      return this.winCount / this.gameCount;
    }
    return 0;
  }

  get loseRate() {
    if (this.gameCount > 0) {
      return this.loseCount / this.gameCount;
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
