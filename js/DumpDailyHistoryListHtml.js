class DumpDailyHistoryListHtml {

  constructor() {
    this._MAX_COUNT = 10 + 1;
  }

  
  get _html_wrapper()        { return $("#dump-daily-history-list-wrapper"); }
  get _html_list()           { return $("#dump-daily-history-list"); }
  get _html_listRows()       { return $("#dump-daily-history-list").children(".row"); }
  get _html_listShowButton() { return $("#dump-daily-history-list-show-button"); }
  get _html_listHideButton() { return $("#dump-daily-history-list-hide-button"); }


  /**
   * @note   表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   */
  update(recordAnalyzer) {
    // リストをクリア
    this._clearList();

    // リストを更新
    this._updateList(recordAnalyzer);

    // リストの表示設定など
    this._hideList();
    this._html_listShowButton.on("click", { onClick: this._showList.bind(this) }, function(e) { e.data.onClick(); });
    this._html_listHideButton.on("click", { onClick: this._hideList.bind(this) }, function(e) { e.data.onClick(); });

    this._html_wrapper.show();
  }


  /**
   * @note リストをクリアする。
   */
  _clearList() {
    var html_listRow = this._html_listRows;
    for (let i = 1; i < html_listRow.length; i++) {
      $(html_listRow[i]).remove();
    }

    this._html_listShowButton.hide();
    this._html_listHideButton.hide();
  }


  /**
   * @note リストを全件表示する。
   */
  _showList() {
    const MAX_COUNT = this._MAX_COUNT;

    var html_listRow = this._html_listRows;
    for (let i = 0; i < html_listRow.length; i++) {
      $(html_listRow[i]).show();
    }

    this._html_listShowButton.hide();

    if (html_listRow.length > MAX_COUNT) {
      this._html_listHideButton.show();
    }
    else {
      this._html_listHideButton.hide();
    }
  }


  /**
   * @note リストを隠す。
   */
  _hideList() {
    const MAX_COUNT = this._MAX_COUNT;

    var html_listRow = this._html_listRows;
    for (let i = MAX_COUNT; i < html_listRow.length; i++) {
      $(html_listRow[i]).hide();
    }

    this._html_listHideButton.hide();

    if (html_listRow.length > MAX_COUNT) {
      this._html_listShowButton.show();
    }
    else {
      this._html_listShowButton.hide();
    }
  }


  /**
   * @note リストを更新する。
   * @param {RecordAnalyzer} recordAnalyzer
   */
  _updateList(recordAnalyzer) {
    var dailyRecords = recordAnalyzer.dailyRecords;
    var length = dailyRecords.length;

    // 1レコードずつループして表示
    for (let i = (length - 1); i >= 0; i--) {
      var dailyRecord = dailyRecords.index(i);

      // リストに1行追加
      var html_listRow = $(this._html_listRows[0]).clone().appendTo(this._html_list);
      var dumpDailyHistoryListRowHtml = new DumpDailyHistoryListRowHtml(html_listRow);
 
      // 追加した行に戦績を設定
      dumpDailyHistoryListRowHtml.update(dailyRecord);
    }
  }

}
