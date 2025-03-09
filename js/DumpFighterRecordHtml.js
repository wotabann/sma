class DumpFighterRecordHtml {

  constructor() {
  }


  get _html_wrapper() { return $("#dump-fighter-record-table-wrapper"); }
  get _html_tbody()   { return $("#dump-fighter-record-table tbody"); }
  get _html_trs()     { return $("#dump-fighter-record-table tbody tr"); }

  
  /**
   * @note   表示を更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   */
  update(recordAnalyzer) {
    var fighterRecords = recordAnalyzer.fighterRecords;

    this._clearTable();

    this._updateTable(fighterRecords);
    this._updateTableSort();

    this._html_wrapper.show();
  }


  /**
   * @note テーブルをクリアする。
   */
  _clearTable() {
    var _html_trs = this._html_trs;
    for (let i = 1; i < _html_trs.length; i++) {
      $(_html_trs[i]).remove();
    }
  }
  

  /**
   * @note テーブルを更新する。
   * @param {FighterRecords} fighterRecords
   */
  _updateTable(fighterRecords) {
    // 退避
    var html_trs   = this._html_trs;
    var html_tbody = this._html_tbody;

    // 対戦回数順および負け越している順にソート
    fighterRecords.sortByWinOverR();
    fighterRecords.sortByGameCount();

    // 1件ずつループして表示
    for (let i = 0; i < fighterRecords.length; i++) {
      var fighterRecord = fighterRecords.index(i);

      var winRate   = Math.floor(fighterRecord.winRate * 100) + "%";
      var stockRate = Math.floor(fighterRecord.stockRate * 100) / 100;

      var html_tr = $(html_trs[0]).clone().appendTo(html_tbody);
      html_tr.children(".dump-table-fighter").text(fighterRecord.fighter);
      html_tr.children(".dump-table-game-count").text(fighterRecord.gameCount + "回");
      html_tr.children(".dump-table-win-over").text(fighterRecord.winOver + "回");
      html_tr.children(".dump-table-win-rate").text(winRate);
      html_tr.children(".dump-table-stock-rate").text(stockRate);
      html_tr.children(".dump-table-total-stock").text(fighterRecord.totalStock);
    }

    // ダミーの1行目を削除
    $(html_trs[0]).remove();
  }
  

  /**
   * @note テーブルのソート機能を更新する。
   */
  _updateTableSort() {
    new TableSorter("dump-fighter-record-table");
  }

}
