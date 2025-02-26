class GameRecord {
  constructor() {
    this.Date = "2025-01-01";
    this.Rate = 0;
    this.Stock = 0;
    this.Fighter = "ファイター名";

    this.CreateTime = 0;
    this.UpdateTime = 0;
    this.IsDeleted  = false;
  }

  ToJsonObject() {
    var data = {
      Date:    this.Date,
      Rate:    this.Rate,
      Stock:   this.Stock,
      Fighter: this.Fighter,

      CreateTime: this.CreateTime,
      UpdateTime: this.UpdateTime,
      IsDeleted:  this.IsDeleted,
    };
    return data;
  }
}
