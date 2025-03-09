class DumpHistoryListHtml {

  constructor() {
    this._MAX_COUNT = 30;
  }

  
  get _html_wrapper()        { return $("#dump-history-list-wrapper"); }
  get _html_notice()         { return $("#dump-history-list-notice"); }
  get _html_list()           { return $("#dump-history-list"); }
  get _html_listRows()       { return $("#dump-history-list").children(".row"); }
  get _html_listShowButton() { return $("#dump-history-list-show-button"); }
  get _html_listHideButton() { return $("#dump-history-list-hide-button"); }


  /**
   * @note   表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   */
  update(recordAnalyzer, option) {
    // リストをクリア
    this._clearList();

    // リストを更新
    this._updateList(recordAnalyzer, option);

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
    this._html_notice.hide();
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
   * @param {Object}         onClick
   */
  _updateList(recordAnalyzer, onClick) {
    var gameRecords = recordAnalyzer.gameRecords;
    var inconsistencyGameRecordIds = recordAnalyzer.inconsistencyGameRecordIds;
    var length = gameRecords.length;

    // 1レコードずつループして表示
    for (let i = (length - 1); i >= 0; i--) {
      var gameRecord = gameRecords.index(i);

      // リストに1行追加
      var html_listRow = $(this._html_listRows[0]).clone().appendTo(this._html_list);
      var dumpHistoryListRowHtml = new DumpHistoryListRowHtml(html_listRow);
 
      // 追加した行に戦績を設定
      dumpHistoryListRowHtml.update(gameRecord, onClick);

      // 不整合がある場合の注釈表示
      if (inconsistencyGameRecordIds.includes(gameRecord.id)) {
        dumpHistoryListRowHtml.notice = "勝敗とストック差が不整合";
        dumpHistoryListRowHtml.showNotice();
      }
    }

    // 不整合がある場合の注釈表示
    if (inconsistencyGameRecordIds.length > 0) {
      this._html_notice.text("！　戦闘力の増減とストック差が不整合な戦績あり");
      this._html_notice.show();
    }
  }

}
