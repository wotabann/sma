class RegisterPostResponse {
  /**
   * @param  {PostResponse} postResponse
   */
  constructor(postResponse) {
    this._header      = postResponse.header;
    this._errorString = postResponse.errorString;
    this._gameRecord  = this._parseGameRecord(postResponse);
    this._gameRecords = this._parseGameRecords(postResponse);
  }

  /**
   * @return {String}
   */
  get header() {
    return this._header;
  }

  /**
   * @return {String}
   */
  get errorString() {
    return this._errorString;
  }

  /**
   * @return {GameRecord}
   */
  get gameRecord() {
    return this._gameRecord;
  }

  /**
   * @return {GameRecords}
   */
  get gameRecords() {
    return this._gameRecords;
  }

  /**
   * @param  {PostResponse} postResponse
   * @return {GameRecord}
   */
  _parseGameRecord(postResponse) {
    var gameRecord = new GameRecord();
    gameRecord.id         = postResponse.payload.gameRecord.id;
    gameRecord.date       = postResponse.payload.gameRecord.date;
    gameRecord.rate       = postResponse.payload.gameRecord.rate;
    gameRecord.stock      = postResponse.payload.gameRecord.stock;
    gameRecord.fighter    = postResponse.payload.gameRecord.fighter;
    gameRecord.isVip      = postResponse.payload.gameRecord.isVip;
    gameRecord.isDeleted  = postResponse.payload.gameRecord.isDeleted;
    return gameRecord;
  }

  /**
   * @param  {PostResponse} postResponse
   * @return {GameRecords}
   */
  _parseGameRecords(postResponse) {
    var gameRecords = new GameRecords();

    for (let tmp of postResponse.payload.gameRecords) {
      var gameRecord = new GameRecord();
      gameRecord.id         = tmp.id;
      gameRecord.date       = tmp.date;
      gameRecord.rate       = tmp.rate;
      gameRecord.stock      = tmp.stock;
      gameRecord.fighter    = tmp.fighter;
      gameRecord.isDeleted  = tmp.isDeleted;
      gameRecord.isVip      = tmp.isVip;
      gameRecords.push(gameRecord);
    }
    return gameRecords;
  }
}
