class RegisterHtml {

  constructor() {
    this._fighterListHtml = new FighterListHtml();
  }


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

  get _html_id()                        { return $("#input-game-record-id"); }
  get _html_date()                      { return $("#input-game-record-date"); }
  get _html_rate()                      { return $("#input-game-record-rate"); }
  get _html_stock()                     { return $("#input-game-record-stock"); }
  get _html_fighter()                   { return $("#input-game-record-fighter"); }
  get _html_is_vip()                    { return $("#input-game-record-is-vip"); }
  get _html_registerResult()            { return $("#register-request-result"); }
  get _html_registerRequestButton()     { return $("#register-request-button"); }
  get _html_registerDumpRequestButton() { return $("#register-dump-request-button"); }


  addRegisterRequestButtonOnClick(callback) {
    this._html_registerRequestButton.on("click", callback);
  }

  addRegisterDumpRequestButtonOnClick(callback) {
    this._html_registerDumpRequestButton.on("click", callback);
  }

  enableRequestButtons() {
    this._html_registerRequestButton.prop("disabled", false);
    this._html_registerDumpRequestButton.prop("disabled", false);
  }

  disableRequestButtons() {
    this._html_registerRequestButton.prop("disabled", true);
    this._html_registerDumpRequestButton.prop("disabled", true);
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
    gameRecord.fighter    = this.fighter;
    gameRecord.isVip      = this.isVip;
    gameRecord.isDeleted  = false;
    return gameRecord;
  }


  /**
   * @param {GameRecord} gameRecord
   */
  fromGameRecord(gameRecord) {
    this.id      = gameRecord.id;
    this.date    = gameRecord.date.substr(0, 10).replaceAll("/", "-");
    this.rate    = gameRecord.rate;
    this.stock   = gameRecord.stock;
    this.fighter = gameRecord.fighter;
    this.isVip   = gameRecord.isVip;
  }


  /**
   * @return {String}
   */
  validateInputs() {
    var pattern;
    var matchResult;

    var gameRecord = this.toGameRecord();

    // 日付
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
    if (!this._fighterListHtml.isExist(gameRecord.fighter)) {
      return "相手ファイターが不正です。";
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
