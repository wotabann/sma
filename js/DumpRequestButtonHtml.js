class DumpRequestButtonHtml {

  constructor() {
  }


  get _html_dumpRequestButton() { return $("#dump-request-button"); }


  addDumpRequestButtonOnClick(fnc) {
    this._html_dumpRequestButton.on("click", fnc);
  }

  enableDumpRequestButton() {
    this._html_dumpRequestButton.prop("disabled", false);
  }


  /**
   * @note   ボタンを無効にする
   */
  disableDumpRequestButton() {
    this._html_dumpRequestButton.prop("disabled", true);
  }

}
