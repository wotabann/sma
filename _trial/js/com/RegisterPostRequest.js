class RegisterPostRequest {
  /**
   * @param  {Account}    account
   * @param  {GameRecord} gameRecord
   * @param  {String}     operation
   * @param  {Boolean}    isDump
   */
  constructor(account, gameRecord, operation, isDump) {
    var payload = {
      account:    account.toJsonObject(),
      gameRecord: gameRecord.toJsonObject(),
      operation:  operation,
      isDump:     isDump,
    };
    this._postRequest = new PostRequest("RegisterRequest", payload);
  }

  /**
   * @return {PostRequest}
   */
  get postRequest() {
    return this._postRequest;
  }

}
