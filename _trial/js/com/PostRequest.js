class PostRequest {
  constructor(header, payload) {
    this._header  = header;
    this._payload = payload;
  }

  toJsonObject() {
    var data = {
      header:  this._header,
      payload: this._payload
    };
    return data;
  }
}
