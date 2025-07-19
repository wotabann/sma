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
          id:         [],
          date:       [],
          rate:       [],
          stock:      [],
          fighterId:  [],
          isVip:      [],
          isDisabled: [],
        },
      },
    };

    if (postRequest.toJsonObject().payload.isDump != 0) {
      var rate = 1400;
      for (let i = 0; i < (this._count - 1); i++) {
        var sign = (Math.random() < 0.5) ? (-1) : 1;
        var stock = Math.floor(Math.random() * 3 + 1) * sign;
        var diff = Math.floor(Math.random() * 30 + 20) * sign;
        var fighterId = Math.floor(Math.random() * 30) + 1;
        var isDisabled = (i % 10 == 3) ? 1 : 0
        rate = rate + diff;
        postResponse.payload.gameRecords.id.push(i + 1);
        postResponse.payload.gameRecords.date.push("2025/05/01");
        postResponse.payload.gameRecords.rate.push(rate);
        postResponse.payload.gameRecords.stock.push(stock);
        postResponse.payload.gameRecords.fighterId.push(fighterId);
        postResponse.payload.gameRecords.isVip.push((rate < 1400) ? false : true);
        postResponse.payload.gameRecords.isDisabled.push(isDisabled);
      }
    }

    if (postRequest.toJsonObject().header == "upsert") {
      var gameRecord = postRequest.toJsonObject().payload.gameRecord;
      if (gameRecord.id == 0) {
        postResponse.payload.gameRecords.id.push(this._count);
        postResponse.payload.gameRecords.date.push(gameRecord.date);
        postResponse.payload.gameRecords.rate.push(gameRecord.rate);
        postResponse.payload.gameRecords.stock.push(gameRecord.stock);
        postResponse.payload.gameRecords.fighterId.push(gameRecord.fighterId);
        postResponse.payload.gameRecords.isVip.push(gameRecord.isVip);
        postResponse.payload.gameRecords.isDisabled.push(gameRecord.isDisabled);
      }
    }
  

    return postResponse;
  }
}