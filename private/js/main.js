
/**
 * @note 画面ロード時のイベント
 */
$(window).on("load", function() {
  _initializeInsertHtml();
  _initializeRecordHtml();
});



/**
 * @note 登録ボタンのイベントリスナー
 */
function _requestInsert() {
  var inserter = new Inserter();
  inserter.insert(true);
}

/**
 * @note データ取得ボタンのイベントリスナー
 */
function _requestDump() {
  var dumper = new Dumper();
  dumper.dump();
}

/**
 * @note Insert欄の初期化
 */
function _initializeInsertHtml() {
  var insertHtml = new InsertHtml();
  insertHtml.date = Util.getToday();
  insertHtml.addRequestButtonOnClick(_requestInsert);
}

/**
 * @note Record欄の初期化
 */
function _initializeRecordHtml() {
  var dumpHtml = new DumpHtml();
  dumpHtml.addDumpButtonOnClick(_requestDump);
}

