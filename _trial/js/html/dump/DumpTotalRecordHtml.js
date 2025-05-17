class DumpTotalRecordHtml {

  constructor(html_section) {
    this._html_section = html_section;
  }

  
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


  /**
   * @note   表示を更新する。
   * @param  {TotalRecord} totalRecord
   */
  update(totalRecord) {
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

    this._html_section.show();
  }
}
