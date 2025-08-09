class Dumper {

  constructor() {
    this._gameRecordDb = new GameRecordDb();
    this._dumpHtml     = new DumpHtml();
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
      alert(e.stack);
    }
    Util.enableAllButtons();
  }


  /**
   * @note データ取得のメイン処理
   */
  async _dump() {
    // 入力フォームのチェック
    this._validateInputs();

    // リクエストのポスト＆レスポンス取得
    var gameRecords = await this._gameRecordDb.select();

    // 結果を解析
    var recordAnalyzer = new RecordAnalyzer(gameRecords);

    // 戦績を更新
    this._dumpHtml.update(recordAnalyzer);
  }


  /**
   * @note   入力フォームのバリデーションを行う
   * @return {String}
   */
  _validateInputs() {
  }

}
