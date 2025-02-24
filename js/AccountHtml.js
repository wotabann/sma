class AccountHtml {
  constructor() {
  }
  
  // 各要素の取得
  static _getUserNameHtml() { return $("#register-account-username"); }
  static _getFighterHtml()  { return $("#register-account-fighter"); }

  // 各要素のセット
  static SetUserName(txt) { this._getUserNameHtml().val(txt); }
  static SetFighter(txt)  { this._getFighterHtml().val(txt); }

  /**
   * @note   Accountの入力値を取得する
   * @return {Account}
   */
  static GetAccount() {
    var account = new Account();
    account.UserName = this._getUserNameHtml().val();
    account.Fighter =  this._getFighterHtml().val();
    return account;
  }
}
