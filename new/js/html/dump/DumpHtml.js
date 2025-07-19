class DumpHtml {

  constructor() {
    this._dumpRequestButtonHtml = new DumpRequestButtonHtml();
    this._dumpTotalRecordHtml   = new DumpTotalRecordHtml();
    this._dumpHistoryChartHtml  = new DumpHistoryChartHtml();
    this._dumpGameRecordHtml    = new DumpGameRecordHtml();
    this._dumpDailyRecordHtml   = new DumpDailyRecordHtml();
    this._dumpFighterRecordHtml = new DumpFighterRecordHtml();
  }


  /**
   * @note   表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   */
  update(recordAnalyzer) {
    var totalRecord = recordAnalyzer.totalRecord;
    var gameRecords = recordAnalyzer.gameRecords;
    var dailyRecords = recordAnalyzer.dailyRecords;
    var fighterRecords = recordAnalyzer.fighterRecords;
    var invalidGameRecordIds = recordAnalyzer.invalidGameRecordIds;

    this._dumpTotalRecordHtml.update(totalRecord);
    this._dumpHistoryChartHtml.update(gameRecords, dailyRecords);
    this._dumpGameRecordHtml.update(gameRecords, invalidGameRecordIds);
    this._dumpDailyRecordHtml.update(dailyRecords);
    this._dumpFighterRecordHtml.update(fighterRecords);
  }

  addDumpRequestButtonOnClick(callback) {
    this._dumpRequestButtonHtml.addClickListener(callback);
  }
}
