class DumpButtonHtml {

  constructor() {
  }

  get _html_section() { return $("#dump-button"); }
  get _html_button()  { return $(this._html_section.find(".dump-button")); }


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
