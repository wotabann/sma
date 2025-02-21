class GameRecord {
  constructor() {
    this.Date = "2025-01-01";
    this.Rate = 0;
    this.Stock = 0;
    this.Fighter = "ファイター名";
  }

  ToJsonObject() {
    var data = {
      Date:    this.Date,
      Rate:    this.Rate,
      Stock:   this.Stock,
      Fighter: this.Fighter,
    };
    return data;
  }
}
