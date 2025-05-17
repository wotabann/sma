class DumpFighterRecordHtml {

  constructor(html_section) {
    this._html_section = html_section;
  }


  get _html_head() { return $(this._html_section).children(".dump-section-head"); }
  get _html_body() { return $(this._html_section).children(".dump-section-body"); }
  
  get _html_table() { return $(this._html_body.find("table")); }
  get _html_tbody() { return $(this._html_table.children("tbody")); }
  get _html_trs()   { return $(this._html_tbody.children("tr")); }

  _html_td_fighter(html_tr)    { return html_tr.children(".fighter"); }
  _html_td_gameCount(html_tr)  { return html_tr.children(".game-count"); }
  _html_td_winOver(html_tr)    { return html_tr.children(".win-over"); }
  _html_td_winRate(html_tr)    { return html_tr.children(".win-rate"); }
  _html_td_winCount(html_tr)   { return html_tr.children(".win-count"); }
  _html_td_loseCount(html_tr)  { return html_tr.children(".lose-count"); }
  _html_td_stockRate(html_tr)  { return html_tr.children(".stock-rate"); }
  _html_td_totalStock(html_tr) { return html_tr.children(".total-stock"); }


  /**
   * @note   表示を更新する。
   * @param  {FighterRecords} fighterRecords
   * @param  {Object} rowClickListener
   */
  update(fighterRecords, rowClickListener) {
    // 対戦回数順および負け越している順にソート
    fighterRecords.sortByWinOverR();
    fighterRecords.sortByGameCount();

    // テーブル更新
    this._clearTable();
    this._updateTable(fighterRecords, rowClickListener);

    // テーブルにソート機能を追加
    new TableSorter(this._html_table);

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
   * @param {fighterRecords} fighterRecords
   * @param {Object} rowClickListener
   */
  _updateTable(fighterRecords, rowClickListener) {
    var html_tr_head = $(this._html_trs[0]);
    var length = fighterRecords.length;

    for (let i = 0 ; i < length; i++) {
      var fighterRecord = fighterRecords.index(i);
      var html_tr = html_tr_head.clone().appendTo(this._html_table);

      this._setFighterRecordToRow(html_tr, fighterRecord);
      this._updateRowClickListener(html_tr, rowClickListener);
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
        fighterRecord: this._getFighterRecordFromRow(html_tr)
      };
      var fnc = function(e) {
        e.data.callback(e.data.fighterRecord);
      };
      html_tr.on("click", arg, fnc);
    }
  }


  /**
   * @note FighterRecordを行の内容に反映する。
   * @param {Object} html_tr
   * @param {FighterRecord} fighterRecord
   */
  _setFighterRecordToRow(html_tr, fighterRecord) {
    // 設定値
    var winRate = Math.floor(fighterRecord.winRate * 100) + "％";
    var stockRate = Math.floor(fighterRecord.stockRate * 100) / 100;

    // 各要素の表示を更新
    this._html_td_fighter(html_tr).text(fighterRecord.fighter);
    this._html_td_gameCount(html_tr).text(fighterRecord.gameCount + "回");
    this._html_td_winOver(html_tr).text(fighterRecord.winOver + "回");
    this._html_td_winRate(html_tr).text(winRate);
    this._html_td_winCount(html_tr).text(fighterRecord.winCount + "回");
    this._html_td_loseCount(html_tr).text(fighterRecord.loseCount + "回");
    this._html_td_stockRate(html_tr).text(stockRate );
    this._html_td_totalStock(html_tr).text(fighterRecord.totalStock);

    // 参照用に生の値を仕込む
    this._html_td_fighter(html_tr).data("sort-value",    fighterRecord.fighter);
    this._html_td_gameCount(html_tr).data("sort-value",  fighterRecord.gameCount);
    this._html_td_winCount(html_tr).data("sort-value",   fighterRecord.winCount);
    this._html_td_loseCount(html_tr).data("sort-value",  fighterRecord.loseCount);
    this._html_td_totalStock(html_tr).data("sort-value", fighterRecord.totalStock);
  }

  
  /**
   * @note 行の内容をFighterRecordとして返す。
   * @param  {Object} html_tr
   * @return {FighterRecord}
   */
  _getFighterRecordFromRow(html_tr) {
    var fighter = this._html_td_fighter(html_tr).data("sort-value");
    var fighterRecord = new FighterRecord(fighter);
    fighterRecord.gameCount  = this._html_td_gameCount(html_tr).data("sort-value");
    fighterRecord.winCount   = this._html_td_winCount(html_tr).data("sort-value");
    fighterRecord.loseCount  = this._html_td_loseCount(html_tr).data("sort-value");
    fighterRecord.totalStock = this._html_td_totalStock(html_tr).data("sort-value");
    return fighterRecord;
  }


}
