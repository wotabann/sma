class DialogFighterRecordHtml {

  constructor() {
  }

  get _html_section()    { return $("#dialog-fighter-record"); }
  get _html_head()       { return $(this._html_section.children(".dialog-head"))}
  get _html_body()       { return $(this._html_section.children(".dialog-body"))}
  get _html_gameCount()  { return $(this._html_body.find(".game-count"))}
  get _html_winCount()   { return $(this._html_body.find(".win-count"))}
  get _html_loseCount()  { return $(this._html_body.find(".lose-count"))}
  get _html_winRate()    { return $(this._html_body.find(".win-rate"))}
  get _html_winOver()    { return $(this._html_body.find(".win-over"))}
  get _html_stockRate()  { return $(this._html_body.find(".stock-rate"))}

  set _head(text)      { this._html_head.text(text);  }
  set _gameCount(text) { this._html_gameCount.text(text); }
  set _winCount(text)  { this._html_winCount.text(text); }
  set _loseCount(text) { this._html_loseCount.text(text); }
  set _winRate(text)   { this._html_winRate.text(text); }
  set _winOver(text)   { this._html_winOver.text(text); }
  set _stockRate(text) { this._html_stockRate.text(text); }


  /**
   * @note 表示を更新する。
   * @param {FighterRecord} fighterRecord
   */
  update(fighterRecord) {
    var fighterName = Fighter.idToName[fighterRecord.fighterId];
    this._head = fighterName + " の基本情報";
    this._gameCount = fighterRecord.gameCount + "回";
    this._winCount  = fighterRecord.winCount + "回";
    this._loseCount = fighterRecord.loseCount + "回";
    this._winRate   = Math.floor(fighterRecord.winRate * 100) + "％";
    this._winOver   = fighterRecord.winOver + "回";
    this._stockRate = Math.floor(fighterRecord.stockRate * 100) / 100;
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


}
