
/**
 * @note 画面ロード時のイベント
 */
$(window).on("load", function() {
  RegisterFormHtml.SetAccountUserName(Util.GetDirectoryName());
  RegisterFormHtml.SetAccountFighter(GetMyFighter());
  RegisterFormHtml.SetGameRecordDate(Util.GetToday());
  RegisterFormHtml.SetRegisterButtonClickEvent(RegisterButtonClickEvent);
});


/**
 * @note 登録ボタン押下時のイベント
 */
function RegisterButtonClickEvent() {
  RegisterFormHtml.SetRegisterButtonDisabled();
  try {
    DoRegister();
  }
  catch(e) {
    alert("スクリプトエラーが発生しました。");
  }
  RegisterFormHtml.SetRegisterButtonEnabled();
}


/**
 * @note 登録メイン処理
 */
async function DoRegister() {

  // 入力フォームのチェック
  var errorMessage = RegisterFormHtml.ValidateInputs();
  if (errorMessage != "") {
    RegisterFormHtml.SetRegisterResult(errorMessage);
    alert(errorMessage);
    return;
  }

  // ペイロード作成
  var payload = {
    Account:    RegisterFormHtml.GetAccount().ToJsonObject(),
    GameRecord: RegisterFormHtml.GetGameRecord().ToJsonObject(),
  };

  // ポスト
  LoadingHtml.ShowLoading();
  var postRecvData = Poster.PostRegisterRequest(payload);
  LoadingHtml.ClearLoading();

  // 結果のチェック
  if (postRecvData == null) {
    errorMessage = "予期せぬエラーが発生しました。";
    RegisterFormHtml.SetRegisterResult(errorMessage);
    alert(errorMessage);
    return;
  }
  if (postRecvData.ErrorString != "") {
    errorMessage = postRecvData.ErrorString;
    RegisterFormHtml.SetRegisterResult(errorMessage);
    alert(errorMessage);
    return;
  }

  // メッセージ
  RegisterFormHtml.SetRegisterResult(CreateResultString(postRecvData));

  // 入力フォームをクリア
  ClearForm();
}


/**
 * @note 入力フォームをクリアする
 */
function ClearForm() {
  RegisterFormHtml.ClearGameRecordRate();
  RegisterFormHtml.ClearGameRecordStock();
  RegisterFormHtml.ClearGameRecordFighter();
}


/**
 * @note 結果テキストを作成する
 * @param  {PostRecvData} postRecvData
 * @return {String}
 */
function CreateResultString(postRecvData) {
  var msg = "";
  msg = msg + postRecvData.Payload.Date + ", ";
  msg = msg + postRecvData.Payload.Rate + ", ";
  msg = msg + postRecvData.Payload.Stock + ", ";
  msg = msg + postRecvData.Payload.Fighter;
  return msg;
}


/**
 * @note 使用ファイターを取得する
 */
function GetMyFighter() {
  var dirName = Util.GetDirectoryName();
  switch(dirName) {
    case "karinsama":
      return "インクリング";
    case "deme":
      return "ピカチュウ";
    default:
      return "";
  }
}
