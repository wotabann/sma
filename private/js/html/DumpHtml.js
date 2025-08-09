class DumpHtml {

  constructor() {
    this._dumpButtonHtml        = new DumpButtonHtml();
    this._dumpGameRecordHtml    = new DumpGameRecordHtml();
  }


  /**
   * @note   表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   */
  update(recordAnalyzer) {
    var gameRecords = recordAnalyzer.gameRecords;

    this._dumpGameRecordHtml.update(gameRecords);
  }

  addDumpButtonOnClick(callback) {
    this._dumpButtonHtml.addClickListener(callback);
  }
}
