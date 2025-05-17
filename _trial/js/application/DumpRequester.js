class DumpRequester {

  constructor() {
    this._poster = new Poster();
  }


  /**
   * @note リクエストの送信＆レスポンス受信
   * @param {Account} account
   * @return {DumpPostResponse}
   */
  async post(account) {
    // ポストするオブジェクトを作成
    var dumpPostRequest = new DumpPostRequest(account);

    // リクエストをポスト
    var postResponse = await this._poster.post(dumpPostRequest.postRequest);

    // レスポンスをパース
    var dumpPostResponse = new DumpPostResponse(postResponse);

    // レスポンスのエラーチェック
    if (dumpPostResponse.errorString != "") {
      throw new SmaError(errorMessage);
    }
  
    return dumpPostResponse;
  }


}
