
/**
 * @note 画面ロード時のイベント
 */
$(window).on("load", function() {
  AccountHtml.SetUserName(Util.GetDirectoryName());
  AccountHtml.SetFighter(GetMyFighter());
  GameRecordHtml.SetDate(Util.GetToday());
  GameRecordHtml.SetRequestButtonClickEvent(RequestRegister);
  GameRecordHtml.SetRequestDumpButtonClickEvent(RequestRegisterDump);
  DumpHtml.SetRequestButtonClickEvent(RequestDump);
});



/**
 * @note 登録ボタンのイベントリスナー
 */
function RequestRegister() {
  Registerer.Request(false);
}


/**
 * @note 登録＆取得ボタンのイベントリスナー
 */
function RequestRegisterDump() {
  Registerer.Request(true);
}


/**
 * @note データ取得ボタンのイベントリスナー
 */
function RequestDump() {
  Dumper.Request();
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
    case "kouki":
      return "ベレト／ベレス";
    case "fumi":
      return "ジョーカー";
    case "test":
      return "マリオ";
    default:
      return "";
  }
}
