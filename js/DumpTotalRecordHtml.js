class DumpTotalRecordHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getWrapperHtml()     { return $("#dump-total-record-wrapper"); }
  static _getRateHtml()      { return $("#dump-total-record-rate"); }
  static _getMaxRateHtml()   { return $("#dump-total-record-max-rate"); }
  static _getMinRateHtml()   { return $("#dump-total-record-min-rate"); }
  static _getGameCountHtml() { return $("#dump-total-record-game-count"); }
  static _getMaxWinHtml()    { return $("#dump-total-record-max-win"); }
  static _getMaxLoseHtml()   { return $("#dump-total-record-max-lose"); }
  static _getWinRateHtml()   { return $("#dump-total-record-win-rate"); }


  /**
   * @note   表示を更新する。
   * @param  {TotalRecord} totalRecord
   */
  static Update(totalRecord) {
    var winRate = Math.floor(totalRecord.WinRate() * 100) + "%";

    this._getRateHtml().text(totalRecord.Rate + "万");
    this._getMaxRateHtml().text(totalRecord.MaxRate + "万");
    this._getMinRateHtml().text(totalRecord.MinRate + "万");
    this._getGameCountHtml().text(totalRecord.GameCount + "回");
    this._getMaxWinHtml().text(totalRecord.MaxWin + "回");
    this._getMaxLoseHtml().text(totalRecord.MaxLose + "回");
    this._getWinRateHtml().text(winRate);

    this._getWrapperHtml().show();
  }
}
