
/**
 * @note 画面ロード時のイベント
 */
$(window).on("load", function() {
  AccountHtml.SetUserName("test");
  AccountHtml.SetFighter("マリオ");
  //GameRecordHtml.SetRate(777);
  //GameRecordHtml.SetStock(3);
  //GameRecordHtml.SetFighter("スティーブ／アレックス");

  //AccountHtml.SetUserName(Util.GetDirectoryName());
  //AccountHtml.SetFighter(GetMyFighter());
  GameRecordHtml.SetDate(Util.GetToday());
  GameRecordHtml.SetRegisterButtonClickEvent(DoRegisterWrapper);
});


/**
 * @note 登録する
 */
function DoRegisterWrapper() {
  Registerer.DoRegister();
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
