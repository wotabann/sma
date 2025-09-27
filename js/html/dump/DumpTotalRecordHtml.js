class DumpTotalRecordHtml {

  constructor() {
  }

  get _html_section()   { return $("#dump-total-record"); }
  get _html_head()      { return $(this._html_section).children(".dump-section-head"); }
  get _html_body()      { return $(this._html_section).children(".dump-section-body"); }

  get _html_table()     { return $(this._html_body).find(".dump-two-columns"); }

  get _html_rate()      { return $(this._html_table.find(".rate")); }
  get _html_maxRate()   { return $(this._html_table.find(".max-rate")); }
  get _html_minRate()   { return $(this._html_table.find(".min-rate")); }
  get _html_lastDate()  { return $(this._html_table.find(".last-date")); }
  get _html_gameCount() { return $(this._html_table.find(".game-count")); }
  get _html_maxWin()    { return $(this._html_table.find(".max-win")); }
  get _html_maxLose()   { return $(this._html_table.find(".max-lose")); }
  get _html_winRate()   { return $(this._html_table.find(".win-rate")); }
  get _html_rank()      { return $(this._html_body.find(".dump-rank")); }


  /**
   * @note   表示を更新する。
   * @param  {TotalRecord} totalRecord
   */
  update(totalRecord) {
    // レコードがなければ何もしない
    if (totalRecord.gameCount == 0) {
      this._html_section.hide();
      return;
    }

    var winRate = Math.floor(totalRecord.winRate * 100) + "％";
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

    if (totalRecord.rankNumber == "-") {
      this._html_rank.hide();
    }
    else {
      this._html_rank.show();
      this._html_rank.text("【現在の段位】" + totalRecord.rankString);
    }
  
    this._html_section.show();
  }
}
