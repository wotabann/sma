class DialogHtml {

  constructor(dialogId) {
    this._dialogId = dialogId;
    this._html_dialog = $(dialogId);
    this._dialogFighterRecordHtml = new DialogFighterRecordHtml($("#dialog-fighter-record"));
    this._dialogDailyRecordHtml   = new DialogDailyRecordHtml($("#dialog-daily-record"));
    this._dialogGameRecordHtml    = new DialogGameRecordHtml($("#dialog-game-record"));
  }


  get _html_closeButton() { return $(this._html_dialog.find("button")); }



  /**
   * @note   表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   */
  update(recordAnalyzer) {
    var gameRecords = recordAnalyzer.gameRecords;
    var dailyRecords = recordAnalyzer.dailyRecords;
    var fighterRecords = recordAnalyzer.fighterRecords;
    this._dialogGameRecordHtml.update(gameRecords);

    this._html_closeButton.on("click", () => { this._closeDialog() });
  }


  /**
   * @note   closeボタン王カジノイベント
   */
  _closeDialog() {
    this._html_dialog.get(0).close();
  }


  /**
   * @note   相手キャラ毎の戦績クリック時のイベント
   * @param  {FighterRecord} fighterRecord
   */
  openFighterRecordDialog(fighterRecord) {
    // 退避
    var dialog = this._html_dialog;
    var dialogFighterRecordHtml = this._dialogFighterRecordHtml;
    var dialogDailyRecordHtml = this._dialogDailyRecordHtml;
    var dialogGameRecordHtml = this._dialogGameRecordHtml;

    // 設定値
    var winRate = Math.floor(fighterRecord.winRate * 100) + "％";
    var stockRate = Math.floor(fighterRecord.stockRate * 100) / 100;

    // 基本情報の設定
    dialogFighterRecordHtml.head = fighterRecord.fighter + " の基本情報";
    dialogFighterRecordHtml.gameCount = fighterRecord.gameCount + "回";
    dialogFighterRecordHtml.winCount  = fighterRecord.winCount + "回";
    dialogFighterRecordHtml.loseCount = fighterRecord.loseCount + "回";
    dialogFighterRecordHtml.winRate   = winRate;
    dialogFighterRecordHtml.winOver   = fighterRecord.winOver + "回";
    dialogFighterRecordHtml.stockRate = stockRate;

    // 戦績の設定
    dialogGameRecordHtml.head = fighterRecord.fighter + " との戦績";
    dialogGameRecordHtml.filterByFighter(fighterRecord.fighter);

    // ダイアログを表示
    dialogFighterRecordHtml.show();
    dialogDailyRecordHtml.hide();
    dialogGameRecordHtml.show();
    dialog.get(0).showModal();
  }


  /**
   * @note   相手キャラ毎の戦績クリック時のイベント
   * @param  {DailyRecord} dailyRecord
   */
  openDailyRecordDialog(dailyRecord) {
    // 退避
    var dialog = this._html_dialog;
    var dialogFighterRecordHtml = this._dialogFighterRecordHtml;
    var dialogDailyRecordHtml = this._dialogDailyRecordHtml;
    var dialogGameRecordHtml = this._dialogGameRecordHtml;

    // 設定値
    var winRate = Math.floor(dailyRecord.winRate * 100) + "％";

    // 基本情報の設定
    dialogDailyRecordHtml.head = dailyRecord.date + " の基本情報";
    dialogDailyRecordHtml.gameCount = dailyRecord.gameCount + "回";
    dialogDailyRecordHtml.winCount  = dailyRecord.winCount + "回";
    dialogDailyRecordHtml.loseCount = dailyRecord.loseCount + "回";
    dialogDailyRecordHtml.winRate   = winRate;
    dialogDailyRecordHtml.winOver   = dailyRecord.winOver + "回";
    dialogDailyRecordHtml.rate      = dailyRecord.rate + "万";

    // 戦績の設定
    dialogGameRecordHtml.head = dailyRecord.date + " の全戦績";
    dialogGameRecordHtml.filterByDate(dailyRecord.date);

    // ダイアログを表示
    dialogFighterRecordHtml.hide();
    dialogDailyRecordHtml.show();
    dialogGameRecordHtml.show();
    dialog.get(0).showModal();
  }

}
