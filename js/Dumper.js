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

    // 修正や削除時に不整合を防止するため、使用ファイター欄を無効にする
    AccountHtml.SetFighterDisabled();

    // 結果を変数に格納
    var gameRecords = PostDataManager.ParseGameRecordsFromDumpResponse(postRecvData);

    // 結果を解析
    var recordAnalyzer = new RecordAnalyzer(gameRecords);

    // 集計結果を更新
    DumpTotalRecordHtml.Update(recordAnalyzer.TotalRecord());

    // 対戦履歴を更新
    DumpHistoryHtml.Update(gameRecords, Registerer.DumpHistoryOnClick);

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

}
