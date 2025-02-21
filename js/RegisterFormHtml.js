class RegisterFormHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getFighterListObject()               { return $("#fighter-list"); }
  static _getRegisterAccountUserNameObject()   { return $("#register-account-username"); }
  static _getRegisterAccountFighterObject()    { return $("#register-account-fighter"); }
  static _getRegisterGameRecordDateObject()    { return $("#register-game-record-date"); }
  static _getRegisterGameRecordRateObject()    { return $("#register-game-record-rate"); }
  static _getRegisterGameRecordStockObject()   { return $("#register-game-record-stock"); }
  static _getRegisterGameRecordFighterObject() { return $("#register-game-record-fighter"); }
  static _getRegisterGameRecordButtonObject()  { return $("#register-game-record-button"); }
  static _getRegisterGameRecordResultObject()  { return $("#register-game-record-result"); }

  // 各要素のセット
  static SetAccountUserName(txt) { this._getRegisterAccountUserNameObject().val(txt); }
  static SetAccountFighter(txt)  { this._getRegisterAccountFighterObject().val(txt); }
  static SetGameRecordDate(txt)  { this._getRegisterGameRecordDateObject().val(txt); }
  static SetRegisterResult(txt)  { this._getRegisterGameRecordResultObject().text(txt); }

  // 各要素のクリア
  static ClearGameRecordRate()    { this._getRegisterGameRecordRateObject().val(""); }
  static ClearGameRecordStock()   { this._getRegisterGameRecordStockObject().val(""); }
  static ClearGameRecordFighter() { this._getRegisterGameRecordFighterObject().val(""); }


  /**
   * @note   登録ボタン押下時のイベントをセットする
   */
  static SetRegisterButtonClickEvent(fnc) {
    this._getRegisterGameRecordButtonObject().on("click", fnc);
  }


  /**
   * @note   登録ボタンを有効にする
   */
  static SetRegisterButtonEnabled() {
    this._getRegisterGameRecordButtonObject().prop("disabled", false);
  }


  /**
   * @note   登録ボタンを無効にする
   */
  static SetRegisterButtonDisabled() {
    this._getRegisterGameRecordButtonObject().prop("disabled", true);
  }


  /**
   * @note   Accountの入力値を取得する
   * @return {Account}
   */
  static GetAccount() {
    var account = new Account();
    account.UserName = this._getRegisterAccountUserNameObject().val();
    account.Fighter = this._getRegisterAccountFighterObject().val();
    return account;
  }


  /**
   * @note   Recordの入力値を取得する
   * @return {GameRecord}
   */
  static GetGameRecord() {
    var gameRecord = new GameRecord();
    gameRecord.Date    = this._getRegisterGameRecordDateObject().val();
    gameRecord.Rate    = this._getRegisterGameRecordRateObject().val();
    gameRecord.Stock   = this._getRegisterGameRecordStockObject().val();
    gameRecord.Fighter = this._getRegisterGameRecordFighterObject().val();
    return gameRecord;
  }


  /**
   * @note   入力フォームのバリデーションを行う
   * @return {String}
   */
  static ValidateInputs() {
    var obj;
    var pattern;
    var matchResult;

    // アカウント
    obj = this._getRegisterAccountUserNameObject();
    pattern = "^.+$";
    matchResult = obj.val().match(pattern);
    if (matchResult == null) {
      return "アカウント名が不正です。";
    }

    // 使用ファイター
    obj = this._getRegisterAccountFighterObject();
    matchResult = this._getFighterListObject().children("option").filter(function(index){
      return $(this).val() === obj.val()
    });
    if (matchResult.val() == undefined) {
      return "使用ファイターが不正です。";
    }

    // 日付
    obj = this._getRegisterGameRecordDateObject();
    pattern = "^202[5-9]-[0-9][0-9]-[0-3][0-9]$";
    matchResult = obj.val().match(pattern);
    if (matchResult == null) {
      return "日付の形式が不正です。";
    }

    // 戦闘力
    obj = this._getRegisterGameRecordRateObject();
    pattern = "^[0-9]{3,4}$";
    matchResult = obj.val().match(pattern);
    if (matchResult == null) {
      return "戦闘力が不正です。";
    }

    // ストック差
    obj = this._getRegisterGameRecordStockObject();
    pattern = "^[\-]{0,1}[0-5]$";
    matchResult = obj.val().match(pattern);
    if (matchResult == null) {
      return "ストック差が不正です。";
    }

    // 相手ファイター
    obj = this._getRegisterGameRecordFighterObject();
    matchResult = this._getFighterListObject().children("option").filter(function(index){
      return $(this).val() === obj.val()
    });
    if (matchResult.val() == undefined) {
      return "相手ファイターが不正です。";
    }

    return "";
  }
}
