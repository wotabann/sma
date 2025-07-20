class Util {
  /**
   * @note 本日の日付をyyyy-mm-ddで取得する
   * @return {String}
   */
  static getToday() {
    const dateTime = new Date();
    const date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
    const yyyy = date.getFullYear();
    const mm = ('00' + (date.getMonth()+1)).slice(-2);
    const dd = ('00' + date.getDate()).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  }


  /**
   * @note ディレクトリ名を取得する
   * @return {String}
   */
  static getDirectoryName() {
    var loc = location.pathname.split("/"); //パス名を/で分割して取得
    var dirName = loc[loc.length - 2]; // 文字列の後ろから２番目を取得
    return dirName;
  }


  /**
   * @note 全てのボタンを無効化する
   */
  static disableAllButtons() {
    $( "button" ).prop( "disabled", true );
  }


  /**
   * @note 全てのボタンを有効化する
   */
  static enableAllButtons() {
    $( "button" ).prop( "disabled", false );
  }


  /**
   * @note LocalStorageに登録情報を保存する
   * @param {Account} account
   * @param {GameRecord} gameRecord
   */
  static setRecordToLocalStorage(userName, account, gameRecord) {
    try {
      var jsonObject = {
        account:    account.toJsonObject(),
        gameRecord: gameRecord.toJsonObject(),
      };
      localStorage.setItem(userName, JSON.stringify(jsonObject));
    }
    catch (e) {
      // 何もしない
    }
  }

  /**
   * @note LocalStorageからアカウント情報を取得する
   * @return {Account}
   */
  static getAccountFromLocalStorage(userName) {
    try {
      var jsonObject = JSON.parse(localStorage.getItem(userName));
      var account = new Account();
      account.userName  = jsonObject.account.userName;
      account.fighterId = jsonObject.account.fighterId;
      return account;
    }
    catch (e) {
      return null;
    }
  }

  /**
   * @note LocalStorageからアカウント情報を取得する
   * @return {GameRecord}
   */
  static getGameRecordFromLocalStorage(userName) {
    try {
      var jsonObject = JSON.parse(localStorage.getItem(userName));
      var gameRecord = new GameRecord();
      gameRecord.id         = jsonObject.gameRecord.id;
      gameRecord.date       = jsonObject.gameRecord.date;
      gameRecord.rate       = jsonObject.gameRecord.rate;
      gameRecord.stock      = jsonObject.gameRecord.stock;
      gameRecord.fighterId  = jsonObject.gameRecord.fighterId;
      gameRecord.isVip      = jsonObject.gameRecord.isVip;
      gameRecord.isDisabled = jsonObject.gameRecord.isDisabled;
      return gameRecord;
    }
    catch (e) {
      return null;
    }
  }
}
