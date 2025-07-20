
/**
 * @note 画面ロード時のイベント
 */
$(window).on("load", function() {
  _initializeAccountHtml();
  _initializeRegisterHtml();
  _initializeRecordHtml();
  _initializeDialogHtml();
});



/**
 * @note 登録ボタンのイベントリスナー
 */
function _requestRegister() {
  var registerer = new Registerer();
  registerer.register(false);
}

/**
 * @note 登録＆取得ボタンのイベントリスナー
 */
function _requestRegisterDump() {
  var registerer = new Registerer();
  registerer.register(true);
}

/**
 * @note データ取得ボタンのイベントリスナー
 */
function _requestDump() {
  var dumper = new Dumper();
  dumper.dump();
}

/**
 * @note 登録＆取得ボタンのイベントリスナー(ダイアログ)
 */
function _requestDialogRegister() {
  var registerer = new DialogRegisterer();
  registerer.register(true);
}


/**
 * @note Account欄の初期化
 */
function _initializeAccountHtml() {
  accountHtml = new AccountHtml();
  accountHtml.userName = Util.getDirectoryName();
  accountHtml.fighter = _geDefaultFighter();
  var fighterId = Util.getLocalStorage("fighterId");
  if (fighterId != null) {
    accountHtml.fighter = Fighter.idToName[fighterId];
  }
}

/**
 * @note Register欄の初期化
 */
function _initializeRegisterHtml() {
  var registerHtml = new RegisterHtml();
  registerHtml.date = Util.getToday();
  registerHtml.isVip = _geDefaultIsVip();
  registerHtml.addRegisterRequestButtonOnClick(_requestRegister);
  registerHtml.addRegisterDumpRequestButtonOnClick(_requestRegisterDump);
  var isVip = Util.getLocalStorage("isVip");
  if (isVip != null) {
    registerHtml.isVip = isVip;
  }
}

/**
 * @note Record欄の初期化
 */
function _initializeRecordHtml() {
  var dumpHtml = new DumpHtml();
  dumpHtml.addDumpRequestButtonOnClick(_requestDump);
}

/**
 * @note Dialog欄の初期化
 */
function _initializeDialogHtml() {
  var dialogRegisterHtml = new DialogRegisterHtml();
  dialogRegisterHtml.addRegisterDumpRequestButtonOnClick(_requestDialogRegister);
}


/**
 * @note デフォルトの使用ファイターを取得する
 */
function _geDefaultFighter() {
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
    case "wada":
      return "クッパ";
    case "en":
      return "テリー";
    case "test":
      return "マリオ";
    default:
      return "";
  }
}


/**
 * @note デフォルトのVIP有無を取得する
 */
function _geDefaultIsVip() {
  var dirName = Util.getDirectoryName();
  switch(dirName) {
    case "karinsama":
      return 0;
    case "deme":
      return 0;
    case "kouki":
      return 0;
    case "fumi":
      return 1;
    case "wada":
      return 1;
    case "en":
      return 0;
    case "test":
      return 0;
    default:
      return 0;
  }
}

