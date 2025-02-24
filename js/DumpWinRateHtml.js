class DumpWinRateHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getWrapperHtml()        { return $("#dump-ranking-win-rate-wrapper"); }
  static _getBestHtml()           { return $("#dump-ranking-win-rate-best"); }
  static _getBestRowHtmls()       { return this._getBestHtml().children(".dump-ranking-row"); }
  static _getBestRowHeaderHtml()  { return this._getBestHtml().children(".dump-ranking-row:first"); }
  static _getWorstHtml()          { return $("#dump-ranking-win-rate-worst"); }
  static _getWorstRowHtmls()      { return this._getWorstHtml().children(".dump-ranking-row"); }
  static _getWorstRowHeaderHtml() { return this._getWorstHtml().children(".dump-ranking-row:first"); }

  /**
   * @note   表示を更新する。
   * @param  {FighterRecords} fighterRecords
   */
  static Update(fighterRecords) {
    this._clearRanking();
    this._updateBestRanking(fighterRecords);
    this._updateWorstRanking(fighterRecords);

    this._getWrapperHtml().show();
  }


  /**
   * @note リストをクリアする。
   */
  static _clearRanking() {
    var bestRowHtmls = this._getBestRowHtmls();
    var worstRowHtmls = this._getWorstRowHtmls();
    for (let i = 1; i < bestRowHtmls.length; i++) {
      bestRowHtmls[i].remove();
    }
    for (let i = 1; i < worstRowHtmls.length; i++) {
      worstRowHtmls[i].remove();
    }
  }
  

  /**
   * @note 得意キャラを更新する。
   * @param {FighterRecords} fighterRecords
   */
  static _updateBestRanking(fighterRecords) {
    const MAX_COUNT = 5;

    // 退避
    var bestHtml = this._getBestHtml();
    var bestRowHeaderHtml = this._getBestRowHeaderHtml();

    // 表示する最大キャラ数
    var maxCount = Math.min(MAX_COUNT, fighterRecords.Length());

    // 表示用にソート
    fighterRecords.SortByGameCount();
    fighterRecords.SortByWinRate();

    // 1件ずつループして表示
    for (let i = 0; i < maxCount; i++) {
      var fighterRecord = fighterRecords.Index(i);

      var winRate = Math.floor(fighterRecord.WinRate() * 100) + "%";

      var bestRowHtml = bestRowHeaderHtml.clone().appendTo(bestHtml);
      bestRowHtml.children(".dump-ranking-row-rate").text(winRate);
      bestRowHtml.children(".dump-ranking-row-fighter").text(fighterRecord.Fighter);
    }
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

}
