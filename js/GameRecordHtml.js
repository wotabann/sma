class GameRecordHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getDateObject()    { return $("#register-game-record-date"); }
  static _getRateObject()    { return $("#register-game-record-rate"); }
  static _getStockObject()   { return $("#register-game-record-stock"); }
  static _getFighterObject() { return $("#register-game-record-fighter"); }
  static _getButtonObject()  { return $("#register-game-record-button"); }
  static _getResultObject()  { return $("#register-game-record-result"); }

  // 各要素のセット
  static SetDate(txt)    { this._getDateObject().val(txt); }
  static SetRate(txt)    { this._getRateObject().val(txt); }
  static SetStock(txt)   { this._getStockObject().val(txt); }
  static SetFighter(txt) { this._getFighterObject().val(txt); }
  static SetResult(txt)  { this._getResultObject().text(txt); }

  // 各要素のクリア
  static ClearRate()    { this._getRateObject().val(""); }
  static ClearStock()   { this._getStockObject().val(""); }
  static ClearFighter() { this._getFighterObject().val(""); }


  /**
   * @note   登録ボタン押下時のイベントをセットする
   */
  static SetRegisterButtonClickEvent(fnc) {
    this._getButtonObject().on("click", fnc);
  }


  /**
   * @note   登録ボタンを有効にする
   */
  static SetRegisterButtonEnabled() {
    this._getButtonObject().prop("disabled", false);
  }


  /**
   * @note   登録ボタンを無効にする
   */
  static SetRegisterButtonDisabled() {
    this._getButtonObject().prop("disabled", true);
  }


  /**
   * @note   Recordの入力値を取得する
   * @return {GameRecord}
   */
  static GetGameRecord() {
    var gameRecord = new GameRecord();
    gameRecord.Date    = this._getDateObject().val();
    gameRecord.Rate    = this._getRateObject().val();
    gameRecord.Stock   = this._getStockObject().val();
    gameRecord.Fighter = this._getFighterObject().val();
    return gameRecord;
  }
}
