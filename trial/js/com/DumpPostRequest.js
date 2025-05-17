class DumpPostRequest {
  /**
   * @param  {Account} account
   */
  constructor(account) {
    var payload = {
      account: account.toJsonObject(),
    };

    this._postRequest = new PostRequest("DumpRequest", payload);
  }

  /**
   * @return {PostRequest}
   */
  get postRequest() {
    return this._postRequest;
  }

}
