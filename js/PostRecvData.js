class PostRecvData {
  constructor(jsonObject) {
    this.Header      = jsonObject.Header;
    this.ErrorString = jsonObject.ErrorString;
    this.Payload     = jsonObject.Payload;
  }
}
