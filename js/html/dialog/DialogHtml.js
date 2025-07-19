class DialogHtml {

  constructor() {
    this._html_dialog = $("#dialog");
    this._dialogFighterRecordHtml = new DialogFighterRecordHtml();
    this._dialogDailyRecordHtml   = new DialogDailyRecordHtml();
    this._dialogGameRecordHtml    = new DialogGameRecordHtml();
    this._dialogRegisterHtml      = new DialogRegisterHtml();
    this._html_closeButton.on("click", () => { this.close() });
  }


  get _html_closeButton() { return $(this._html_dialog.find("#dialog-close-button")); }



  /**
   * @note 表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   */
  update(recordAnalyzer) {
    var gameRecords = recordAnalyzer.gameRecords;
    this._dialogGameRecordHtml.update(gameRecords);
  }


  /**
   * @note 日ごとの戦績ダイアログを表示する。
   * @param {DailyRecord} dailyRecord
   */
  openDailyRecordDialog(dailyRecord) {
    this._dialogDailyRecordHtml.update(dailyRecord);
    this._dialogGameRecordHtml.filterByDate(dailyRecord.date);

    this._hideAllSections();
    this._dialogDailyRecordHtml.show();
    this._dialogGameRecordHtml.show();

    this._html_dialog.get(0).showModal();
  }


  /**
   * @note 相手キャラ毎の戦績ダイアログを表示する。
   * @param {FighterRecord} fighterRecord
   */
  openFighterRecordDialog(fighterRecord) {
    this._dialogFighterRecordHtml.update(fighterRecord);
    this._dialogGameRecordHtml.filterByFighter(fighterRecord.fighterId);

    this._hideAllSections();
    this._dialogFighterRecordHtml.show();
    this._dialogGameRecordHtml.show();

    this._html_dialog.get(0).showModal();
  }


  /**
   * @note 戦績の修正ダイアログを表示する。
   * @param {GameRecord} gameRecord
   */
  openRegisterDialog(gameRecord) {
    this._dialogRegisterHtml.fromGameRecord(gameRecord);
    this._dialogRegisterHtml.registerResult = "";

    this._hideAllSections();
    this._dialogRegisterHtml.show();

    this._html_dialog.get(0).showModal();
  }


  /**
   * @note ダイアログを閉じる。
   */
  close() {
    this._html_dialog.get(0).close();
  }


  /**
   * @note 全てのセクションを非表示にする。
   */
  _hideAllSections() {
    this._dialogDailyRecordHtml.hide();
    this._dialogFighterRecordHtml.hide();
    this._dialogGameRecordHtml.hide();
    this._dialogRegisterHtml.hide();
  }

}
