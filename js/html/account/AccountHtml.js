class AccountHtml {

  constructor() {
  }

  get _html_section()  { return $("#account"); }
  get _html_body()     { return $(this._html_section.children(".section-body")); }
  get _html_userName() { return $(this._html_body.find("#account-form-username")); }
  get _html_fighter()  { return $(this._html_body.find("#account-form-fighter")); }

  get userName()      { return this._html_userName.val(); }
  set userName(value) {        this._html_userName.val(value); }
  get fighter()       { return this._html_fighter.val(); }
  set fighter(value)  {        this._html_fighter.val(value); }


  disableFighter() {
    this._html_fighter.prop("disabled", true);
  }


  /**
   * @return {Account}
   */
  toAccount() {
    var account = new Account();
    account.userName  = this.userName;
    account.fighterId = Fighter.nameToId[this.fighter];
    return account;
  }


  /**
   * @param {Account} account
   */
  fromAccount(account) {
    this.userName = account.userName;
    this.fighter  = Fighter.idToName[account.fighterId];
  }


  /**
   * @return {String}
   */
  validateInputs() {
    var pattern;
    var matchResult;

    // 入力データを取得
    var account = this.toAccount();

    // アカウント
    pattern = "^.+$";
    matchResult = account.userName.match(pattern);
    if (matchResult == null) {
      return "アカウント名が不正です。";
    }

    // 使用ファイター
    if (account.fighterId == undefined) {
      return "使用ファイターが不正です。\nリストの表記に合わせてください。";
    }

    return "";
  }


}
