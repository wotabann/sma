class DumpRequestButtonHtml {

  constructor() {
  }

  get _html_section() { return $("#dump-request-button"); }
  get _html_button()  { return $(this._html_section.find(".dump-request-button")); }


  addClickListener(callback) {
    this._html_button.on("click", callback);
  }

  enable() {
    this._html_button.prop("disabled", false);
  }

  disable() {
    this._html_button.prop("disabled", true);
  }

}
