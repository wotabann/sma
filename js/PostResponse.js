class PostResponse {
  constructor(jsonObject) {
    this.header      = jsonObject.header;
    this.errorString = jsonObject.errorString;
    this.payload     = jsonObject.payload;
  }
}
