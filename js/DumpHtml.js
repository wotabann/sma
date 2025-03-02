class DumpHtml {

  constructor() {
    this._dumpRequestButtonHtml = new DumpRequestButtonHtml();
    this._dumpTotalRecordHtml   = new DumpTotalRecordHtml();
    this._dumpHistoryChartHtml  = new DumpHistoryChartHtml();
    this._dumpHistoryListHtml   = new DumpHistoryListHtml();
    this._dumpFighterRecordHtml = new DumpFighterRecordHtml();
  }


  /**
   * @note   表示を更新する。
   * @param  {GameRecords} gameRecords
   */
  update(gameRecords, historyListOnClick) {
    // 結果を解析
    var recordAnalyzer = new RecordAnalyzer(gameRecords);

    // 集計結果を更新
    this._dumpTotalRecordHtml.update(recordAnalyzer.totalRecord);

    // 対戦履歴を更新
    this._dumpHistoryChartHtml.update(gameRecords);
    this._dumpHistoryListHtml.update(gameRecords, historyListOnClick);

    // 相手キャラ毎の戦績を更新
    this._dumpFighterRecordHtml.update(recordAnalyzer.fighterRecords);
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
