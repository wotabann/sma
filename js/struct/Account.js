class Account {

  constructor() {
    this.userName = "test";
    this.fighterId = 0;
  }

  toJsonObject() {
    return {
      userName:  this.userName,
      fighterId: this.fighterId,
    };
  }
}
