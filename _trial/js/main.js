
/**
 * @note 画面ロード時のイベント
 */
$(window).on("load", function() {
  var fighterListHtml = new FighterListHtml();

  // Account欄
  accountHtml = new AccountHtml($("#account"), fighterListHtml);
  accountHtml.userName = Util.getDirectoryName();
  accountHtml.fighter = _getMyFighter();

  // Register欄
  var registerHtml = new RegisterHtml($("#register"), fighterListHtml);
  registerHtml.date = Util.getToday();
  registerHtml.addRegisterRequestButtonOnClick(_requestRegister);
  registerHtml.addRegisterDumpRequestButtonOnClick(_requestRegisterDump);

  // Record欄
  var dumpHtml = new DumpHtml();
  dumpHtml.addDumpRequestButtonOnClick(_requestDump);

  // cookie処理
  var latestFighter = $.cookie('fighter');
  var latestIsVip   = $.cookie('isVip');
  if (latestFighter != undefined) {
    accountHtml.fighter = latestFighter;
  }
  if (latestIsVip != undefined) {
    registerHtml.isVip = latestIsVip;
  }
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
