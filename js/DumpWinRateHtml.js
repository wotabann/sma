class DumpWinRateHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getBestListObject()        { return $("#dump-ranking-win-rate-best"); }
  static _getWorstListObject()       { return $("#dump-ranking-win-rate-worst"); }
  static _getBestListRowObjects()    { return this._getBestListObject().children(".dump-ranking-row"); }
  static _getWorstListRowObjects()   { return this._getWorstListObject().children(".dump-ranking-row"); }
  static _getBestListHeaderObject()  { return this._getBestListObject().children(".dump-ranking-row:first"); }
  static _getWorstListHeaderObject() { return this._getWorstListObject().children(".dump-ranking-row:first"); }

  /**
   * @note   表示を更新する。
   * @param  {FighterRecords} fighterRecords
   */
  static Update(fighterRecords) {
    this._clearList();

    for (let i = 0; i < fighterRecords.Length(); i++) {
      this._addBestListRow(fighterRecords.Index(i));
    }
  }

  /**
   * @note リストをクリアする。
   */
  static _clearList() {
    var bestListRows = this._getBestListRowObjects();
    var worstListRows = this._getWorstListRowObjects();
    for (let i = 1; i < bestListRows.length; i++) {
      bestListRows[i].remove();
    }
    for (let i = 1; i < worstListRows.length; i++) {
      worstListRows[i].remove();
    }
  }

  /**
   * @note リストに1行追加する。
   * @param {FighterRecord} fighterRecord
   */
  static _addBestListRow(fighterRecord) {
    var list = this._getBestListObject();
    var listHeader = this._getBestListHeaderObject();
    var listListRow = listHeader.clone().appendTo(list);
    listListRow.children(".dump-ranking-row-rate").text(Math.floor(fighterRecord.WinRate() * 100) + "%");
    listListRow.children(".dump-ranking-row-fighter").text(fighterRecord.Fighter);
  }

}
