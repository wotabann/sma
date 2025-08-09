class GameRecordDb {

  constructor() {
    this._poster = new Poster();
    //this._poster = new MockPoster();
  }


  /**
   * @note GameRecordを追加/更新する。
   * @param {GameRecord} gameRecord
   * @param {Boolean} isDump
   * @return {GameRecords}
   */
  async upsert(gameRecord, isDump) {
    var payload = {
      gameRecord: {
        id:             gameRecord.id,
        date:           gameRecord.date,
        stock:          gameRecord.stock,
        winUserName:    gameRecord.winUserName,
        loseUserName:   gameRecord.loseUserName,
        winFighterId:   gameRecord.winFighterId,
        loseFighterId:  gameRecord.loseFighterId,
        isDisabled:    (gameRecord.isDisabled ? 1 : 0),
      },
      isDump: (isDump) ? 1 : 0,
    };
    return await this._post("upsert", payload);
  }


  /**
   * @note GameRecordsを取得する。
   * @param {Account} account
   * @return {GameRecords}
   */
  async select(account) {
    var payload = {
      isDump: 1,
    };
    return await this._post("select", payload);
  }


  /**
   * @note サーバーにリクエストをポストする。
   * @param {String} header
   * @param {Object} payload
   * @return {GameRecords}
   */
  async _post(header, payload) {
    var postRequest;
    var postResponse;

    try {
      postRequest = new PostRequest(header, payload);
      postResponse = await this._poster.post(postRequest);
    }
    catch (e) {
      throw new SmaError("サーバーとの通信に失敗しました。");
    }

    if (postResponse.header != header) {
      throw new SmaError("サーバーからの受信ヘッダが期待と異なります。");
    }

    if (postResponse.errorString != "") {
      throw new SmaError(postResponse.errorString);
    }

    return this._parsePayloadToGameRecords(postResponse.payload);
  }


  /**
   * @note ペイロードをGameRecordsにパースする。
   * @param {Object} payload
   * @return {GameRecords}
   */
  _parsePayloadToGameRecords(payload) {
    var gameRecords = new GameRecords();

    for (let i = 0; i < payload.gameRecords.id.length; i++) {
      var gameRecord = new GameRecord();
      gameRecord.id         = payload.gameRecords.id[i];
      gameRecord.date       = payload.gameRecords.date[i];
      gameRecord.stock      = payload.gameRecords.stock[i];
      gameRecord.winUserName  = payload.gameRecords.winUserName[i];
      gameRecord.loseUserName  = payload.gameRecords.loseUserName[i];
      gameRecord.winFighterId  = payload.gameRecords.winFighterId[i];
      gameRecord.loseFighterId  = payload.gameRecords.loseFighterId[i];
      gameRecord.isDisabled = payload.gameRecords.isDisabled[i];
      gameRecords.push(gameRecord);
    }

    return gameRecords;
  }


}
