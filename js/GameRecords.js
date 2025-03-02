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
   * @param  {GameRecord} gameRecord
   * @return {GameRecord}
   */
  push(gameRecord) {
    this._gameRecords.push(gameRecord);
    return gameRecord;
  }

  /**
   * @param  {Integer} i
   * @return {GameRecord}
   */
  index(i) {
    return this._gameRecords[i];
  }

  /**
   * @return {JsonObject}
   */
  toJsonObject() {
    var data = [];

    for (let gameRecord of this._gameRecords) {
      data.push(gameRecord.toJsonObject());
    }
  
    return data;
  }
}
