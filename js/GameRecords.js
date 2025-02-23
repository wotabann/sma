class GameRecords {
  constructor() {
    this._gameRecords = [];
  }

  /**
   * @param  {GameRecord} gameRecord
   * @return {GameRecord}
   */
  Push(gameRecord) {
    this._gameRecords.push(gameRecord);
    return gameRecord;
  }

  /**
   * @return {Integer}
   */
  Length() {
    return this._gameRecords.length;
  }

  /**
   * @param  {Integer} i
   * @return {GameRecord}
   */
  Index(i) {
    return this._gameRecords[i];
  }

  /**
   * @return {JsonObject}
   */
  ToJsonObject() {
    var data = [];

    for (let gameRecord of this._gameRecords) {
      data.push(gameRecord.ToJsonObject());
    }
  
    return data;
  }
}
