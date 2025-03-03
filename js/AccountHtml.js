class AccountHtml {

  constructor() {
    this._fighterListHtml = new FighterListHtml();
  }


  get userName()      { return this._html_userName.val(); }
  set userName(value) {        this._html_userName.val(value); }
  get fighter()       { return this._html_fighter.val(); }
  set fighter(value)  {        this._html_fighter.val(value); }

  get _html_userName() { return $("#input-account-username"); }
  get _html_fighter()  { return $("#input-account-fighter"); }


  disableFighter() {
    this._html_fighter.prop("disabled", true);
  }


  /**
   * @return {Account}
   */
  toAccount() {
    var account = new Account();
    account.userName = this.userName;
    account.fighter  = this.fighter;
    return account;
  }


  /**
   * @param {Account} account
   */
  fromAccount(account) {
    this.userName = account.userName;
    this.fighter  = account.fighter;
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
    if (!this._fighterListHtml.isExist(account.fighter)) {
      return "使用ファイターが不正です。\nリストの表記に合わせてください。";
    }

    return "";
  }
}
