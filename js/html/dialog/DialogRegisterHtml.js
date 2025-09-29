class DialogRegisterHtml {

  constructor() {
  }

  get _html_section() { return $("#dialog-register"); }
  get _html_head()    { return $(this._html_section.children(".dialog-head"))}
  get _html_body()    { return $(this._html_section.children(".dialog-body"))}

  get _html_id()                        { return $(this._html_body.find("#dialog-form-id")); }
  get _html_date()                      { return $(this._html_body.find("#dialog-form-date")); }
  get _html_rate()                      { return $(this._html_body.find("#dialog-form-rate")); }
  get _html_stock()                     { return $(this._html_body.find("#dialog-form-stock")); }
  get _html_fighter()                   { return $(this._html_body.find("#dialog-form-fighter")); }
  get _html_is_vip()                    { return $(this._html_body.find("#dialog-form-is-vip")); }
  get _html_is_disabled()               { return $(this._html_body.find("#dialog-form-is-disabled")); }
  get _html_registerResult()            { return $(this._html_body.find("#dialog-request-result")); }
  get _html_registerDumpRequestButton() { return $(this._html_body.find("#dialog-dump-request-button")); }

  get id()                   { return this._html_id.val(); }
  set id(value)              {        this._html_id.val(value); }
  get date()                 { return this._html_date.val(); }
  set date(value)            {        this._html_date.val(value); }
  get rate()                 { return this._html_rate.val(); }
  set rate(value)            {        this._html_rate.val(value); }
  get stock()                { return this._html_stock.val(); }
  set stock(value)           {        this._html_stock.val(value); }
  get fighter()              { return this._html_fighter.val(); }
  set fighter(value)         {        this._html_fighter.val(value); }
  get isVip()                { return this._html_is_vip.prop("checked"); }
  set isVip(isVip)           {        this._html_is_vip.prop("checked", isVip); }
  get isDisabled()           { return this._html_is_disabled.prop("checked"); }
  set isDisabled(isDisabled) {        this._html_is_disabled.prop("checked", isDisabled); }
  get registerResult()       { return this._html_registerResult.text(); }
  set registerResult(text)   {        this._html_registerResult.text(text); }


  addRegisterDumpRequestButtonOnClick(callback) {
    this._html_registerDumpRequestButton.on("click", callback);
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
   * @return {GameRecord}
   */
  toGameRecord() {
    var gameRecord = new GameRecord();
    gameRecord.id         = this.id;
    gameRecord.date       = this.date;
    gameRecord.rate       = this.rate;
    gameRecord.stock      = this.stock;
    gameRecord.fighterId  = Fighter.nameToId[this.fighter];
    gameRecord.isVip      = this.isVip ? 1 : 0;
    gameRecord.isDisabled = this.isDisabled ? 1 : 0;

    // 【暫定対応】VIP自動判定のためfalse固定
    gameRecord.isVip = 0;

    return gameRecord;
  }


  /**
   * @param {GameRecord} gameRecord
   */
  fromGameRecord(gameRecord) {
    this.id         = gameRecord.id;
    this.date       = gameRecord.date.substr(0, 10).replaceAll("/", "-");
    this.rate       = gameRecord.rate;
    this.stock      = gameRecord.stock;
    this.fighter    = Fighter.idToName[gameRecord.fighterId];
    this.isVip      = (gameRecord.isVip != 0);
    this.isDisabled = (gameRecord.isDisabled != 0);
  
    // 【暫定対応】VIP自動判定のためfalse固定
    this.isVip = false;
  }


  /**
   * @return {String}
   */
  validateInputs() {
    var pattern;
    var matchResult;

    var gameRecord = this.toGameRecord();

    // ID
    pattern = "^[0-9]{1,4}$";
    matchResult = gameRecord.id.match(pattern);
    if (matchResult == null) {
      return "IDが不正です。";
    }

    // 日付
    pattern = "^202[5-9]-[0-9][0-9]-[0-3][0-9]$";
    matchResult = gameRecord.date.match(pattern);
    if (matchResult == null) {
      return "日付の形式が不正です。";
    }

    // 戦闘力
    pattern = "^[0-9]{3,4}$";
    matchResult = gameRecord.rate.match(pattern);
    if (matchResult == null) {
      return "戦闘力が不正です。";
    }

    // ストック差
    pattern = "^[\-]{0,1}[0-5]$";
    matchResult = gameRecord.stock.match(pattern);
    if (matchResult == null) {
      return "ストック差が不正です。";
    }

    // 相手ファイター
    if (gameRecord.fighterId == undefined) {
      return "相手ファイターが不正です。\nリストの表記に合わせてください。";
    }

    return "";
  }


}
