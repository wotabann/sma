class GameRecords {

  constructor() {
    this._gameRecords = [];
    this._enabledCount = 0;
  }

  /**
   * @return {Integer}
   */
  get length() {
    return this._gameRecords.length;
  }

  /**
   * @return {Integer}
   */
  get enabledCount() {
    return this._enabledCount;
  }

  /**
   * @param {GameRecord} gameRecord
   * @return {GameRecord}
   */
  push(gameRecord) {
    this._gameRecords.push(gameRecord);
    if (gameRecord.isDisabled != 0) {
      this._enabledCount++;
    }
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
