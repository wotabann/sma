class RegisterHtml {

  constructor() {
  }

  get _html_section()  { return $("#register"); }
  get _html_body()     { return $(this._html_section.children(".section-body")); }

  get _html_id()                        { return $(this._html_body.find("#register-form-id")); }
  get _html_date()                      { return $(this._html_body.find("#register-form-date")); }
  get _html_rate()                      { return $(this._html_body.find("#register-form-rate")); }
  get _html_stock()                     { return $(this._html_body.find("#register-form-stock")); }
  get _html_fighter()                   { return $(this._html_body.find("#register-form-fighter")); }
  get _html_is_vip()                    { return $(this._html_body.find("#register-form-is-vip")); }
  get _html_registerResult()            { return $(this._html_body.find("#register-request-result")); }
  get _html_registerRequestButton()     { return $(this._html_body.find("#register-request-button")); }
  get _html_registerDumpRequestButton() { return $(this._html_body.find("#register-dump-request-button")); }

  get id()                  { return this._html_id.val(); }
  set id(value)             {        this._html_id.val(value); }
  get date()                { return this._html_date.val(); }
  set date(value)           {        this._html_date.val(value); }
  get rate()                { return this._html_rate.val(); }
  set rate(value)           {        this._html_rate.val(value); }
  get stock()               { return this._html_stock.val(); }
  set stock(value)          {        this._html_stock.val(value); }
  get fighter()             { return this._html_fighter.val(); }
  set fighter(value)        {        this._html_fighter.val(value); }
  get isVip()               { return this._html_is_vip.prop("checked"); }
  set isVip(isVip)          {        this._html_is_vip.prop("checked", isVip); }
  get registerResult()      { return this._html_registerResult.text(); }
  set registerResult(text) {         this._html_registerResult.text(text); }


  addRegisterRequestButtonOnClick(callback) {
    this._html_registerRequestButton.on("click", callback);
  }

  addRegisterDumpRequestButtonOnClick(callback) {
    this._html_registerDumpRequestButton.on("click", callback);
  }


  /**
   * @return {GameRecord}
   */
  toGameRecord() {
    var gameRecord = new GameRecord();
    gameRecord.id         = 0;
    gameRecord.date       = this.date;
    gameRecord.rate       = this.rate;
    gameRecord.stock      = this.stock;
    gameRecord.fighterId  = Fighter.nameToId[this.fighter];
    gameRecord.isVip      = this.isVip ? 1 : 0;
    gameRecord.isDisabled = 0;
    return gameRecord;
  }


  /**
   * @param {GameRecord} gameRecord
   */
  fromGameRecord(gameRecord) {
    this.id         = 0;
    this.date       = gameRecord.date.substr(0, 10).replaceAll("/", "-");
    this.rate       = gameRecord.rate;
    this.stock      = gameRecord.stock;
    this.fighter    = Fighter.idToName[gameRecord.fighterId];
    this.isVip      = (gameRecord.isVip != 0);
    this.isDisabled = 0;
  }


  /**
   * @return {String}
   */
  validateInputs() {
    var pattern;
    var matchResult;

    var gameRecord = this.toGameRecord();

    // ID
    if (gameRecord.id != 0) {
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


  /**
   * @note   現在時刻と日付に乖離がないか調べる
   * @return {Boolean}
   */
  isDateInRange() {
    var gameRecord = this.toGameRecord();

    // 現在時刻の日付と一致なら乖離なし。
    if (gameRecord.date == Util.getToday()) {
      return true;
    }

    // 現在時刻の4時間前までは乖離なしと見なす。
    var now = new Date();
    var date = new Date(now - (1000 * 60 * 60 * 4));
    const yyyy = date.getFullYear();
    const mm = ('00' + (date.getMonth()+1)).slice(-2);
    const dd = ('00' + date.getDate()).slice(-2);
    if (gameRecord.date == `${yyyy}-${mm}-${dd}`) {
      return true;
    }

    // 上記以外は日付の乖離アリと見なす。
    return false;
  }
}
