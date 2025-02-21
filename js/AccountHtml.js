class AccountHtml {
  constructor() {
  }
  
  // 各要素の取得
  static _getUserNameObject() { return $("#register-account-username"); }
  static _getFighterObject()  { return $("#register-account-fighter"); }

  // 各要素のセット
  static SetUserName(txt) { this._getUserNameObject().val(txt); }
  static SetFighter(txt)  { this._getFighterObject().val(txt); }

  /**
   * @note   Accountの入力値を取得する
   * @return {Account}
   */
  static GetAccount() {
    var account = new Account();
    account.UserName = this._getUserNameObject().val();
    account.Fighter =  this._getFighterObject().val();
    return account;
  }
}
