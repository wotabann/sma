class Poster {

  constructor() {
    //this._URL = "https://script.google.com/macros/s/AKfycbxCdDEdjIlQVzbH6QzQ1A5Jq6Hbw0Z9nbGr2w1LH27hmUjumDlI5bbPTTt6Y3SWbJ73/exec";
    this._URL = "https://script.google.com/macros/s/AKfycbxxb6AjFCaVv3vEUWtw13AXmBKt7e7ivXEkNzINPUrTedQnq9InGK_tZb7Rfo8hhJbr/exec";
  }


  /**
   * @note   ポストする
   * @param  {PostRequest} postRequest
   * @return {PostResponse}
   */
  async post(postRequest) {
    const options = {
      'method': "POST",
      'body': JSON.stringify(postRequest.toJsonObject()),
      "Content-Type" : "application/json"
    };
    const response = await fetch(this._URL, options);
    const data = await response.json();
    var postResponse = new PostResponse(data);
    return postResponse;
  }
}