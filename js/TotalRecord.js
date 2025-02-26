class TotalRecord {
  constructor() {
    this.GameCount  = 0;
    this.WinCount   = 0;
    this.LoseCount  = 0;
    this.TotalStock = 0;
    this.Rate       = 0;
    this.MaxRate    = 0;
    this.MinRate    = 2000;
    this.MaxWin     = 0;
    this.MaxLose    = 0;
  }

  WinRate() {
    if (this.GameCount > 0) {
      return this.WinCount / this.GameCount;
    }
    return 0;
  }

  StockRate() {
    if (this.GameCount > 0) {
      return this.TotalStock / this.GameCount;
    }
    return 0;
  }
}
