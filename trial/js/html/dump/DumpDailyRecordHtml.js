class DumpDailyRecordHtml {

  constructor(html_section, showLimit) {
    this._showLimit = showLimit;
    this._html_section = html_section;
  }


  get _html_head() { return $(this._html_section).children(".dump-section-head"); }
  get _html_body() { return $(this._html_section).children(".dump-section-body"); }

  get _html_moreButton() { return $(this._html_body.children(".dump-table-more-button")); }
  get _html_lessButton() { return $(this._html_body.children(".dump-table-less-button")); }
  
  get _html_table() { return $(this._html_body.find("table")); }
  get _html_tbody() { return $(this._html_table.children("tbody")); }
  get _html_trs()   { return $(this._html_tbody.children("tr")); }

  _html_td_date(html_tr)       { return html_tr.children(".date"); }
  _html_td_rate(html_tr)       { return html_tr.children(".rate"); }
  _html_td_gameCount(html_tr)  { return html_tr.children(".game-count"); }
  _html_td_winOver(html_tr)    { return html_tr.children(".win-over"); }
  _html_td_winCount(html_tr)   { return html_tr.children(".win-count"); }
  _html_td_loseCount(html_tr)  { return html_tr.children(".lose-count"); }
  _html_td_minRate(html_tr)    { return html_tr.children(".min-rate"); }
  _html_td_maxRate(html_tr)    { return html_tr.children(".max-rate"); }
  _html_td_totalRate(html_tr)  { return html_tr.children(".total-rate"); }
  _html_td_totalStock(html_tr) { return html_tr.children(".total-stock"); }


  /**
   * @note   表示を更新する。
   * @param  {DailyRecords} dailyRecords
   * @param  {Object} rowClickListener
   */
  update(dailyRecords, rowClickListener) {
    // テーブル更新
    this._clearTable();
    this._updateTable(dailyRecords, rowClickListener);
    this._limit(this._showLimit);

    // More/Lessボタン設定
    this._html_moreButton.on("click", () => { this._more(); });
    this._html_lessButton.on("click", () => { this._less(); });
    if (dailyRecords.length > this._showLimit) {
      this._html_moreButton.show();
    }
    else {
      this._html_moreButton.hide();
    }

    // セクション表示
    this._html_section.show();
  }


  /**
   * @note テーブルをクリアする。
   */
  _clearTable() {
    var html_trs = this._html_trs;
    for (let i = 1; i < html_trs.length; i++) {
      $(html_trs[i]).remove();
    }
    $(html_trs[0]).off("click");
  }


  /**
   * @note テーブルを更新する。
   * @param {dailyRecords} dailyRecords
   * @param {Object} rowClickListener
   */
  _updateTable(dailyRecords, rowClickListener) {
    var html_tr_head = $(this._html_trs[0]);
    var length = dailyRecords.length;

    for (let i = (length - 1); i >= 0; i--) {
      var dailyRecord = dailyRecords.index(i);
      var html_tr = html_tr_head.clone().appendTo(this._html_table);

      this._setDailyRecordToRow(html_tr, dailyRecord);
      this._updateRowClickListener(html_tr, rowClickListener);
      this._updateRowStyle(html_tr, dailyRecord);
    }

    html_tr_head.remove();
  }

  
  /**
   * @note 行のクリックイベントを設定する。nullなら削除。
   * @param {Object} html_tr
   * @param {Object} callback
   */
  _updateRowClickListener(html_tr, callback) {
    if (callback == null) {
      html_tr.off("click");
    }
    else {
      var arg = {
        callback: callback,
        dailyRecord: this._getDailyRecordFromRow(html_tr)
      };
      var fnc = function(e) {
        e.data.callback(e.data.dailyRecord);
      };
      html_tr.on("click", arg, fnc);
    }
  }


  /**
   * @note 行のスタイルを更新する。
   * @param {Object} html_tr
   * @param {DailyRecord} dailyRecord
   */
  _updateRowStyle(html_tr, dailyRecord) {
    html_tr.removeClass("positive-font");
    html_tr.removeClass("negative-font");

    if (dailyRecord.winOver > 0) {
      html_tr.addClass("positive-font");
    }
    else {
      if (dailyRecord.winOver < 0) {
        html_tr.addClass("negative-font");
      }
    }
  }


  /**
   * @note DailyRecordを行の内容に反映する。
   * @param {Object} html_tr
   * @param {DailyRecord} dailyRecord
   */
  _setDailyRecordToRow(html_tr, dailyRecord) {
    // 各要素の表示を更新
    this._html_td_date(html_tr).text(dailyRecord.date.substr(5, 5));
    this._html_td_rate(html_tr).text(dailyRecord.rate + "万");
    this._html_td_gameCount(html_tr).text(dailyRecord.gameCount + "回");
    this._html_td_winOver(html_tr).text(dailyRecord.winOver + "回");
    this._html_td_winCount(html_tr).text(dailyRecord.winCount + "回");
    this._html_td_loseCount(html_tr).text(dailyRecord.loseCount + "回");
    this._html_td_minRate(html_tr).text(dailyRecord.minRate + "万");
    this._html_td_maxRate(html_tr).text(dailyRecord.maxRate + "万");
    this._html_td_totalRate(html_tr).text(dailyRecord.totalRate + "万");
    this._html_td_totalStock(html_tr).text(dailyRecord.totalStock);

    // 処理用に生データを作成
    this._html_td_date(html_tr).data("sort-value", dailyRecord.date);
    this._html_td_rate(html_tr).data("sort-value", dailyRecord.rate);
    this._html_td_gameCount(html_tr).data("sort-value", dailyRecord.gameCount);
    this._html_td_winOver(html_tr).data("sort-value", dailyRecord.winOver);
    this._html_td_winCount(html_tr).data("sort-value", dailyRecord.winCount);
    this._html_td_loseCount(html_tr).data("sort-value", dailyRecord.loseCount);
    this._html_td_minRate(html_tr).data("sort-value", dailyRecord.minRate);
    this._html_td_maxRate(html_tr).data("sort-value", dailyRecord.maxRate);
    this._html_td_totalRate(html_tr).data("sort-value", dailyRecord.totalRate);
    this._html_td_totalStock(html_tr).data("sort-value", dailyRecord.totalStock);
  }

  
  /**
   * @note 行の内容をDailyRecordとして返す。
   * @param  {Object} html_tr
   * @return {DailyRecord}
   */
  _getDailyRecordFromRow(html_tr) {
    var date = this._html_td_date(html_tr).data("sort-value")
    var dailyRecord = new DailyRecord(date);
    dailyRecord.rate       = this._html_td_rate(html_tr).data("sort-value");
    dailyRecord.gameCount  = this._html_td_gameCount(html_tr).data("sort-value");
    dailyRecord.winCount   = this._html_td_winCount(html_tr).data("sort-value");
    dailyRecord.loseCount  = this._html_td_loseCount(html_tr).data("sort-value");
    dailyRecord.minRate    = this._html_td_minRate(html_tr).data("sort-value");
    dailyRecord.maxRate    = this._html_td_maxRate(html_tr).data("sort-value");
    dailyRecord.totalRate  = this._html_td_totalRate(html_tr).data("sort-value");
    dailyRecord.totalStock = this._html_td_totalStock(html_tr).data("sort-value");
    return dailyRecord;
  }


  /**
   * @note 表示数を制限する。
   * @param {Integer} count
   */
  _limit(count) {
    var html_trs = this._html_trs;
    var headIndex = (count < 0) ? html_trs.length : count;

    for (let i = 0; i < headIndex; i++) {
      $(html_trs[i]).show();
    }

    for (let i = headIndex; i < html_trs.length; i++) {
      $(html_trs[i]).hide();
    }
  }


  /**
   * @note 全件表示
   */
  _more() {
    this._limit(-1);
    this._html_moreButton.hide();
    this._html_lessButton.show();
  }


  /**
   * @note 直近のみ表示
   */
  _less() {
    this._limit(this._showLimit);
    this._html_lessButton.hide();
    this._html_moreButton.show();
  }


}
