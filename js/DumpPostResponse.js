class DumpPostResponse {
  /**
   * @param  {PostResponse} postResponse
   */
  constructor(postResponse) {
    this._header      = postResponse.header;
    this._errorString = postResponse.errorString;
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
   * @return {GameRecords}
   */
  get gameRecords() {
    return this._gameRecords;
  }

  /**
   * @param  {PostResponse} postResponse
   * @return {GameRecords}
   */
  _parseGameRecords(postResponse) {
    var gameRecords = new GameRecords();

    if (postResponse.payload.gameRecords == null) {
      return gameRecords;
    }

    for (let tmp of postResponse.payload.gameRecords) {
      var gameRecord = new GameRecord();
      gameRecord.id         = tmp.id;
      gameRecord.date       = tmp.date;
      gameRecord.rate       = tmp.rate;
      gameRecord.stock      = tmp.stock;
      gameRecord.fighter    = tmp.fighter;
      gameRecord.isVip      = tmp.isVip;
      gameRecord.isDeleted  = tmp.isDeleted;
      gameRecords.push(gameRecord);
    }
    return gameRecords;
  }

}
