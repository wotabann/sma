class Account {

  constructor() {
    this.userName = "test";
    this.fighter  = "ファイター名";
  }

  /**
   * @return {Object}
   */
  toJsonObject() {
    var data = {
      userName: this.userName,
      fighter:  this.fighter,
    };
    return data;
  }
}
