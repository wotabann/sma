class DumpHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getRequestButtonObject()  { return $("#dump-request-button"); }

  // 各要素のセット

  // 各要素のクリア
  static ClearRate()    { this._getRateObject().val(""); }
  static ClearStock()   { this._getStockObject().val(""); }
  static ClearFighter() { this._getFighterObject().val(""); }


  /**
   * @note   ボタン押下時のイベントをセットする
   */
  static SetRequestButtonClickEvent(fnc) {
    this._getRequestButtonObject().on("click", fnc);
  }


  /**
   * @note   ボタンを有効にする
   */
  static SetRequestButtonEnabled() {
    this._getRequestButtonObject().prop("disabled", false);
  }


  /**
   * @note   ボタンを無効にする
   */
  static SetRequestButtonDisabled() {
    this._getRequestButtonObject().prop("disabled", true);
  }

}
