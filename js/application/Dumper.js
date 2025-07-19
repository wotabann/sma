class Dumper {

  constructor() {
    this._gameRecordDb = new GameRecordDb();
    this._accountHtml  = new AccountHtml();
    this._dumpHtml     = new DumpHtml();
    this._dialogHtml   = new DialogHtml();

    //this._dumpHtml.addDumpRequestButtonOnClick(this.dump());
  }


  /**
   * @note データ取得のメイン処理
   */
  async dump() {
    Util.disableAllButtons();
    try {
      await this._dump();
    }
    catch(e) {
      alert(e);
    }
    Util.enableAllButtons();
  }


  /**
   * @note データ取得のメイン処理
   */
  async _dump() {
    // 入力フォームのチェック
    this._validateInputs();

    // 修正時に不整合を防止するため、使用ファイター欄を無効にする
    this._accountHtml.disableFighter();

    // リクエストのポスト＆レスポンス取得
    var account = this._accountHtml.toAccount();
    var gameRecords = await this._gameRecordDb.select(account);

    // 結果を解析
    var recordAnalyzer = new RecordAnalyzer(gameRecords);

    // 戦績を更新
    this._dumpHtml.update(recordAnalyzer);
    this._dialogHtml.update(recordAnalyzer);
  }


  /**
   * @note   入力フォームのバリデーションを行う
   * @return {String}
   */
  _validateInputs() {
    var errorString = this._accountHtml.validateInputs();
    if (errorString != "") {
      throw new SmaError(errorString);
    }
  }

}
