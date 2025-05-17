class DialogFighterRecordHtml {

  constructor(html_section) {
    this._html_section = html_section;
  }

  
  get _html_head()       { return $(this._html_section.children(".dialog-head"))}
  get _html_body()       { return $(this._html_section.children(".dialog-body"))}
  get _html_gameCount()  { return $(this._html_body.find(".game-count"))}
  get _html_winCount()   { return $(this._html_body.find(".win-count"))}
  get _html_loseCount()  { return $(this._html_body.find(".lose-count"))}
  get _html_winRate()    { return $(this._html_body.find(".win-rate"))}
  get _html_winOver()    { return $(this._html_body.find(".win-over"))}
  get _html_stockRate()  { return $(this._html_body.find(".stock-rate"))}


  set head(text) {
    this._html_head.text(text);
  }

  set gameCount(text) {
    this._html_gameCount.text(text);
  }

  set winCount(text) {
    this._html_winCount.text(text);
  }

  set loseCount(text) {
    this._html_loseCount.text(text);
  }

  set winRate(text) {
    this._html_winRate.text(text);
  }

  set winOver(text) {
    this._html_winOver.text(text);
  }

  set stockRate(text) {
    this._html_stockRate.text(text);
  }


  show() {
    this._html_section.show();
  }

  hide() {
    this._html_section.hide();
  }

}
