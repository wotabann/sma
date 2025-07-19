class GameRecords {

  constructor() {
    this._gameRecords = [];
  }

  /**
   * @return {Integer}
   */
  get length() {
    return this._gameRecords.length;
  }

  /**
   * @param {GameRecord} gameRecord
   * @return {GameRecord}
   */
  push(gameRecord) {
    this._gameRecords.push(gameRecord);
    return gameRecord;
  }

  /**
   * @param {Integer} i
   * @return {GameRecord}
   */
  index(i) {
    return this._gameRecords[i];
  }

  /**
   * @param {Integer} id
   * @return {GameRecord}
   */
  findById(id) {
    var gameRecord;
    for (let i = 0; i < this.length; i++) {
      gameRecord = this.index(i);
      if (gameRecord.id == id) {
        return gameRecord;
      }
    }
    return null;
  }
}
