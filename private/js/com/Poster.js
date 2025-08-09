class Poster {

  constructor() {
    this._URL = "https://script.google.com/macros/s/AKfycbyGq8ipG2f4OaY3iQiO3EL_GFSg-CpVv-Wq9u2XDllMZCv4KfAovy0Ef1-HrvhVkDo/exec";
    this._loadingHtml = new LoadingHtml();
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

    try {
      this._loadingHtml.showLoading();

      const response = await fetch(this._URL, options);
      const data = await response.json();
      var postResponse = new PostResponse(data);

      this._loadingHtml.hideLoading();

      return postResponse;
    }
    catch (e) {
      this._loadingHtml.hideLoading();
      throw e;
    }

  }
}