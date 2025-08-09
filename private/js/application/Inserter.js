class Inserter {

  constructor() {
    this._gameRecordDb = new GameRecordDb();
    this._insertHtml = new InsertHtml();
  }


  /**
   * @note データ登録のメイン処理
   * @param {boolean} isDump
   */
  async insert(isDump) {
    Util.disableAllButtons();

    try {
      await this._insert(isDump);
    }
    catch(e) {
      alert(e.stack);
    }

    Util.enableAllButtons();
  }


  /**
   * @note データ登録のメイン処理
   * @param {boolean} isDump
   */
  async _insert(isDump) {
    // 入力フォームのチェック
    this._validateInputs();

    // 入力内容を取得
    var gameRecord = this._insertHtml.toGameRecord();

    // 確認ダイアログ
    if (!this._confirm(gameRecord)) {
      return "";
    }

    // リクエストのポスト＆レスポンス取得
    var gameRecords = await this._gameRecordDb.upsert(gameRecord, isDump);

    // 結果を解析
    gameRecord = gameRecords.index(gameRecords.length - 1);
  }


  /**
   * @note   入力フォームのバリデーションを行う
   * @return {String}
   */
  _validateInputs() {
    var errorString;
    errorString = this._insertHtml.validateInputs();
    if (errorString != "") {
      throw new SmaError(errorString);
    }
  }


  /**
   * @note 入力フォームをクリアする
   */
  _clearInputs() {
    this._insertHtml.clearInputs();
  }


  /**
   * @note 確認ダイアログ
   * @param  {GameRecord} gameRecord
   * @return {String}
   */
  _confirm(gameRecord) {
    var msg = "";
    msg += "下記の内容で登録します。\nよろしいですか？\n";
    msg += gameRecord.toString();
    if (!(this._insertHtml.isDateInRange())) {
      msg += "\n\n※※日付欄と現在時刻に乖離があります※※";
    }
    return window.confirm(msg);
  }

}
