class Registerer {
  constructor() {
  }


  /**
   * @note 登録ボタン押下時のイベント
   */
  static async Request() {
    var errorString = "";

    GameRecordHtml.SetResult("");
    GameRecordHtml.SetRequestButtonDisabled();

    try {
      errorString = await this._request();
    }
    catch(e) {
      errorString = "予期せぬエラーが発生しました。";
    }

    if (errorString != "") {
      GameRecordHtml.SetResult(errorString);
      alert(errorString);
    }

    GameRecordHtml.SetRequestButtonEnabled();
  }


  /**
   * @note 登録メイン処理
   * @return {String}
   */
  static async _request() {
    // 汎用データ
    var errorString;
    var gameRecordString;

    // 入力データの取得
    var account = AccountHtml.GetAccount();
    var gameRecord = GameRecordHtml.GetGameRecord();

    // 入力フォームのチェック
    errorString = this._validateInputs();
    if (errorString != "") {
      return errorString;
    }

    // 確認ダイアログ
    gameRecordString = this._createGameRecordText(gameRecord);
    if (!window.confirm("下記の内容で登録しますか？\n" + gameRecordString)) {
      return "";
    }

    // ポスト
    LoadingHtml.ShowLoading();
    var postSendData = PostDataManager.CreateRegisterRequest(account, gameRecord);
    var postRecvData = await Poster.Post(postSendData);
    LoadingHtml.ClearLoading();

    // 結果のチェック
    if (postRecvData == null) {
      return "サーバーとの通信中に予期せぬエラーが発生しました。";
    }
    if (postRecvData.ErrorString != "") {
      return postRecvData.ErrorString;
    }

    // 入力フォームをクリア
    this._clearInputs();

    // 登録結果テキストを更新
    var responseGameRecord = PostDataManager.ParseGameRecordFromRegisterResponse(postRecvData);
    gameRecordString = this._createGameRecordText(responseGameRecord);
    GameRecordHtml.SetResult(gameRecordString);

    return "";
  }


  /**
   * @note   入力フォームのバリデーションを行う
   * @return {String}
   */
  static _validateInputs() {
    var pattern;
    var matchResult;

    // 入力データを取得
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
    pattern = "^[0-9]{1,4}$";
    matchResult = gameRecord.Id.match(pattern);
    if (matchResult == null) {
      return "IDが不正です。";
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


  /**
   * @note 対戦結果を1行テキストにする
   * @param  {GameRecord} gameRecord
   * @return {String}
   */
  static _createGameRecordText(gameRecord) {
    var msg = "";
    msg = msg + gameRecord.Date + ", ";
    msg = msg + gameRecord.Rate + ", ";
    msg = msg + gameRecord.Stock + ", ";
    msg = msg + gameRecord.Fighter;
    return msg;
  }


  /**
   * @note 入力フォームをクリアする
   */
  static _clearInputs() {
    GameRecordHtml.ClearRate();
    GameRecordHtml.ClearStock();
    GameRecordHtml.ClearFighter();
    GameRecordHtml.ClearId();
  }

}
