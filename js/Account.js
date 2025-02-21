class Account {
  constructor() {
    this.UserName = "test";
    this.Fighter  = "ファイター名";
  }

  ToJsonObject() {
    var data = {
      UserName: this.UserName,
      Fighter:  this.Fighter,
    };
    return data;
  }
}
