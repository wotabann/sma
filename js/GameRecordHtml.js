class GameRecordHtml {
  constructor() {
  }

  // 各要素の取得
  static _getIdHtml()                 { return $("#register-game-record-id"); }
  static _getDateHtml()               { return $("#register-game-record-date"); }
  static _getRateHtml()               { return $("#register-game-record-rate"); }
  static _getStockHtml()              { return $("#register-game-record-stock"); }
  static _getFighterHtml()            { return $("#register-game-record-fighter"); }
  static _getRequestButtonHtml()      { return $("#register-request-button"); }
  static _getRequestDumpButtonHtml()  { return $("#register-request-dump-button"); }
  static _getResultHtml()             { return $("#register-request-result"); }

  // 各要素のセット
  static SetId(txt)        { this._getIdHtml().val(txt); }
  static SetDate(txt)      { this._getDateHtml().val(txt); }
  static SetRate(txt)      { this._getRateHtml().val(txt); }
  static SetStock(txt)     { this._getStockHtml().val(txt); }
  static SetFighter(txt)   { this._getFighterHtml().val(txt); }
  static SetResult(txt)    { this._getResultHtml().text(txt); }

  // 各要素のクリア
  static ClearRate()    { this._getRateHtml().val(""); }
  static ClearStock()   { this._getStockHtml().val(""); }
  static ClearFighter() { this._getFighterHtml().val(""); }
  static ClearId()      { this._getIdHtml().val(0); }


  /**
   * @note   登録ボタン押下時のイベントをセットする
   */
  static SetRequestButtonClickEvent(fnc) {
    this._getRequestButtonHtml().on("click", fnc);
  }


  /**
   * @note   登録＆取得ボタン押下時のイベントをセットする
   */
  static SetRequestDumpButtonClickEvent(fnc) {
    this._getRequestDumpButtonHtml().on("click", fnc);
  }


  /**
   * @note   登録ボタンを有効にする
   */
  static SetRequestButtonEnabled() {
    this._getRequestButtonHtml().prop("disabled", false);
    this._getRequestDumpButtonHtml().prop("disabled", false);
  }


  /**
   * @note   登録ボタンを無効にする
   */
  static SetRequestButtonDisabled() {
    this._getRequestButtonHtml().prop("disabled", true);
    this._getRequestDumpButtonHtml().prop("disabled", true);
  }


  /**
   * @note   Recordの入力値を取得する
   * @return {GameRecord}
   */
  static GetGameRecord() {
    var gameRecord = new GameRecord();
    gameRecord.Id         = this._getIdHtml().val();
    gameRecord.Date       = this._getDateHtml().val();
    gameRecord.Rate       = this._getRateHtml().val();
    gameRecord.Stock      = this._getStockHtml().val();
    gameRecord.Fighter    = this._getFighterHtml().val();
    gameRecord.CreateTime = 0;
    gameRecord.UpdateTime = 0;
    gameRecord.IsDeleted  = false;

    return gameRecord;
  }
}
