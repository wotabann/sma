class RecordAnalyzer {
  /**
   * @param  {GameRecords} gameRecords
   */
  constructor(gameRecords) {
    this._fighterRecords = new FighterRecords();
    this._totalRecord    = new TotalRecord();

    // 各種レコードを更新
    var win  = 0;
    var lose = 0;
    for (let i = 0; i < gameRecords.length; i++) {
      var gameRecord = gameRecords.index(i);

      if (gameRecord.isDeleted) {
        continue;
      }

      win  = (gameRecord.stock > 0) ? (win  + 1) : 0;
      lose = (gameRecord.stock < 0) ? (lose + 1) : 0;

      this._pushFighterRecord(gameRecord);
      this._updateFighterRecords(gameRecord);
      this._updateTotalRecord(gameRecord, win, lose);
    }
    return;
  }

  /**
   * @return {TotalRecord}
   */
  get totalRecord() {
    return this._totalRecord;
  }

  /**
   * @return {FighterRecords}
   */
  get fighterRecords() {
    return this._fighterRecords;
  }

  /**
   * @param  {GameRecord} gameRecord
   */
  _pushFighterRecord(gameRecord) {
    if (this._fighterRecords.find(gameRecord.fighter) == null) {
      var fighterRecord = new FighterRecord();
      fighterRecord.fighter = gameRecord.fighter;
      this._fighterRecords.push(fighterRecord);
    }
    return;
  }

  /**
   * @param  {GameRecord} gameRecord
   */
  _updateFighterRecords(gameRecord) {
    var fighterRecord = this._fighterRecords.find(gameRecord.fighter);
    fighterRecord.gameCount  += 1;
    fighterRecord.winCount   += (gameRecord.stock > 0) ? 1 : 0;
    fighterRecord.loseCount  += (gameRecord.stock < 0) ? 1 : 0;
    fighterRecord.totalStock += gameRecord.stock;
    return;
  }

  /**
   * @param  {GameRecord} gameRecord
   * @param  {Integer} win
   * @param  {Integer} lose
   */
  _updateTotalRecord(gameRecord, win, lose) {
    var rate  = gameRecord.rate;
    var stock = gameRecord.stock;

    var maxRate = Math.max(this._totalRecord.maxRate, rate);
    var minRate = Math.min(this._totalRecord.minRate, rate);
    var maxWin  = Math.max(this._totalRecord.maxWin,  win);
    var maxLose = Math.max(this._totalRecord.maxLose, lose);

    this._totalRecord.gameCount  += 1;
    this._totalRecord.winCount   += (stock > 0) ? 1 : 0;
    this._totalRecord.loseCount  += (stock < 0) ? 1 : 0;
    this._totalRecord.rate        = rate;
    this._totalRecord.maxRate     = maxRate;
    this._totalRecord.minRate     = minRate;
    this._totalRecord.totalStock += stock;
    this._totalRecord.maxWin      = maxWin;
    this._totalRecord.maxLose     = maxLose;
    return;
  }
}
