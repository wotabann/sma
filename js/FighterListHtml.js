class FighterListHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getFighterListObject() { return $("#fighter-list"); }


  /**
   * @note ファイター名がリストにあるか調べる
   * @param  {String} fighter
   * @return {Boolean}
   */
  static IsExist(fighter) {
    var matchResult = this._getFighterListObject().children("option").filter(function(index){
      return $(this).val() === fighter
    });
    return (matchResult.val() != undefined);
  }
}
