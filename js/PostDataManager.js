class PostDataManager {
  constructor() {
  }

  /**
   * @param  {Account}    account
   * @param  {GameRecord} gameRecord
   * @return {PostSendData}
   */
  static CreateRegisterRequest(account, gameRecord) {
    var payload = {
      Account:    account.ToJsonObject(),
      GameRecord: gameRecord.ToJsonObject(),
    };

    var postSendData = new PostSendData();
    postSendData.Header  = "RegisterRequest";
    postSendData.Payload = payload;
    return postSendData;
  }

  /**
   * @param  {PostRecvData} postRecvData
   * @return {GameRecord}
   */
  static ParseGameRecordFromRegisterResponse(postRecvData) {
    var gameRecord = new GameRecord();
    gameRecord.Date    = postRecvData.Payload.GameRecord.Date;
    gameRecord.Rate    = postRecvData.Payload.GameRecord.Rate;
    gameRecord.Stock   = postRecvData.Payload.GameRecord.Stock;
    gameRecord.Fighter = postRecvData.Payload.GameRecord.Fighter;
    return gameRecord;
  }


  /**
   * @param  {Account} account
   * @return {PostSendData}
   */
  static CreateDumpRequest(account) {
    var payload = {
      Account: account.ToJsonObject(),
    };

    var postSendData = new PostSendData();
    postSendData.Header  = "DumpRequest";
    postSendData.Payload = payload;
    return postSendData;
  }

  /**
   * @param  {PostRecvData} postRecvData
   * @return {GameRecords}
   */
  static ParseGameRecordsFromDumpResponse(postRecvData) {
    var gameRecords = new GameRecords();

    for (let tmp of postRecvData.Payload.GameRecords) {
      var gameRecord = new GameRecord();
      gameRecord.Date    = tmp.Date;
      gameRecord.Rate    = tmp.Rate;
      gameRecord.Stock   = tmp.Stock;
      gameRecord.Fighter = tmp.Fighter;

      gameRecords.Push(gameRecord);
    }
    return gameRecords;
  }
}
