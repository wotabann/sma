class DumpTotalRecordHtml {

  constructor() {
  }

  
  get _html_wrapper()   { return $("#dump-total-record-wrapper"); }
  get _html_rate()      { return $("#dump-total-record-rate"); }
  get _html_maxRate()   { return $("#dump-total-record-max-rate"); }
  get _html_minRate()   { return $("#dump-total-record-min-rate"); }
  get _html_lastDate()  { return $("#dump-total-record-last-date"); }
  get _html_gameCount() { return $("#dump-total-record-game-count"); }
  get _html_maxWin()    { return $("#dump-total-record-max-win"); }
  get _html_maxLose()   { return $("#dump-total-record-max-lose"); }
  get _html_winRate()   { return $("#dump-total-record-win-rate"); }


  /**
   * @note   表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   */
  update(recordAnalyzer) {
    var totalRecord = recordAnalyzer.totalRecord;

    var winRate = Math.floor(totalRecord.winRate * 100) + "%";
    var lastDate_m = Number(totalRecord.lastDate.substr(5, 2));
    var lastDate_d = Number(totalRecord.lastDate.substr(8, 2));

    this._html_rate.text(totalRecord.rate + "万");
    this._html_maxRate.text(totalRecord.maxRate + "万");
    this._html_minRate.text(totalRecord.minRate + "万");
    this._html_lastDate.text(lastDate_m + "/" + lastDate_d);
    this._html_gameCount.text(totalRecord.gameCount + "回");
    this._html_maxWin.text(totalRecord.maxWin + "回");
    this._html_maxLose.text(totalRecord.maxLose + "回");
    this._html_winRate.text(winRate);

    this._html_wrapper.show();
  }
}
