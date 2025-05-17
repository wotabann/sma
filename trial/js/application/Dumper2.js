class Dumper2 {

  constructor() {
    var fighterListHtml = new FighterListHtml();

    this._loadingHtml     = new LoadingHtml();
    this._fighterListHtml = new FighterListHtml();
    this._accountHtml     = new AccountHtml($("#account"), fighterListHtml);
    this._dumpHtml        = new DumpHtml();
    this._registerer      = new Registerer(); // コイツの依存がイケてない..
  }


  /**
   * @note データ取得のメイン処理
   */
  async dump() {
    // 入力データの取得
    var account = this._accountHtml.toAccount();

    // 入力フォームのチェック
    var errorString = this._validateInputs();
    if (errorString != "") {
      return errorString;
    }



    return;
    var errorString = "";
    this._dumpHtml.disableDumpRequestButton();

    try {
      errorString = await this._dump();
    }
    catch(e) {
      alert(e.stack);
      errorString = "予期せぬエラーが発生しました。";
    }

    if (errorString != "") {
      alert(errorString);
    }
    this._dumpHtml.enableDumpRequestButton();
  }


  /**
   * @note   入力フォームのバリデーションを行う
   * @return {String}
   */
  _validateInputs() {
    var errorMessage = this._accountHtml.validateInputs();
    if (errorMessage != "") {
      throw new SmaError(errorMessage);
    }
  }


  /**
   * @note データ取得のメイン処理
   */
  async _dump() {
    var errorMessage;

    // 入力データの取得
    var account = this._accountHtml.toAccount();

    // 入力フォームのチェック
    this._validateInputs();

    // リクエストのポスト＆レスポンス取得
    var dumpPostResponse = await this._post(account);

    // レスポンスのエラーチェック
    if (dumpPostResponse == null) {
      return "サーバーとの通信中に予期せぬエラーが発生しました。";
    }
    if (dumpPostResponse.errorString != "") {
      return dumpPostResponse.errorString;
    }

    // 修正や削除時に不整合を防止するため、使用ファイター欄を無効にする
    this._accountHtml.disableFighter();

    // 結果を解析
    var recordAnalyzer = new RecordAnalyzer(dumpPostResponse.gameRecords);

    // 戦績を更新
    var gameRecordRowOnClick = this._registerer.gameRecordRowOnClick.bind(this._registerer);
    this._dumpHtml.update(recordAnalyzer, gameRecordRowOnClick);
    
    return "";
  }


  /**
   * @note   リクエストのポスト＆レスポンス取得
   * @param  {Account} account
   * @return {String}
   */
  async _post(account) {
    // リクエストをポスト
    this._loadingHtml.showLoading();
    var dumpPostRequest = new DumpPostRequest(account);
    var postResponse = await this._poster.post(dumpPostRequest.postRequest);
    this._loadingHtml.hideLoading();

    // レスポンスのエラーチェック
    if (postResponse == null) {
      return null;
    }

    // レスポンスをパース
    return new DumpPostResponse(postResponse);
  }

}
