class DialogGameRecordHtml {

  constructor(html_section) {
    this._html_section = html_section;
  }

  
  get _html_head()  { return $(this._html_section.children(".dialog-head"))}
  get _html_body()  { return $(this._html_section.children(".dialog-body"))}

  get _html_table() { return $(this._html_body.find(".dialog-game-record-table")); }
  get _html_tbody() { return $(this._html_table.children("tbody")); }
  get _html_trs()   { return $(this._html_tbody.children("tr")); }

  _html_td_id(html_tr)        { return html_tr.children(".id"); }
  _html_td_date(html_tr)      { return html_tr.children(".date"); }
  _html_td_rate(html_tr)      { return html_tr.children(".rate"); }
  _html_td_stock(html_tr)     { return html_tr.children(".stock"); }
  _html_td_fighter(html_tr)   { return html_tr.children(".fighter"); }
  _html_td_isVip(html_tr)     { return html_tr.children(".is-vip"); }
  _html_td_isDeleted(html_tr) { return html_tr.children(".is-deleted"); }


  set head(text) {
    this._html_head.text(text);
  }


  /**
   * @note   表示を更新する。
   * @param  {GameRecords} gameRecords
   */
  update(gameRecords) {
    // テーブル更新
    this._clearTable();
    this._updateTable(gameRecords);

    // セクション表示
    this._html_section.show();
  }


  /**
   * @note セクションを表示する。
   */
  show() {
    this._html_section.show();
  }


  /**
   * @note セクションを非表示にする。
   */
  hide() {
    this._html_section.hide();
  }


  /**
   * @note ファイターでフィルタする
   */
  filterByFighter(fighter) {
    this._filter("fighter", fighter);
  }


  /**
   * @note 日付でフィルタする
   */
  filterByDate(date) {
    this._filter("date", date);
  }


  /**
   * @note フィルタする
   */
  _filter(className, value) {
    var tableSorter = new TableSorter(this._html_table);
    var filterFunction = function(dataset) {
      if (dataset["is-deleted"].value) {
        return false;
      }
      if (dataset[className].value != value) {
        return false;
      }
      return true;
    }
    tableSorter.filter(filterFunction);
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
   * @param {Object} rowClickListener
   */
  _updateTable(gameRecords) {
    var html_tr_head = $(this._html_trs[0]);
    var length = gameRecords.length;

    for (let i = (length - 1); i >= 0; i--) {
      var gameRecord = gameRecords.index(i);
      var html_tr = html_tr_head.clone().appendTo(this._html_table);

      this._setGameRecordToRow(html_tr, gameRecord);
      this._updateRowStyle(html_tr, gameRecord);
    }

    html_tr_head.remove();
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
    if (gameRecord.isDeleted) {
      html_tr.addClass("line-through");
    }
    else {
      html_tr.removeClass("line-through");
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
    this._html_td_fighter(html_tr).text(gameRecord.fighter);
    this._html_td_isVip(html_tr).text(gameRecord.isVip);
    this._html_td_isDeleted(html_tr).text(gameRecord.isDeleted);

    // 参照用に生の値を仕込む
    this._html_td_id(html_tr).data("sort-value", gameRecord.id);
    this._html_td_date(html_tr).data("sort-value", gameRecord.date);
    this._html_td_rate(html_tr).data("sort-value", gameRecord.rate);
    this._html_td_stock(html_tr).data("sort-value", gameRecord.stock);
    this._html_td_fighter(html_tr).data("sort-value", gameRecord.fighter);
    this._html_td_isVip(html_tr).data("sort-value", gameRecord.isVip);
    this._html_td_isDeleted(html_tr).data("sort-value", gameRecord.isDeleted);
  }


}
