class Registerer {
  constructor() {
  }


  /**
   * @note 登録ボタン押下時のイベント
   */
  static async Request(isDump) {
    var errorString = "";

    GameRecordHtml.SetResult("");
    GameRecordHtml.SetRequestButtonDisabled();

    try {
      errorString = await Registerer._request(isDump);
    }
    catch(e) {
      alert(e.stack);
      errorString = "予期せぬエラーが発生しました。";
    }

    if (errorString != "") {
      GameRecordHtml.SetResult(errorString);
      alert(errorString);
    }

    GameRecordHtml.SetRequestButtonEnabled();
  }


  /**
   * @note 修正ボタン押下時のイベント
   * @return {Boolean}
   */
  static async PreUpdate(gameRecord) {
    var errorString = "";

    GameRecordHtml.SetRequestButtonDisabled();

    try {
      errorString = await Registerer._preUpdate(gameRecord);
    }
    catch(e) {
      errorString = "予期せぬエラーが発生しました。";
    }

    if (errorString != "") {
      alert(errorString);
    }

    GameRecordHtml.SetRequestButtonEnabled();

    return (errorString == "");
  }


  /**
   * @note 削除ボタン押下時のイベント
   * @return {Boolean}
   */
  static async Delete(gameRecord) {
    var errorString = "";

    GameRecordHtml.SetRequestButtonDisabled();

    try {
      errorString = await Registerer._deleteRestore(gameRecord, true);
    }
    catch(e) {
      errorString = "予期せぬエラーが発生しました。";
    }

    if (errorString != "") {
      alert(errorString);
    }

    GameRecordHtml.SetRequestButtonEnabled();

    return (errorString == "");
  }


  /**
   * @note 復活ボタン押下時のイベント
   * @return {Boolean}
   */
  static async Restore(gameRecord) {
    var errorString = "";

    GameRecordHtml.SetRequestButtonDisabled();

    try {
      errorString = await Registerer._deleteRestore(gameRecord, false);
    }
    catch(e) {
      errorString = "予期せぬエラーが発生しました。";
    }

    if (errorString != "") {
      alert(errorString);
    }

    GameRecordHtml.SetRequestButtonEnabled();

    return (errorString == "");
  }


  /**
   * @note   
   * @param {GameRecord} gameRecord
   */
  static async DumpHistoryOnClick(gameRecord) {
    var msg = "";
    msg += "【" + Registerer._createGameRecordText(gameRecord) + "】\n";
    msg += "実行したい操作を入力してください。\n";
    msg += "(\"修正\" or \"削除\" or \"復活\")";

    var text = prompt(msg);
    switch (text) {
      case "修正":
        await Registerer.PreUpdate(gameRecord);
        break;
      case "削除":
        await Registerer.Delete(gameRecord);
        break;
      case "復活":
        await Registerer.Restore(gameRecord);
        break;
      case null:
        break;
      default:
        alert("未定義の操作のためキャンセルされました。");
    }
    return;
  }


  /**
   * @note 登録メイン処理
   * @return {String}
   */
  static async _request(isDump) {
    // 汎用データ
    var errorString = "";

    // 入力データの取得
    var account = AccountHtml.GetAccount();
    var gameRecord = GameRecordHtml.GetGameRecord();
    var operation = (gameRecord.Id > 0) ? "Update" : "Insert";

    // 入力フォームのチェック
    errorString = this._validateInputs();
    if (errorString != "") {
      return errorString;
    }

    // 現在時刻と日付欄の乖離のチェック

    // 確認ダイアログ
    var msg = "";
    msg += "下記の内容で登録ます。\nよろしいですか？\n";
    msg += "【" + this._createGameRecordText(gameRecord) + "】";
    if (gameRecord.Id > 0) {
      msg += "\n\n※※指定のIDで上書きされます※※";
    }
    else {
      if (!(this._isDateInRange())) {
        msg += "\n\n※※日付欄と現在時刻に乖離があります※※";
      }
    }
    if (!window.confirm(msg)) {
      return "";
    }

    // ポスト
    LoadingHtml.ShowLoading();
    var postSendData = PostDataManager.CreateRegisterRequest(account, gameRecord, operation, isDump);
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
    var gameRecordString = this._createGameRecordText(responseGameRecord);
    GameRecordHtml.SetResult(gameRecordString);

    // データ取得時の更新
    if (isDump) {
      AccountHtml.SetFighterDisabled();
      await Registerer._dump(postRecvData);
    }

    // データ修正時は日付欄を最新にしておく
    GameRecordHtml.SetDate(Util.GetToday());

    return "";
  }


  /**
   * @note 修正対象を対戦結果欄に反映する。
   * @param {GameRecord} gameRecord
   */
  static _preUpdate(gameRecord) {
    var date = gameRecord.Date.substr(0, 10).replaceAll("/", "-");
    GameRecordHtml.SetId(gameRecord.Id);
    GameRecordHtml.SetDate(date);
    GameRecordHtml.SetRate(gameRecord.Rate);
    GameRecordHtml.SetStock(gameRecord.Stock);
    GameRecordHtml.SetFighter(gameRecord.Fighter);
    $(window).scrollTop(0);

    var msg = "";
    msg += "対象を結果登録欄に反映しました。\n";
    msg += "内容を修正して再度登録してください。\n";
    msg += "\n";
    msg += "※※ 注意 ※※\n";
    msg += "取り消す場合はページをリロードしてください。\n";
    msg += "(編集対象のIDがクリアされないため)";
    alert(msg);

    return "";
  }


  /**
   * @note 戦績の削除処理
   * @param  {GameRecord} gameRecord
   * @param  {Boolean}    isDelete
   * @return {String}
   */
  static async _deleteRestore(gameRecord, isDelete) {
    var msg = "";
    var operation = isDelete ? "Delete" : "Restore";

    if (isDelete) {
      msg += "下記の戦績を削除します。\n";
      msg += "本当によろしいですか？\n";
    }
    else {
      msg += "下記の戦績を復活させますか？\n";
    }
    msg += "【" + this._createGameRecordText(gameRecord) + "】";

    // 確認ダイアログ
    if (!window.confirm(msg)) {
      return "";
    }

    // 入力データの取得
    var account = AccountHtml.GetAccount();
    gameRecord.IsDeleted = isDelete;

    // ポスト
    LoadingHtml.ShowLoading();
    var postSendData = PostDataManager.CreateRegisterRequest(account, gameRecord, operation, true);
    var postRecvData = await Poster.Post(postSendData);
    LoadingHtml.ClearLoading();

    // 結果のチェック
    if (postRecvData == null) {
      return "サーバーとの通信中に予期せぬエラーが発生しました。";
    }
    if (postRecvData.ErrorString != "") {
      return postRecvData.ErrorString;
    }

    // データを取得時の更新
    await Registerer._dump(postRecvData);

    return "";
  }


  /**
   * @note データを取得した時の処理。役割分担がクソだけどもうどうでもいい。
   * @param  {PostRecvData} postRecvData
   */
  static _dump(postRecvData) {

    // 結果を変数に格納
    var gameRecords = PostDataManager.ParseGameRecordsFromRegisterResponse(postRecvData);

    // 結果を解析
    var recordAnalyzer = new RecordAnalyzer(gameRecords);

    // 集計結果を更新
    DumpTotalRecordHtml.Update(recordAnalyzer.TotalRecord());

    // 対戦履歴を更新
    DumpHistoryHtml.Update(gameRecords, Registerer.DumpHistoryOnClick);

    // 相手キャラ毎の戦績を更新
    DumpFighterRecordHtml.Update(recordAnalyzer.FighterRecords());
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
   * @note   現在時刻と日付に乖離がないか調べる
   * @return {Boolean}
   */
  static _isDateInRange() {
    var gameRecord = GameRecordHtml.GetGameRecord();

    // 現在時刻の日付と一致なら乖離なし。
    if (gameRecord.Date == Util.GetToday()) {
      return true;
    }

    // 現在時刻の4時間前までは乖離なしと見なす。
    var now = new Date();
    var date = new Date(now - (1000 * 60 * 60 * 4));
    const yyyy = date.getFullYear();
    const mm = ('00' + (date.getMonth()+1)).slice(-2);
    const dd = ('00' + date.getDate()).slice(-2);
    if (gameRecord.Date == `${yyyy}-${mm}-${dd}`) {
      return true;
    }

    // 上記以外は日付の乖離アリと見なす。
    return false;
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
