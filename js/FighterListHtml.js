class FighterListHtml {

  constructor() {
  }


  get _html_fighterList() { return $("#fighter-list"); }


  /**
   * @note ファイター名がリストにあるか調べる
   * @param  {String} fighter
   * @return {Boolean}
   */
  isExist(fighter) {
    var matchResult = this._html_fighterList.children("option").filter(function(index){
      return $(this).val() === fighter
    });
    return (matchResult.val() != undefined);
  }
}
