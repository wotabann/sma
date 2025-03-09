class DumpHistoryListRowHtml {

  constructor(html_listRow) {
    this._html_listRow = html_listRow;
  }


  set notice(txt)        { this._html_notice.text(txt); }


  get _html_id()         { return this._html_listRow.children(".id"); }
  get _html_date()       { return this._html_listRow.children(".date"); }
  get _html_rate()       { return this._html_listRow.children(".rate"); }
  get _html_stock()      { return this._html_listRow.children(".stock"); }
  get _html_fighter()    { return this._html_listRow.children(".fighter"); }
  get _html_isVip()      { return this._html_listRow.children(".is-vip"); }
  get _html_isDeleted()  { return this._html_listRow.children(".is-deleted"); }
  get _html_noticeIcon() { return this._html_listRow.children(".notice-icon"); }
  get _html_notice()     { return this._html_noticeIcon.children(".notice"); }

  
  /**
   * @note 表示を更新する。
   * @param  {GameRecord} gameRecord
   * @param  {Object}     onClick
   */
  update(gameRecord, onClick) {
    this._fromGameRecord(gameRecord);
    this._setFont(gameRecord);
    this._html_listRow.on("click", { onClick: onClick }, this._onClick.bind(this));
  }

  
  /**
   * @note 注釈を表示する。
   */
  showNotice() {
    this._html_notice.show();
    this._html_noticeIcon.show();
  }

  
  /**
   * @note 注釈を隠す。
   */
  hideNotice() {
    this._html_notice.hide();
    this._html_noticeIcon.hide();
  }

  
  /**
   * @note 行の内容をGameRecordとして返す。
   * @return {GameRecord}
   */
  _toGameRecord() {
    var gameRecord = new GameRecord();
    gameRecord.id        = this._html_id.data("raw");
    gameRecord.date      = this._html_date.data("raw");
    gameRecord.rate      = this._html_rate.data("raw");
    gameRecord.stock     = this._html_stock.data("raw");
    gameRecord.fighter   = this._html_fighter.data("raw");
    gameRecord.isVip     = this._html_isVip.data("raw");
    gameRecord.isDeleted = this._html_isDeleted.data("raw");
    return gameRecord;
  }


  /**
   * @note GameRecordを行の内容に反映する。
   * @param {GameRecord} gameRecord
   */
  _fromGameRecord(gameRecord) {
    // 設定値
    var date = gameRecord.date.substr(5, 5);

    // 各要素の表示を更新
    this._html_id.text(gameRecord.id);
    this._html_date.text(date);
    this._html_rate.text(gameRecord.rate + "万");
    this._html_stock.text(gameRecord.stock);
    this._html_fighter.text(gameRecord.fighter);
    this._html_isVip.text(gameRecord.isVip);
    this._html_isDeleted.text(gameRecord.isDeleted);

    // 参照用に生の値を仕込む
    this._html_id.data("raw",   gameRecord.id);
    this._html_date.data("raw", gameRecord.date);
    this._html_rate.data("raw", gameRecord.rate);
    this._html_stock.data("raw", gameRecord.stock);
    this._html_fighter.data("raw", gameRecord.fighter);
    this._html_isVip.data("raw", gameRecord.isVip);
    this._html_isDeleted.data("raw", gameRecord.isDeleted);
  }


  /**
   * @note フォント設定
   * @param {GameRecord} gameRecord
   */
  _setFont(gameRecord) {
    // 勝敗に応じてフォントを設定
    if (gameRecord.stock > 0) {
      this._html_listRow.addClass("positive-font");
    }
    else {
      this._html_listRow.addClass("negative-font");
    }

    // 削除済みかどうかに応じてフォントを設定
    if (gameRecord.isDeleted) {
      this._html_listRow.addClass("line-through");
    }
    else {
      this._html_listRow.removeClass("line-through");
    }
  }


  /**
   * @note リストクリック時のイベント
   * @param {GameRecord} gameRecord
   */
  _onClick(e) {
    try{
    var gameRecord = this._toGameRecord();
    e.data.onClick(gameRecord);
    }catch(e){alert(e.stack)}
  }

}
