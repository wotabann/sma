class GameRecord {
  constructor() {
    this.id        = 0;
    this.date      = "2025-01-01";
    this.rate      = 0;
    this.stock     = 0;
    this.fighter   = "ファイター名";
    this.isVip     = false;
    this.isDeleted = false;
  }

  toJsonObject() {
    var data = {
      id:         this.id,
      date:       this.date,
      rate:       this.rate,
      stock:      this.stock,
      fighter:    this.fighter,
      isVip:      this.isVip,
      isDeleted:  this.isDeleted,
    };
    return data;
  }
}
