class MockPoster extends Poster {

  constructor(count = 100, errorString = "") {
    super();
    this._count = count;
    this._errorString = errorString;
  }


  /**
   * @note   ポストする
   * @param  {PostRequest} postRequest
   * @return {PostResponse}
   */
  async post(postRequest) {
    var postResponse = {
      header: postRequest.toJsonObject().header,
      errorString: this._errorString,
      payload: {
        gameRecords: {
          id:            [],
          date:          [],
          stock:         [],
          winUserName:   [],
          loseUserName:  [],
          winFighterId:  [],
          loseFighterId: [],
          isDisabled:    [],
        },
      },
    };

    if (postRequest.toJsonObject().payload.isDump != 0) {
      for (let i = 0; i < (this._count - 1); i++) {
        var stock = Math.floor(Math.random() * 3 + 1);
        var fighterId = Math.floor(Math.random() * 30) + 1;
        var isDisabled = (i % 10 == 3) ? 1 : 0
        postResponse.payload.gameRecords.id.push(i + 1);
        postResponse.payload.gameRecords.date.push("2025/05/01");
        postResponse.payload.gameRecords.stock.push(stock);
        postResponse.payload.gameRecords.winUserName.push("winner");
        postResponse.payload.gameRecords.loseUserName.push("loser");
        postResponse.payload.gameRecords.winFighterId.push(fighterId);
        postResponse.payload.gameRecords.loseFighterId.push(fighterId + 1);
        postResponse.payload.gameRecords.isDisabled.push(isDisabled);
      }
    }

    if (postRequest.toJsonObject().header == "upsert") {
      var gameRecord = postRequest.toJsonObject().payload.gameRecord;
      if (gameRecord.id == 0) {
        postResponse.payload.gameRecords.id.push(this._count);
        postResponse.payload.gameRecords.date.push(gameRecord.date);
        postResponse.payload.gameRecords.stock.push(gameRecord.stock);
        postResponse.payload.gameRecords.winUserName.push(gameRecord.winUserName);
        postResponse.payload.gameRecords.loseUserName.push(gameRecord.loseUserName);
        postResponse.payload.gameRecords.winFighterId.push(gameRecord.winFighterId);
        postResponse.payload.gameRecords.loseFighterId.push(gameRecord.loseFighterId);
        postResponse.payload.gameRecords.isDisabled.push(gameRecord.isDisabled);
      }
    }
  

    return postResponse;
  }
}