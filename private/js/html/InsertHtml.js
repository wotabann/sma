class InsertHtml {

  constructor() {
  }

  get _html_section()  { return $("#insert"); }

  get _html_date()   { return $(this._html_section.find(".date input")); }
  get _html_stock()  { return $(this._html_section.find(".stock input:checked")); }
  get _html_tbody()  { return $(this._html_section.find(".fighter tbody")); }
  get _html_trs()    { return $(this._html_tbody.find("tr")); }

  get date()                { return this._html_date.val(); }
  set date(value)           {        this._html_date.val(value); }

  _html_td_user(html_tr)    { return html_tr.find(".user-name"); }
  _html_td_fighter(html_tr) { return html_tr.find(".fighter-name"); }
  _html_td_isWin(html_tr)   { return html_tr.find(".is-win"); }
  _html_td_isLose(html_tr)  { return html_tr.find(".is-lose"); }

  addRequestButtonOnClick(callback) {
    $("#insert-button").on("click", callback);
  }



  /**
   * @return {GameRecord}
   */
  toGameRecord() {
    var gameRecord = new GameRecord();
    gameRecord.id         = 0;
    gameRecord.date       = this._html_date.val();
    gameRecord.stock      = this._html_stock.val();
    gameRecord.isDisabled = 0;

    var html_tr;
    var html_trs = this._html_trs;
    for (let i = 0; i < html_trs.length; i++) {
      html_tr = $(html_trs[i]);
      if (this._html_td_isWin(html_tr).prop("checked")) {
        gameRecord.winUserName = this._html_td_user(html_tr).val();
        gameRecord.winFighterId = Fighter.nameToId[this._html_td_fighter(html_tr).val()];
      }
      if (this._html_td_isLose(html_tr).prop("checked")) {
        gameRecord.loseUserName = this._html_td_user(html_tr).val();
        gameRecord.loseFighterId = Fighter.nameToId[this._html_td_fighter(html_tr).val()];
      }
    }

    return gameRecord;
  }



  /**
   */
  clearInputs() {
    var html_tr;
    var html_trs = this._html_trs;

    for (let i = 0; i < html_trs.length; i++) {
      html_tr = $(html_trs[i]);
      this._html_td_isWin(html_tr).prop("checked", false);
      this._html_td_isLose(html_tr).prop("checked", false);
    }
  }



  /**
   * @return {String}
   */
  validateInputs() {
    var html_tr;
    var html_trs = this._html_trs;

    var winCount = 0;
    var loseCount = 0;
    var winUser = "";
    var loseUser = "";
    var winFighter = "";
    var loseFighter = "";

    // 勝利ユーザー／ファイター欄
    for (let i = 0; i < html_trs.length; i++) {
      html_tr = $(html_trs[i]);
      var isWin = this._html_td_isWin(html_tr).prop("checked");
      var isLose = this._html_td_isLose(html_tr).prop("checked");
      if (isWin) {
        winCount++;
        winUser = this._html_td_user(html_tr).val();
        winFighter = this._html_td_fighter(html_tr).val();
      }
      if (isLose) {
        loseCount++;
        loseUser = this._html_td_user(html_tr).val();
        loseFighter = this._html_td_fighter(html_tr).val();
      }
      if (isWin && isLose) {
        return "同じ行に勝ちと負けが設定されています。";
      }
      if (winCount > 1) {
        return "複数の行に勝ちが設定されています。";
      }
      if (loseCount > 1) {
        return "複数の行に負けが設定されています。";
      }
    }
    if (winCount == 0) {
      return "勝ちユーザーが設定されていません。";
    }
    if (loseCount == 0) {
      return "負けユーザーが設定されていません。";
    }
    if (winUser == "") {
      return "勝ちユーザー名が空欄です。";
    }
    if (loseUser == "") {
      return "負けユーザー名が空欄です。";
    }
    if (winUser == loseUser) {
      return "勝ちユーザー名と負けユーザー名が同じです。"
    }
    if (winFighter == "") {
      return "勝ちファイター名が空欄です。";
    }
    if (loseFighter == "") {
      return "負けファイター名が空欄です。";
    }
    if (Fighter.nameToId[winFighter] == undefined) {
      return "勝ちファイター名が不正です。リストの表記に合わせてください。";
    }
    if (Fighter.nameToId[loseFighter] == undefined) {
      return "負けファイター名が不正です。リストの表記に合わせてください。";
    }

    // 日付
    var pattern = "^202[5-9]-[0-9][0-9]-[0-3][0-9]$";
    var matchResult = this._html_date.val().match(pattern);
    if (matchResult == null) {
      return "日付の形式が不正です。";
    }

    // ストック差
    var stock = this._html_stock;
    if (stock.length != 1) {
      return "ストック差が不正です。";
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
