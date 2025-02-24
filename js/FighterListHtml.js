class FighterListHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getFighterListHtml() { return $("#fighter-list"); }


  /**
   * @note ファイター名がリストにあるか調べる
   * @param  {String} fighter
   * @return {Boolean}
   */
  static IsExist(fighter) {
    var matchResult = this._getFighterListHtml().children("option").filter(function(index){
      return $(this).val() === fighter
    });
    return (matchResult.val() != undefined);
  }
}
