class Poster {

  // URL
  static _url = "https://script.google.com/macros/s/AKfycbxCdDEdjIlQVzbH6QzQ1A5Jq6Hbw0Z9nbGr2w1LH27hmUjumDlI5bbPTTt6Y3SWbJ73/exec";

  
  /**
   * @note コンストラクタ
   */
  constructor() {
  }


  
  /**
   * @note   戦績登録のリクエストをする
   * @param  {JsonObject} payload
   * @return {PostRecvData}
   */
  static async PostRegisterRequest(payload) {
    var postSendData = new PostSendData();
    postSendData.Header = "register";
    postSendData.Payload = payload;

    return this._fetchData(postSendData);
  }


  /**
   * @note   ポストする
   * @param  {PostSendData} postSendData
   * @return {PostRecvData}
   */
  static async _fetchData(postSendData) {
    const options = {
      'method': "POST",
      'body': JSON.stringify(postSendData.ToJsonObject()),
      "Content-Type" : "application/json"
    };

    try {
      const response = await fetch(this._url, options);
      const data = await response.json();
      var postRecvData = new PostRecvData(data);
      return postRecvData;
    } catch (error) {
      return null;
    }
  }


  


  /**
   * @note   ポストする
   * @param  {PostSendData} postSendData
   * @return {PostRecvData}
   */
  static _post2(postSendData) {
    var postRecvData = null;

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
    })
  
    return postRecvData;
  }
}