class Dumper {
  constructor() {
  }


  /**
   * @note データ取得のメイン処理
   */
  static async Request() {
    var errorString = "";

    DumpHtml.SetRequestButtonDisabled();

    try {
      errorString = await this._request();
    }
    catch(e) {
      alert(e.stack);
      errorString = "予期せぬエラーが発生しました。";
    }

    if (errorString != "") {
      alert(errorString);
    }

    DumpHtml.SetRequestButtonEnabled();
  }


  /**
   * @note データ取得のメイン処理
   */
  static async _request() {
    // 汎用データ
    var errorString;

    // 入力データの取得
    var account = AccountHtml.GetAccount();

    // 入力フォームのチェック
    errorString = this._validateInputs();
    if (errorString != "") {
      return errorString;
    }

    // ポスト
    LoadingHtml.ShowLoading();
    var postSendData = PostDataManager.CreateDumpRequest(account);
    var postRecvData = await Poster.Post(postSendData);
    LoadingHtml.ClearLoading();

    // 結果のチェック
    if (postRecvData == null) {
      return "サーバーとの通信中に予期せぬエラーが発生しました。";
    }
    if (postRecvData.ErrorString != "") {
      return postRecvData.ErrorString;
    }

    // 結果を変数に格納
    var gameRecords = PostDataManager.ParseGameRecordsFromDumpResponse(postRecvData);

    // 結果を解析
    var recordAnalyzer = new RecordAnalyzer(gameRecords);

    // 集計結果を更新
    DumpTotalRecordHtml.Update(recordAnalyzer.TotalRecord());

    // 対戦履歴を更新
    DumpHistoryHtml.Update(gameRecords, Dumper._historyOnClick);

    // 相手キャラ毎の戦績を更新
    DumpFighterRecordHtml.Update(recordAnalyzer.FighterRecords());
    
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

    return "";
  }



  /**
   * @note 対戦履歴のクリックイベント
   * @param {GameRecord} gameRecord
   */
  static async _historyOnClick(gameRecord) {
    var operation;
    if (gameRecord.IsDeleted) {
      operation = "(\"修正\" or \"復活\")";
    }
    else {
      operation = "(\"修正\" or \"削除\")";
    }

    var msg = "";
    msg += gameRecord.Date.substr(0, 10) + ", ";
    msg += gameRecord.Rate + ", ";
    msg += gameRecord.Stock + ", ";
    msg += gameRecord.Fighter + "\n";
    msg += "\n";
    msg += "実行したい操作を入力してください。\n";
    msg += "(\"修正\" or \"削除\" or \"復活\")";

    var isSucceeded;
    var text = prompt(msg);
    switch (text) {
      case "修正":
        await Registerer.PreUpdate(gameRecord);
        return;
      case "削除":
        isSucceeded = await Registerer.Delete(gameRecord);
        if (isSucceeded) {
          gameRecord.IsDeleted = true;
          DumpHistoryHtml.UpdateRow(gameRecord);
        }
        return;
      case "復活":
        isSucceeded = await Registerer.Restore(gameRecord);
        if (isSucceeded) {
          gameRecord.IsDeleted = false;
          DumpHistoryHtml.UpdateRow(gameRecord);
        }
        return;
      case null:
        return;
    }
    alert("未定義の操作のためキャンセルされました。");
    return;
  }

}
