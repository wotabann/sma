class DumpHtml {

  constructor() {
    this._dumpRequestButtonHtml    = new DumpRequestButtonHtml();
    this._dumpTotalRecordHtml      = new DumpTotalRecordHtml();
    this._dumpHistoryChartHtml     = new DumpHistoryChartHtml();
    this._dumpHistoryListHtml      = new DumpHistoryListHtml();
    this._dumpDailyHistoryListHtml = new DumpDailyHistoryListHtml();
    this._dumpFighterRecordHtml    = new DumpFighterRecordHtml();
  }


  /**
   * @note   表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   * @param  {Object}         historyListOnClick
   */
  update(recordAnalyzer, historyListOnClick) {
    this._dumpTotalRecordHtml.update(recordAnalyzer);

    this._dumpHistoryChartHtml.update(recordAnalyzer);
    this._dumpHistoryListHtml.update(recordAnalyzer, historyListOnClick);

    this._dumpDailyHistoryListHtml.update(recordAnalyzer);

    this._dumpFighterRecordHtml.update(recordAnalyzer);
  }

  disableDumpRequestButton() {
    this._dumpRequestButtonHtml.disableDumpRequestButton();
  }
  enableDumpRequestButton() {
    this._dumpRequestButtonHtml.enableDumpRequestButton();
  }
  addDumpRequestButtonOnClick(callback) {
    this._dumpRequestButtonHtml.addDumpRequestButtonOnClick(callback);
  }
}
