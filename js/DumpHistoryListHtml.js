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
   * @param  {GameRecords} gameRecords
   */
  update(gameRecords, listClickCallback) {
    // リストをクリア
    this._clearList();

    // リストを更新
    this._updateList(gameRecords, listClickCallback);

    // リストの表示設定など
    this._hideList();
    this._html_listShowButton.on("click", { callback: this._showList.bind(this) }, function(e) { e.data.callback(); });
    this._html_listHideButton.on("click", { callback: this._hideList.bind(this) }, function(e) { e.data.callback(); });
    this._updateListNotice();

    this._html_wrapper.show();
  }


  /**
   * @note リストクリック時のイベント
   * @param {GameRecord} gameRecord
   */
  _listRowCallback(e) {
    // 引数を作成
    var gameRecord = new GameRecord();
    gameRecord.id        = $(this).children(".id").data("raw");
    gameRecord.date      = $(this).children(".date").data("raw");
    gameRecord.rate      = $(this).children(".rate").data("raw");
    gameRecord.stock     = $(this).children(".stock").data("raw");
    gameRecord.fighter   = $(this).children(".fighter").data("raw");
    gameRecord.isVip     = $(this).children(".is-vip").data("raw");
    gameRecord.isDeleted = $(this).children(".is-deleted").data("raw");

    // コールバック関数を呼び出す
    e.data.callback(gameRecord);
  }


  /**
   * @note リストをクリアする。
   */
  _clearList() {
    var html_listRow = this._html_listRows;
    for (let i = 1; i < html_listRow.length; i++) {
      $(html_listRow[i]).remove();
    }
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
    this._html_listHideButton.hide();
    if (html_listRow.length > MAX_COUNT) {
      this._html_listHideButton.show();
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

    this._html_listShowButton.hide();
    this._html_listHideButton.hide();
    if (html_listRow.length > MAX_COUNT) {
      this._html_listShowButton.show();
    }
  }


  /**
   * @note リストを更新する。(1行)
   * @param {Object}     html_listRow
   * @param {GameRecord} gameRecord
   */
  _updateListRow(html_listRow, gameRecord) {
    // 設定値
    var date = gameRecord.date.substr(5, 5);
    var font = (gameRecord.stock > 0) ? "positive-font" : "negative-font";

    // 各要素
    var html_id         = html_listRow.children(".id");
    var html_date       = html_listRow.children(".date");
    var html_rate       = html_listRow.children(".rate");
    var html_stock      = html_listRow.children(".stock");
    var html_fighter    = html_listRow.children(".fighter");
    var html_isVip      = html_listRow.children(".is-vip");
    var html_isDeleted  = html_listRow.children(".is-deleted");
    var html_noticeIcon = html_listRow.children(".notice-icon");

    // 各要素の表示を更新
    html_id.text(gameRecord.id);
    html_date.text(date);
    html_rate.text(gameRecord.rate + "万");
    html_stock.text(gameRecord.stock);
    html_fighter.text(gameRecord.fighter);
    html_isVip.text(gameRecord.isVip);
    html_isDeleted.text(gameRecord.isDeleted);
    html_noticeIcon.hide();

    // リストクリックのコールバック用に生の値を仕込む
    html_id.data("raw",   gameRecord.id);
    html_date.data("raw", gameRecord.date);
    html_rate.data("raw", gameRecord.rate);
    html_stock.data("raw", gameRecord.stock);
    html_fighter.data("raw", gameRecord.fighter);
    html_isVip.data("raw", gameRecord.isVip);
    html_isDeleted.data("raw", gameRecord.isDeleted);

    // 勝敗に応じてフォントを設定
    html_listRow.addClass(font);

    // 削除済みかどうかに応じてフォントを設定
    if (gameRecord.isDeleted) {
      html_listRow.addClass("line-through");
    }
    else {
      html_listRow.removeClass("line-through");
    }
  }


  /**
   * @note リストを更新する。
   * @param {GameRecords} gameRecords
   */
  _updateList(gameRecords, listClickCallback) {
    // 退避
    var length = gameRecords.length;
    var html_list = this._html_list;
    var html_listRows = this._html_listRows;

    // 1レコードずつループして表示
    for (let i = (length - 1); i >= 0; i--) {
      var gameRecord = gameRecords.index(i);

      // 1行追加
      var html_listRow = $(html_listRows[0]).clone().appendTo(html_list);

      // 追加した行の内容を更新
      this._updateListRow(html_listRow, gameRecord);

      // クリックイベントをセット
      var arg = { callback: listClickCallback };
      html_listRow.on("click", arg, this._listRowCallback);
    }
  }


  /**
   * @note リストの注意喚起欄を更新する。
   */
  _updateListNotice() {
    // 退避
    var html_listRows = this._html_listRows;
    var length = html_listRows.length;
    var noticeCount = 0;

    // 1レコードずつループして表示
    for (let i = 1; i < (length - 1); i++) {
      var html_listRow   = $(html_listRows[i]);

      // 削除レコードは対象外
      var html_isDeleted = html_listRow.children(".is-deleted");
      if (html_isDeleted.data("raw") == true) {
        continue;
      }

      // 必要な情報の退避
      var html_rate  = html_listRow.children(".rate");
      var html_stock = html_listRow.children(".stock");
      var rate      = html_rate.data("raw");
      var stock     = html_stock.data("raw");
      var rate_prev = rate;

      // 1試合前の戦闘力を検索
      for (let j = (i + 1); j < length; j++) {
        var html_listRow_prev   = $(html_listRows[j]);
        var html_isDeleted_prev = html_listRow_prev.children(".is-deleted");
        if (html_isDeleted_prev.data("raw") == false) {
          var html_rate_prev = html_listRow_prev.children(".rate");
          rate_prev = html_rate_prev.data("raw");
          break;
        }
      }

      // 不整合のチェック
      var html_noticeIcon;
      var html_notice;
      if ((rate < rate_prev) && (stock > 0) || (rate > rate_prev) && (stock < 0)) {
        var html_noticeIcon = html_listRow.children(".notice-icon");
        var html_notice     = html_noticeIcon.children(".notice");
        html_notice.text("戦闘力の増減とストック差に不整合あり");
        html_noticeIcon.show();
        noticeCount++;
      }
    }

    if (noticeCount > 0) {
      this._html_notice.text("！　戦闘力の増減とストック差が不整合な戦績あり");
      this._html_notice.show();
    }
  }

}
