class Registerer {
  constructor() {
  }


  /**
   * @note 登録ボタン押下時のイベント
   */
  static DoRegister() {
    GameRecordHtml.SetRegisterButtonDisabled();

    try {
      this._doRegister();
    }
    catch(e) {
      var errorString = "予期せぬエラーが発生しました。";
      GameRecordHtml.SetResult(e);
      alert(e);
    }
  
    GameRecordHtml.SetRegisterButtonEnabled();
  }


  /**
   * @note 登録メイン処理
   */
  static async _doRegister() {
    // 入力フォームのチェック
    var errorString = this._validateInputs();
    if (errorString != "") {
      GameRecordHtml.SetResult(errorString);
      alert(errorString);
      return;
    }

    // 確認ダイアログ
    var confirmString = this._createConfirmString();
    if (!window.confirm(confirmString)) {
      LoadingHtml.ClearLoading();
      GameRecordHtml.SetRegisterButtonEnabled();
      return;
    }

    // ペイロード作成
    var payload = {
      Account:    AccountHtml.GetAccount().ToJsonObject(),
      GameRecord: GameRecordHtml.GetGameRecord().ToJsonObject(),
    };

    // ポスト
    LoadingHtml.ShowLoading();
    var postRecvData = await Poster.PostRegisterRequest(payload);
    LoadingHtml.ClearLoading();

    // 結果のチェック
    if (postRecvData == null) {
      errorString = "予期せぬエラーが発生しました。";
      GameRecordHtml.SetResult(errorString);
      alert(errorString);
      return;
    }
    if (postRecvData.ErrorString != "") {
      errorString = postRecvData.ErrorString;
      GameRecordHtml.SetResult(errorString);
      alert(errorString);
      return;
    }

    // メッセージ
    GameRecordHtml.SetResult(this._createResultString(postRecvData));

    // 入力フォームをクリア
    this._clearInputs();
  }


  /**
   * @note 入力フォームをクリアする
   */
  static _clearInputs() {
    GameRecordHtml.ClearRate();
    GameRecordHtml.ClearStock();
    GameRecordHtml.ClearFighter();
  }


  /**
   * @note 登録確認テキストを作成する
   * @return {String}
   */
  static _createConfirmString() {
    var msg = "";
    var gameRecord = GameRecordHtml.GetGameRecord();
    msg = msg + "【日付】 " + gameRecord.Date + "\n";
    msg = msg + "【戦闘力】 " + gameRecord.Rate + "\n";
    msg = msg + "【スト差】 " + gameRecord.Stock + "\n";
    msg = msg + "【相手】 " + gameRecord.Fighter + "\n";
    msg = msg + "上記の内容でよろしいですか？"
    return msg;
  }


  /**
   * @note 結果テキストを作成する
   * @param  {PostRecvData} postRecvData
   * @return {String}
   */
  static _createResultString(postRecvData) {
    var msg = "";
    msg = msg + postRecvData.Payload.Date + ", ";
    msg = msg + postRecvData.Payload.Rate + ", ";
    msg = msg + postRecvData.Payload.Stock + ", ";
    msg = msg + postRecvData.Payload.Fighter;
    return msg;
  }


  /**
   * @note   入力フォームのバリデーションを行う
   * @return {String}
   */
  static _validateInputs() {
    var pattern;
    var matchResult;

    var account = AccountHtml.GetAccount();
    var gameRecord = GameRecordHtml.GetGameRecord();

    // アカウント
    pattern = "^.+$";
    matchResult = account.UserName.match(pattern);
    if (matchResult == null) {
      return "アカウント名が不正です。";
    }

    // 使用ファイター
    if (!FighterListHtml.IsExist(account.Fighter)) {
      return "使用ファイターが不正です。";
    }

    // 日付
    pattern = "^202[5-9]-[0-9][0-9]-[0-3][0-9]$";
    matchResult = gameRecord.Date.match(pattern);
    if (matchResult == null) {
      return "日付の形式が不正です。";
    }

    // 戦闘力
    pattern = "^[0-9]{3,4}$";
    matchResult = gameRecord.Rate.match(pattern);
    if (matchResult == null) {
      return "戦闘力が不正です。";
    }

    // ストック差
    pattern = "^[\-]{0,1}[0-5]$";
    matchResult = gameRecord.Stock.match(pattern);
    if (matchResult == null) {
      return "ストック差が不正です。";
    }

    // 相手ファイター
    if (!FighterListHtml.IsExist(gameRecord.Fighter)) {
      return "相手ファイターが不正です。";
    }

    return "";
  }

}
