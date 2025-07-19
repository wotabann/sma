class Registerer {

  constructor() {
    this._gameRecordDb = new GameRecordDb();
    this._accountHtml  = new AccountHtml();
    this._registerHtml = new RegisterHtml();
    this._dumpHtml     = new DumpHtml();
    this._dialogHtml   = new DialogHtml();
  }


  /**
   * @note データ登録のメイン処理
   * @param {boolean} isDump
   */
  async register(isDump) {
    Util.disableAllButtons();

    try {
      await this._register(isDump);
    }
    catch(e) {
      alert(e.message);
    }

    Util.enableAllButtons();
  }


  /**
   * @note データ登録のメイン処理
   * @param {boolean} isDump
   */
  async _register(isDump) {
    // 入力フォームのチェック
    this._validateInputs();

    // 入力内容を取得
    var account = this._accountHtml.toAccount();
    var gameRecord = this._registerHtml.toGameRecord();

    // 確認ダイアログ
    if (!this._confirm(gameRecord)) {
      return "";
    }

    // リクエストのポスト＆レスポンス取得
    var gameRecords = await this._gameRecordDb.upsert(account, gameRecord, isDump);

    // 結果を解析
    gameRecord = gameRecords.index(gameRecords.length - 1);
    var recordAnalyzer = new RecordAnalyzer(gameRecords);

    // 登録結果欄を更新
    this._registerHtml.registerResult = gameRecord.toLineString();

    // 入力フォームをクリア
    this._clearInputs();

    if (isDump) {
      // 修正時に不整合を防止するため、使用ファイター欄を無効にする
      this._accountHtml.disableFighter();

      // 戦績を更新
      this._dumpHtml.update(recordAnalyzer);
      this._dialogHtml.update(recordAnalyzer);
    }
  }


  /**
   * @note   入力フォームのバリデーションを行う
   * @return {String}
   */
  _validateInputs() {
    var errorString;
    errorString = this._accountHtml.validateInputs();
    if (errorString != "") {
      throw new SmaError(errorString);
    }
    errorString = this._registerHtml.validateInputs();
    if (errorString != "") {
      throw new SmaError(errorString);
    }
  }


  /**
   * @note 入力フォームをクリアする
   */
  _clearInputs() {
    this._registerHtml.id = 0;
    this._registerHtml.rate = "";
    this._registerHtml.stock = "";
    this._registerHtml.fighter = "";
  }


  /**
   * @note 確認ダイアログ
   * @param  {GameRecord} gameRecord
   * @return {String}
   */
  _confirm(gameRecord) {
    var msg = "";
    msg += "下記の内容で登録します。\nよろしいですか？\n";
    msg += gameRecord.toLineString();
    if (!(this._registerHtml.isDateInRange())) {
      msg += "\n\n※※日付欄と現在時刻に乖離があります※※";
    }
    return window.confirm(msg);
  }

}
