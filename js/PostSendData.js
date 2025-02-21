class PostSendData {
  constructor() {
    this.Header = "";
    this.Payload = {};
  }

  ToJsonObject() {
    var data = {
      Header:  this.Header,
      Payload: this.Payload
    };
    return data;
  }
}
