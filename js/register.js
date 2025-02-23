
/**
 * @note 画面ロード時のイベント
 */
$(window).on("load", function() {
  AccountHtml.SetUserName(Util.GetDirectoryName());
  AccountHtml.SetFighter(GetMyFighter());
  GameRecordHtml.SetDate(Util.GetToday());
  GameRecordHtml.SetRequestButtonClickEvent(RequestRegister);
  DumpHtml.SetRequestButtonClickEvent(RequestDump);
});


function RequestDump() {
  Dumper.Request();
}

/**
 * @note 登録する
 */
function RequestRegister() {
  Registerer.Request();
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
      case "test":
        return "マリオ";
    default:
      return "";
  }
}
