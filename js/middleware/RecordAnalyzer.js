class RecordAnalyzer {
  /**
   * @param  {GameRecords} gameRecords
   */
  constructor(gameRecords) {
    // 外部公開プロパティ
    this._gameRecords    = gameRecords;
    this._totalRecord    = new TotalRecord();
    this._fighterRecords = new FighterRecords();
    this._dailyRecords   = new DailyRecords();
    this._invalidGameRecordIds = [];

    // 内部計算用プロパティ
    this._gameRecord_prev = null;

    // 各種レコードを更新
    for (let i = 0; i < gameRecords.length; i++) {
      var gameRecord = gameRecords.index(i);

      // 削除レコードはスキップ
      if (gameRecord.isDisabled != 0) {
        continue;
      }

      // 解析
      this._updateTotalRecord(gameRecord);
      this._updateDailyRecords(gameRecord);
      this._updateFighterRecords(gameRecord);
      this._updateInconsistencyGameRecordIds(gameRecord);

      // 内部計算用プロパティを更新
      this._gameRecord_prev = gameRecord;
    }

    return;
  }


  /**
   * @return {GameRecords}
   */
  get gameRecords() {
    return this._gameRecords;
  }


  /**
   * @return {TotalRecord}
   */
  get totalRecord() {
    return this._totalRecord;
  }


  /**
   * @return {DailyRecords}
   */
  get dailyRecords() {
    return this._dailyRecords;
  }


  /**
   * @return {FighterRecords}
   */
  get fighterRecords() {
    return this._fighterRecords;
  }


  /**
   * @return {Integer}
   */
  get invalidGameRecordIds() {
    return this._invalidGameRecordIds;
  }


  /**
   * @note   TotalRecordを更新する。
   * @param  {GameRecord} gameRecord
   */
  _updateTotalRecord(gameRecord) {
    var date      = gameRecord.date;
    var rate      = gameRecord.rate;
    var stock     = gameRecord.stock;
    var rankIndex = gameRecord.rankIndex;
    this._totalRecord.add(date, rate, stock, rankIndex);
  }


  /**
   * @note   DailyRecordを更新する。
   * @param  {GameRecord} gameRecord
   */
  _updateDailyRecords(gameRecord) {
    var date  = gameRecord.date;
    var rate  = gameRecord.rate;
    var stock = gameRecord.stock;
    this._dailyRecords.add(date, rate, stock);
    return;
  }


  /**
   * @note   FighterRecordを更新する。
   * @param  {GameRecord} gameRecord
   */
  _updateFighterRecords(gameRecord) {
    var fighterId = gameRecord.fighterId;
    var stock     = gameRecord.stock;
    this._fighterRecords.add(fighterId, stock);
  }


  /**
   * @note   不整合な戦績のIDを更新する。
   * @param  {GameRecord} gameRecord
   */
  _updateInconsistencyGameRecordIds(gameRecord) {
    var id    = gameRecord.id;
    var rate  = gameRecord.rate;
    var stock = gameRecord.stock;

    if (this._gameRecord_prev == null) {
      return;
    }

    if ((rate < this._gameRecord_prev.rate) && (stock > 0)) {
      this._invalidGameRecordIds.push(id);
      return;
    }

    if ((rate > this._gameRecord_prev.rate) && (stock < 0)) {
      this._invalidGameRecordIds.push(id);
      return;
    }
  }
}
