class FighterRecord {
  constructor() {
    this.Fighter    = "ファイター名";
    this.GameCount  = 0;
    this.WinCount   = 0;
    this.LoseCount  = 0;
    this.TotalStock = 0;
  }

  WinRate() {
    return this.WinCount / this.GameCount;
  }

  LoseRate() {
    return this.LoseCount / this.GameCount;
  }

  StockRate() {
    return this.TotalStock / this.GameCount;
  }
}
