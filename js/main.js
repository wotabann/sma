/**
 * @note 画面ロード時のイベント
 */
AccountHtml.SetUserName(Util.GetDirectoryName());
AccountHtml.SetFighter(GetMyFighter());
GameRecordHtml.SetDate(Util.GetToday());
GameRecordHtml.SetRequestButtonClickEvent(RequestRegister);
DumpHtml.SetRequestButtonClickEvent(RequestDump);


/**
 * @note 登録ボタンのイベントリスナー
 */
function RequestRegister() {
  Registerer.Request();
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
    case "test":
      return "マリオ";
    default:
      return "";
  }
}
