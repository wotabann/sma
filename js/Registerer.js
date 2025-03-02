class Registerer {

  constructor() {
    this._poster          = new Poster();
    this._loadingHtml     = new LoadingHtml();
    this._fighterListHtml = new FighterListHtml();
    this._accountHtml     = new AccountHtml();
    this._registerHtml    = new RegisterHtml();
    this._dumpHtml        = new DumpHtml();
  }


  /**
   * @note 登録ボタン押下時のイベント
   * @param {Boolean} isDump
   */
  async insertUpdate(isDump) {
    var errorString = "";
    this._registerHtml.registerResult = "";
    this._registerHtml.disableRequestButtons();

    try {
      errorString = await this._insertUpdate(isDump);
    }
    catch(e) {
      errorString = "予期せぬエラーが発生しました。";
    }

    if (errorString != "") {
      this._registerHtml.registerResult = errorString;
      alert(errorString);
    }
    this._registerHtml.enableRequestButtons();
  }


  /**
   * @note 削除/復活リクエスト
   * @param {GameRecord} gameRecord
   * @param {Boolean}    isDelete
   */
  async deleteRestore(gameRecord, isDelete) {
    var errorString = "";
    this._registerHtml.disableRequestButtons();

    try {
      errorString = await this._deleteRestore(gameRecord, isDelete);
    }
    catch(e) {
      alert(e.stack);
      errorString = "予期せぬエラーが発生しました。";
    }

    if (errorString != "") {
      alert(errorString);
    }
    this._registerHtml.enableRequestButtons();
  }


  /**
   * @note 修正対象を対戦結果欄に反映
   * @param  {GameRecord} gameRecord
   * @return {String}
   */
  preUpdate(gameRecord) {
    this._registerHtml.fromGameRecord(gameRecord);
    $(window).scrollTop(0);
    this._alertPreUpdate();
    return true;
  }


  /**
   * @note  対戦履歴のクリックイベント
   * @param {GameRecord} gameRecord
   */
  async dumpHistoryOnClick(gameRecord) {
    var text = this._promptOperationSelect(gameRecord);
    switch (text) {
      case "修正":
        await this.preUpdate(gameRecord);
        break;
      case "削除":
        await this.deleteRestore(gameRecord, true);
        break;
      case "復活":
        await this.deleteRestore(gameRecord, false);
        break;
      case null:
        break;
      default:
        alert("未定義の操作のためキャンセルされました。");
    }
    return;
  }


  /**
   * @note 追加/更新リクエスト
   * @param  {Boolean} isDump
   * @return {String}
   */
  async _insertUpdate(isDump) {
    // 入力データの取得
    var account = this._accountHtml.toAccount();
    var gameRecord = this._registerHtml.toGameRecord();
    var operation = (gameRecord.id > 0) ? "Update" : "Insert";

    // 入力フォームのチェック
    var errorString = this._validateInputs();
    if (errorString != "") {
      return errorString;
    }

    // 確認ダイアログ
    if (!this._confirmInsertUpdate(gameRecord)) {
      return "";
    }

    // リクエストのポスト＆レスポンス取得
    var registerPostResponse = await this._post(account, gameRecord, operation, isDump);

    // レスポンスのエラーチェック
    if (registerPostResponse == null) {
      return "サーバーとの通信中に予期せぬエラーが発生しました。";
    }
    if (registerPostResponse.errorString != "") {
      return registerPostResponse.errorString;
    }

    // 入力フォームをクリア
    this._clearInputs();

    // 登録結果テキストを更新
    var gameRecordString = this._createGameRecordText(registerPostResponse.gameRecord);
    this._registerHtml.registerResult = gameRecordString;

    // データ取得時の更新
    if (isDump) {
      // 修正や削除時に不整合を防止するため、使用ファイター欄を無効にする
      this._accountHtml.disableFighter();

      // 戦績の更新
      var historyListOnClick = this.dumpHistoryOnClick.bind(this);
      this._dumpHtml.update(registerPostResponse.gameRecords, historyListOnClick);
    };

    // データ修正時は日付欄を最新にしておく
    if (operation == "Update") {
      this._registerHtml.date = Util.getToday();
    }

    return "";
  }


  /**
   * @note 削除/復活リクエスト
   * @param  {GameRecord} gameRecord
   * @param  {Boolean}    isDelete
   * @return {String}
   */
  async _deleteRestore(gameRecord, isDelete) {
    var isDump    = true;
    var operation = isDelete ? "Delete" : "Restore";

    // 確認ダイアログ
    if (!this._confirmDeleteRestore(gameRecord, isDelete)) {
      return;
    }

    // 入力データの取得
    var account = this._accountHtml.toAccount();

    // リクエストのポスト＆レスポンス取得
    var registerPostResponse = await this._post(account, gameRecord, operation, isDump);

    // レスポンスのエラーチェック
    if (registerPostResponse == null) {
      return "サーバーとの通信中に予期せぬエラーが発生しました。";
    }
    if (registerPostResponse.errorString != "") {
      return registerPostResponse.errorString;
    }

    // 戦績の更新
    var historyListOnClick = this.dumpHistoryOnClick.bind(this);
    this._dumpHtml.update(registerPostResponse.gameRecords, historyListOnClick);

    return "";
  }


  /**
   * @rnote  リクエストのポスト＆レスポンス取得
   * @param  {Account}    account
   * @param  {GameRecord} gameRecord
   * @param  {String}     operation
   * @param  {Boolean}    isDump
   * @return {String}
   */
  async _post(account, gameRecord, operation, isDump) {
    // リクエストをポスト
    this._loadingHtml.showLoading();
    var registerPostRequest = new RegisterPostRequest(account, gameRecord, operation, isDump);
    var postResponse = await this._poster.post(registerPostRequest.postRequest);
    this._loadingHtml.hideLoading();

    // レスポンスのエラーチェック
    if (postResponse == null) {
      return null;
    }

    // レスポンスをパース
    return new RegisterPostResponse(postResponse);
  }


  /**
   * @rnote  入力フォームのエラーチェック
   * @return {String}
   */
  _validateInputs() {
    var errorString;
    errorString = this._accountHtml.validateInputs();
    if (errorString != "") {
      return errorString;
    }
    errorString = this._registerHtml.validateInputs();
    if (errorString != "") {
      return errorString;
    }
    return "";
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
   * @note 対戦結果を1行テキストにする
   * @param  {GameRecord} gameRecord
   * @return {String}
   */
  _createGameRecordText(gameRecord) {
    var msg = "【";
    msg += gameRecord.date + ", ";
    msg += gameRecord.rate + ", ";
    msg += gameRecord.stock + ", ";
    msg += gameRecord.fighter + "】";
    return msg;
  }



  /****************************************************/
  /* ↓↓↓↓↓ 以下ダイアログ系 ↓↓↓↓↓
  /****************************************************/

  /**
   * @note Insert/Update時の確認ダイアログ
   * @param  {GameRecord} gameRecord
   * @return {String}
   */
  _confirmInsertUpdate(gameRecord) {
    var msg = "";
    msg += "下記の内容で登録します。\nよろしいですか？\n";
    msg += this._createGameRecordText(gameRecord);
    if (gameRecord.id > 0) {
      msg += "\n\n※※指定のIDで上書きされます※※";
    }
    else {
      if (!(this._registerHtml.isDateInRange())) {
        msg += "\n\n※※日付欄と現在時刻に乖離があります※※";
      }
    }
    return window.confirm(msg);
  }


  /**
   * @note Delete/Restore時の確認ダイアログ
   * @param  {GameRecord} gameRecord
   * @param  {Boolean}    isDelete
   * @return {Boolean}
   */
  _confirmDeleteRestore(gameRecord, isDelete) {
    var msg = "";
    if (isDelete) {
      msg += "下記の戦績を削除します。\n";
      msg += "本当によろしいですか？\n";
    }
    else {
      msg += "下記の戦績を復活させますか？\n";
    }
    msg += this._createGameRecordText(gameRecord);

    return window.confirm(msg);
  }


  /**
   * @note Update内容を入力フォームに反映した時のアラート
   * @param  {GameRecord} gameRecord
   * @param  {Boolean}    isDelete
   * @return {Boolean}
   */
  _alertPreUpdate() {
    var msg = "";
    msg += "対象を結果登録欄に反映しました。\n";
    msg += "内容を修正して再度登録してください。\n";
    msg += "\n";
    msg += "※※ 注意 ※※\n";
    msg += "取り消す場合はページをリロードしてください。\n";
    msg += "(編集対象のIDがクリアされないため)";
    alert(msg);
  }


  /**
   * @note Update内容を入力フォームに反映した時のアラート
   * @param  {GameRecord} gameRecord
   * @return {String}
   */
  _promptOperationSelect(gameRecord) {
    var msg = this._createGameRecordText(gameRecord) + "\n";
    msg += "実行したい操作を入力してください。\n";
    msg += "(\"修正\" or \"削除\" or \"復活\")";
    return prompt(msg);
  }

}
