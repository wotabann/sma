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
    for (let i = 0; i < gameRecords.Length(); i++) {
      var gameRecord = gameRecords.Index(i);

      if (gameRecord.IsDeleted) {
        continue;
      }

      win  = (gameRecord.Stock > 0) ? (win  + 1) : 0;
      lose = (gameRecord.Stock < 0) ? (lose + 1) : 0;

      this._pushFighterRecord(gameRecord);
      this._updateFighterRecords(gameRecord);
      this._updateTotalRecord(gameRecord, win, lose);
    }
    return;
  }

  /**
   * @return {TotalRecord}
   */
  TotalRecord() {
    return this._totalRecord;
  }

  /**
   * @return {FighterRecords}
   */
  FighterRecords() {
    return this._fighterRecords;
  }

  /**
   * @param  {GameRecord} gameRecord
   */
  _pushFighterRecord(gameRecord) {
    if (this._fighterRecords.Find(gameRecord.Fighter) == null) {
      var fighterRecord = new FighterRecord();
      fighterRecord.Fighter = gameRecord.Fighter;
      this._fighterRecords.Push(fighterRecord);
    }
    return;
  }

  /**
   * @param  {GameRecord} gameRecord
   */
  _updateFighterRecords(gameRecord) {
    var fighterRecord = this._fighterRecords.Find(gameRecord.Fighter);
    fighterRecord.GameCount  += 1;
    fighterRecord.WinCount   += (gameRecord.Stock > 0) ? 1 : 0;
    fighterRecord.LoseCount  += (gameRecord.Stock < 0) ? 1 : 0;
    fighterRecord.TotalStock += gameRecord.Stock;
    return;
  }

  /**
   * @param  {GameRecord} gameRecord
   * @param  {Integer} win
   * @param  {Integer} lose
   */
  _updateTotalRecord(gameRecord, win, lose) {
    var rate  = gameRecord.Rate;
    var stock = gameRecord.Stock;

    var maxRate = Math.max(this._totalRecord.MaxRate, rate);
    var minRate = Math.min(this._totalRecord.MinRate, rate);
    var maxWin  = Math.max(this._totalRecord.MaxWin,  win);
    var maxLose = Math.max(this._totalRecord.MaxLose, lose);

    this._totalRecord.GameCount  += 1;
    this._totalRecord.WinCount   += (stock > 0) ? 1 : 0;
    this._totalRecord.LoseCount  += (stock < 0) ? 1 : 0;
    this._totalRecord.Rate        = rate;
    this._totalRecord.MaxRate     = maxRate;
    this._totalRecord.MinRate     = minRate;
    this._totalRecord.TotalStock += stock;
    this._totalRecord.MaxWin      = maxWin;
    this._totalRecord.MaxLose     = maxLose;
    return;
  }
}
