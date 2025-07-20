class DumpGameRecordHtml {

  constructor() {
    this._dialogHtml = new DialogHtml();
    this._showLimit = 20;
  }

  get _html_section()    { return $("#dump-game-record"); }
  get _html_head()       { return $(this._html_section).children(".dump-section-head"); }
  get _html_body()       { return $(this._html_section).children(".dump-section-body"); }

  get _html_notice()     { return $(this._html_body.children(".dump-game-record-notice")); }
  get _html_moreButton() { return $(this._html_body.children(".dump-table-more-button")); }
  get _html_lessButton() { return $(this._html_body.children(".dump-table-less-button")); }
  
  get _html_table()      { return $(this._html_body.find("table")); }
  get _html_tbody()      { return $(this._html_table.children("tbody")); }
  get _html_trs()        { return $(this._html_tbody.children("tr")); }

  _html_td_id(html_tr)         { return html_tr.children(".id"); }
  _html_td_date(html_tr)       { return html_tr.children(".date"); }
  _html_td_rate(html_tr)       { return html_tr.children(".rate"); }
  _html_td_stock(html_tr)      { return html_tr.children(".stock"); }
  _html_td_fighter(html_tr)    { return html_tr.children(".fighter"); }
  _html_td_fighterId(html_tr)  { return html_tr.children(".fighter-id"); }
  _html_td_isVip(html_tr)      { return html_tr.children(".is-vip"); }
  _html_td_isDisabled(html_tr) { return html_tr.children(".is-disabled"); }


  /**
   * @note   表示を更新する。
   * @param  {GameRecords} gameRecords
   * @param  {Object} noticeIds
   */
  update(gameRecords, noticeIds) {
    // レコードがなければ何もしない
    if (gameRecords.length == 0) {
      this._html_section.hide();
      return;
    }

    // テーブル更新
    this._clearTable();
    this._updateTable(gameRecords, noticeIds);
    this._limit(this._showLimit);

    // More/Lessボタン設定
    this._html_moreButton.on("click", () => { this._more(); });
    this._html_lessButton.on("click", () => { this._less(); });
    if (gameRecords.length > this._showLimit) {
      this._html_moreButton.show();
      this._html_lessButton.hide();
    }
    else {
      this._html_moreButton.hide();
      this._html_lessButton.hide();
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
   * @param {gameRecords} gameRecords
   * @param {Object} noticeIds
   */
  _updateTable(gameRecords, noticeIds) {
    var html_tr_head = $(this._html_trs[0]);
    var length = gameRecords.length;

    for (let i = (length - 1); i >= 0; i--) {
      var gameRecord = gameRecords.index(i);
      var isNotice = noticeIds.includes(gameRecord.id);
      var html_tr = html_tr_head.clone().appendTo(this._html_table);

      this._setGameRecordToRow(html_tr, gameRecord);
      this._updateRowClickListener(html_tr);
      this._updateRowNotice(html_tr, isNotice);
      this._updateRowStyle(html_tr, gameRecord);
    }

    html_tr_head.remove();
  }

  
  /**
   * @note 行のクリックイベントを設定する。
   * @param {Object} html_tr
   */
  _updateRowClickListener(html_tr) {
    var arg = {
      callback: this._dialogHtml.openRegisterDialog.bind(this._dialogHtml),
      gameRecord: this._getGameRecordFromRow(html_tr)
    };
    var fnc = function(e) {
      var msg = "";
      msg += e.data.gameRecord.toLineString();
      msg += "\n上記の戦績を修正しますか？";
      if (window.confirm(msg)) {
        e.data.callback(e.data.gameRecord);
      }
    };
    html_tr.on("click", arg, fnc);
  }

  
  /**
   * @note 行に注釈を設定する。
   * @param {Object} html_tr
   * @param {Boolean} isNotice
   */
  _updateRowNotice(html_tr, isNotice) {
    if (isNotice) {
      html_tr.addClass("notice-background");
    }
    else  {
      html_tr.removeClass("notice-background");
    }
  }


  /**
   * @note 行のスタイルを更新する。
   * @param {Object} html_tr
   * @param {GameRecord} gameRecord
   */
  _updateRowStyle(html_tr, gameRecord) {
    // 勝敗に応じてフォントを設定
    if (gameRecord.stock > 0) {
      html_tr.addClass("positive-font");
      html_tr.removeClass("negative-font");
    }
    else {
      html_tr.addClass("negative-font");
      html_tr.removeClass("positive-font");
    }

    // 削除済みかどうかに応じてフォントを設定
    if (gameRecord.isDisabled) {
      html_tr.addClass("line-through");
    }
    else {
      html_tr.removeClass("line-through");
    }

    // VIPは王冠マークを付ける
    if (gameRecord.isVip != 0) {
      this._html_td_date(html_tr).addClass("crown");
    }
    else {
      this._html_td_date(html_tr).removeClass("crown");
    }
  }


  /**
   * @note GameRecordを行の内容に反映する。
   * @param {Object} html_tr
   * @param {GameRecord} gameRecord
   */
  _setGameRecordToRow(html_tr, gameRecord) {
    // 各要素の表示を更新
    this._html_td_id(html_tr).text(gameRecord.id);
    this._html_td_date(html_tr).text(gameRecord.date.substr(5, 5));
    this._html_td_rate(html_tr).text(gameRecord.rate + "万");
    this._html_td_stock(html_tr).text(gameRecord.stock);
    this._html_td_fighter(html_tr).text(Fighter.idToName[gameRecord.fighterId]);
    this._html_td_fighterId(html_tr).text(gameRecord.fighterId);
    this._html_td_isVip(html_tr).text(gameRecord.isVip);
    this._html_td_isDisabled(html_tr).text(gameRecord.isDisabled);

    // 参照用に生の値を仕込む
    this._html_td_id(html_tr).data("sort-value", gameRecord.id);
    this._html_td_date(html_tr).data("sort-value", gameRecord.date);
    this._html_td_rate(html_tr).data("sort-value", gameRecord.rate);
    this._html_td_stock(html_tr).data("sort-value", gameRecord.stock);
    this._html_td_fighter(html_tr).data("sort-value", Fighter.idToName[gameRecord.fighterId]);
    this._html_td_fighterId(html_tr).data("sort-value", gameRecord.fighterId);
    this._html_td_isVip(html_tr).data("sort-value", gameRecord.isVip);
    this._html_td_isDisabled(html_tr).data("sort-value", gameRecord.isDisabled);
  }

  
  /**
   * @note 行の内容をGameRecordとして返す。
   * @param  {Object} html_tr
   * @return {GameRecord}
   */
  _getGameRecordFromRow(html_tr) {
    var gameRecord = new GameRecord();
    gameRecord.id         = this._html_td_id(html_tr).data("sort-value");
    gameRecord.date       = this._html_td_date(html_tr).data("sort-value");
    gameRecord.rate       = this._html_td_rate(html_tr).data("sort-value");
    gameRecord.stock      = this._html_td_stock(html_tr).data("sort-value");
    gameRecord.fighterId  = this._html_td_fighterId(html_tr).data("sort-value");
    gameRecord.isVip      = this._html_td_isVip(html_tr).data("sort-value");
    gameRecord.isDisabled = this._html_td_isDisabled(html_tr).data("sort-value");
    return gameRecord;
  }


  /**
   * @note 表示数を制限する。(未使用)
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
