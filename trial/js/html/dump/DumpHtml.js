class DumpHtml {

  constructor() {
    this._dumpRequestButtonHtml = new DumpRequestButtonHtml($("#dump-request-button"));
    this._dumpTotalRecordHtml   = new DumpTotalRecordHtml($("#dump-total-record"));
    this._dumpHistoryChartHtml  = new DumpHistoryChartHtml($("#dump-history-chart"));
    this._dumpGameRecordHtml    = new DumpGameRecordHtml($("#dump-game-record"), 20);
    this._dumpDailyRecordHtml   = new DumpDailyRecordHtml($("#dump-daily-record"), 10);
    this._dumpFighterRecordHtml = new DumpFighterRecordHtml($("#dump-fighter-record"));

    this._dialogHtml = new DialogHtml("#dialog");
  }


  /**
   * @note   表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   * @param  {Object}         gameRecordRowOnClick
   */
  update(recordAnalyzer, gameRecordRowOnClick) {
    var totalRecord = recordAnalyzer.totalRecord;
    var gameRecords = recordAnalyzer.gameRecords;
    var dailyRecords = recordAnalyzer.dailyRecords;
    var fighterRecords = recordAnalyzer.fighterRecords;
    var invalidGameRecordIds = recordAnalyzer.invalidGameRecordIds;

    // 基本情報
    this._dumpTotalRecordHtml.update(totalRecord);

    // チャート
    this._dumpHistoryChartHtml.update(gameRecords, dailyRecords);

    // 直近の戦績
    this._dumpGameRecordHtml.update(gameRecords, invalidGameRecordIds, gameRecordRowOnClick);

    // 日ごとの戦績
    this._dumpDailyRecordHtml.update(dailyRecords, this._dialogHtml.openDailyRecordDialog.bind(this._dialogHtml));

    // 相手キャラ毎の戦績
    this._dumpFighterRecordHtml.update(fighterRecords, this._dialogHtml.openFighterRecordDialog.bind(this._dialogHtml));

    // ダイアログ
    this._dialogHtml.update(recordAnalyzer);
  }


  disableDumpRequestButton() {
    this._dumpRequestButtonHtml.disable();
  }

  enableDumpRequestButton() {
    this._dumpRequestButtonHtml.enable();
  }

  addDumpRequestButtonOnClick(callback) {
    this._dumpRequestButtonHtml.addClickListener(callback);
  }
}
