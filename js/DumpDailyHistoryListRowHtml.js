class DumpDailyHistoryListRowHtml {

  constructor(html_listRow) {
    this._html_listRow = html_listRow;
  }


  get _html_date()       { return this._html_listRow.children(".date"); }
  get _html_rate()       { return this._html_listRow.children(".rate"); }
  get _html_gameCount()  { return this._html_listRow.children(".game-count"); }
  get _html_winOver()    { return this._html_listRow.children(".win-over"); }

  
  /**
   * @note 表示を更新する。
   * @param  {DailyRecord} dailyRecord
   */
  update(dailyRecord) {
    this._fromDailyRecord(dailyRecord);
    this._setFont(dailyRecord);
  }


  /**
   * @note DailyRecordを行の内容に反映する。
   * @param {DailyRecord} dailyRecord
   */
  _fromDailyRecord(dailyRecord) {
    // 設定値
    var date = dailyRecord.date.substr(5, 5);

    // 各要素の表示を更新
    this._html_date.text(date);
    this._html_rate.text(dailyRecord.lastRate + "万");
    this._html_gameCount.text(dailyRecord.gameCount + "回");
    this._html_winOver.text(dailyRecord.winOver + "回");
  }


  /**
   * @note フォント設定
   * @param {DailyRecord} dailyRecord
   */
  _setFont(dailyRecord) {
    // 勝越数に応じてフォントを設定
    if (dailyRecord.winOver > 0) {
      this._html_listRow.addClass("positive-font");
    }
    else {
      if (dailyRecord.winOver < 0) {
        this._html_listRow.addClass("negative-font");
      }
    }
  }

}
