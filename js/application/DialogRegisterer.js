class DialogRegisterer {

  constructor() {
    this._gameRecordDb = new GameRecordDb();
    this._accountHtml  = new AccountHtml();
    this._registerHtml = new DialogRegisterHtml();
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
    gameRecord = gameRecords.findById(gameRecord.id);
    var recordAnalyzer = new RecordAnalyzer(gameRecords);

    // 登録結果欄を更新
    this._registerHtml.registerResult = gameRecord.toLineString();

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
   * @note 確認ダイアログ
   * @param  {GameRecord} gameRecord
   * @return {String}
   */
  _confirm(gameRecord) {
    var msg = "";
    msg += "下記の内容で上書き登録します。\nよろしいですか？\n";
    msg += gameRecord.toLineString();
    if (gameRecord.isDisabled != 0) {
      msg += "\n\n※データを無効化させます※";
    }
    return window.confirm(msg);
  }

}
