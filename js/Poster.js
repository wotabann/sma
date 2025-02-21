class Poster {

  // 通信中フラグ
  static _isCommunicating = false;

  // URL
  static _url = "https://script.google.com/macros/s/AKfycbxCdDEdjIlQVzbH6QzQ1A5Jq6Hbw0Z9nbGr2w1LH27hmUjumDlI5bbPTTt6Y3SWbJ73/exec";

  
  /**
   * @note コンストラクタ
   */
  constructor() {
  }


  /**
   * @note   戦績登録のリクエストをする
   * @param  {jsonObject} payload
   * @return {PostRecvData}
   */
  static PostRegisterRequest(payload) {
    var postSendData = new PostSendData();
    postSendData.Header = "register";
    postSendData.Payload = payload;

    return Poster._post(postSendData);
  }


  /**
   * @note   ポストする
   * @param  {PostSendData} postSendData
   * @return {PostRecvData}
   */
  static _post(postSendData) {
    var postRecvData = null;

    // 通信中かどうか確認
    if (this._isCommunicating) {
      return null;
    }
    this._isCommunicating = true;

    // ポスト実行
    $.ajax({
      type: "POST",
      url: this._url,
      async: false,
      cache: false,
      dataType: "json",
      data: JSON.stringify(postSendData.ToJsonObject())
    })
    .done(function(data, textStatus, jqXHR) {
      postRecvData = new PostRecvData(JSON.parse(JSON.stringify(data)));
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
    })
    .always(function() {
      this._isCommunicating = false;
    })
  
    return postRecvData;
  }
}