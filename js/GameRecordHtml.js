class GameRecordHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getIdHtml()      { return $("#register-game-record-id"); }
  static _getDateHtml()    { return $("#register-game-record-date"); }
  static _getRateHtml()    { return $("#register-game-record-rate"); }
  static _getStockHtml()   { return $("#register-game-record-stock"); }
  static _getFighterHtml() { return $("#register-game-record-fighter"); }
  static _getButtonHtml()  { return $("#register-request-button"); }
  static _getResultHtml()  { return $("#register-request-result"); }

  // 各要素のセット
  static SetId(txt)      { this._getIdHtml().val(txt); }
  static SetDate(txt)    { this._getDateHtml().val(txt); }
  static SetRate(txt)    { this._getRateHtml().val(txt); }
  static SetStock(txt)   { this._getStockHtml().val(txt); }
  static SetFighter(txt) { this._getFighterHtml().val(txt); }
  static SetResult(txt)  { this._getResultHtml().text(txt); }

  // 各要素のクリア
  static ClearRate()    { this._getRateHtml().val(""); }
  static ClearStock()   { this._getStockHtml().val(""); }
  static ClearFighter() { this._getFighterHtml().val(""); }
  static ClearId()      { this._getIdHtml().val(0); }


  /**
   * @note   登録ボタン押下時のイベントをセットする
   */
  static SetRequestButtonClickEvent(fnc) {
    this._getButtonHtml().on("click", fnc);
  }


  /**
   * @note   登録ボタンを有効にする
   */
  static SetRequestButtonEnabled() {
    this._getButtonHtml().prop("disabled", false);
  }


  /**
   * @note   登録ボタンを無効にする
   */
  static SetRequestButtonDisabled() {
    this._getButtonHtml().prop("disabled", true);
  }


  /**
   * @note   Recordの入力値を取得する
   * @return {GameRecord}
   */
  static GetGameRecord() {
    var gameRecord = new GameRecord();
    gameRecord.Id      = this._getIdHtml().val();
    gameRecord.Date    = this._getDateHtml().val();
    gameRecord.Rate    = this._getRateHtml().val();
    gameRecord.Stock   = this._getStockHtml().val();
    gameRecord.Fighter = this._getFighterHtml().val();

    var d = new Date();
    var t = d.getTime();
    gameRecord.CreateTime = t;
    gameRecord.UpdateTime = t;
    gameRecord.IsDeleted  = false;

    return gameRecord;
  }
}
