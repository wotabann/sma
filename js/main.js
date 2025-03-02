
/**
 * @note 画面ロード時のイベント
 */
$(window).on("load", function() {
  var accountHtml = new AccountHtml();
  accountHtml.userName = Util.getDirectoryName();
  accountHtml.fighter = _getMyFighter();

  var registerHtml = new RegisterHtml();
  registerHtml.date = Util.getToday();
  registerHtml.addRegisterRequestButtonOnClick(_requestRegister);
  registerHtml.addRegisterDumpRequestButtonOnClick(_requestRegisterDump);

  var dumpHtml = new DumpHtml();
  dumpHtml.addDumpRequestButtonOnClick(_requestDump);
});



/**
 * @note 登録ボタンのイベントリスナー
 */
function _requestRegister() {
  var registerer = new Registerer();
  registerer.insertUpdate(false);
}


/**
 * @note 登録＆取得ボタンのイベントリスナー
 */
function _requestRegisterDump() {
  var registerer = new Registerer();
  registerer.insertUpdate(true);
}


/**
 * @note データ取得ボタンのイベントリスナー
 */
function _requestDump() {
  var dumper = new Dumper();
  dumper.dump();
}


/**
 * @note 使用ファイターを取得する
 */
function _getMyFighter() {
  var dirName = Util.getDirectoryName();
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
