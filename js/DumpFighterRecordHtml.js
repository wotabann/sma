class DumpFighterRecordHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getWrapperHtml()            { return $("#dump-fighter-record-table-wrapper"); }
  static _getTableHtml()              { return $("#dump-fighter-record-table"); }
  static _getTableTbodyHtml()         { return $("#dump-fighter-record-table tbody"); }
  static _getTableTbodyTrHtml()       { return $("#dump-fighter-record-table tbody tr"); }
  static _getTableTbodyTrHeaderHtml() { return $("#dump-fighter-record-table tbody tr:first"); }

  /**
   * @note   表示を更新する。
   * @param  {FighterRecords} fighterRecords
   */
  static Update(fighterRecords) {
    this._clearTable();
    this._updateTable(fighterRecords);
    this._updateTableSort();

    this._getWrapperHtml().show();
  }


  /**
   * @note テーブルをクリアする。
   */
  static _clearTable() {
    var trHtmls = this._getTableTbodyTrHtml();
    for (let i = 1; i < trHtmls.length; i++) {
      $(trHtmls[i]).remove();
    }
  }
  

  /**
   * @note テーブルを更新する。
   * @param {FighterRecords} fighterRecords
   */
  static _updateTable(fighterRecords) {
    // 退避
    var trHtmls    = this._getTableTbodyTrHtml();
    var trHeaderHtml = this._getTableTbodyTrHeaderHtml();
    var tbodyHtmls = this._getTableTbodyHtml();

    // 対戦回数順にソート
    fighterRecords.SortByGameCount();

    // 1件ずつループして表示
    for (let i = 0; i < fighterRecords.Length(); i++) {
      var fighterRecord = fighterRecords.Index(i);

      var winRate   = Math.floor(fighterRecord.WinRate() * 100) + "%";
      var stockRate = Math.floor(fighterRecord.StockRate() * 100) / 100;

      var trHtml = trHeaderHtml.clone().appendTo(tbodyHtmls);
      trHtml.children(".dump-table-fighter").text(fighterRecord.Fighter);
      trHtml.children(".dump-table-game-count").text(fighterRecord.GameCount + "回");
      trHtml.children(".dump-table-win-count").text(fighterRecord.WinCount + "回");
      trHtml.children(".dump-table-lose-count").text(fighterRecord.LoseCount + "回");
      trHtml.children(".dump-table-win-rate").text(winRate);
      trHtml.children(".dump-table-stock-rate").text(stockRate);
      trHtml.children(".dump-table-total-stock").text(fighterRecord.TotalStock);
    }

    // ダミーの1行目を削除
    trHeaderHtml.remove();
  }
  

  /**
   * @note 苦手キャラを更新する。
   * @param {FighterRecords} fighterRecords
   */
  static _updateWorstRanking(fighterRecords) {
    const MAX_COUNT = 5;

    // 退避
    var worstHtml = this._getWorstHtml();
    var worstRowHeaderHtml = this._getWorstRowHeaderHtml();

    // 表示する最大キャラ数
    var maxCount = Math.min(MAX_COUNT, fighterRecords.Length());

    // 表示用にソート
    fighterRecords.SortByGameCount();
    fighterRecords.SortByWinRateR();

    // 1件ずつループして表示
    for (let i = 0; i < maxCount; i++) {
      var fighterRecord = fighterRecords.Index(i);

      var winRate = Math.floor(fighterRecord.WinRate() * 100) + "%";

      var worstRowHtml = worstRowHeaderHtml.clone().appendTo(worstHtml);
      worstRowHtml.children(".dump-ranking-row-rate").text(winRate);
      worstRowHtml.children(".dump-ranking-row-fighter").text(fighterRecord.Fighter);
    }
  }
  

  /**
   * @note テーブルのソート機能を更新する。
   */
  static _updateTableSort() {
    new TableSorter("dump-fighter-record-table");
  }

}
