class FighterRecord {
  constructor() {
    this.Fighter    = "ファイター名";
    this.GameCount  = 0;
    this.WinCount   = 0;
    this.LoseCount  = 0;
    this.TotalStock = 0;
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
