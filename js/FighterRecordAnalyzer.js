class FighterRecordAnalyzer {
  constructor() {
    this._fighterRecords = new FighterRecords();
  }

  /**
   * @param  {GameRecord} gameRecord
   */
  AddGameRecord(gameRecord) {
    var tmpFighterRecord = this._gameRecordToFighterRecord(gameRecord);

    var fighterRecord = this._fighterRecords.Find(gameRecord.Fighter);
    if (fighterRecord == null) {
      this._fighterRecords.Push(tmpFighterRecord);
      return;
    }
    fighterRecord.GameCount  += tmpFighterRecord.GameCount;
    fighterRecord.WinCount   += tmpFighterRecord.WinCount;
    fighterRecord.LoseCount  += tmpFighterRecord.LoseCount
    fighterRecord.TotalStock += tmpFighterRecord.TotalStock;
  }

  /**
   * @return {FighterRecords}
   */
  FighterRecords() {
    return this._fighterRecords;
  }

  /**
   * @return {FighterRecords}
   */
  SortByWinRate() {
    this._fighterRecords.Sort(function(a, b) {
      return a.WinRate() > b.WinRate();
    });
    return this._fighterRecords;
  }

  /**
   * @param  {GameRecord} gameRecord
   * @return {FighterRecord}
   */
  _gameRecordToFighterRecord(gameRecord) {
    var fighterRecord = new FighterRecord();
    fighterRecord.Fighter    = gameRecord.Fighter;
    fighterRecord.GameCount  = 1;
    fighterRecord.WinCount   = (gameRecord.Stock > 0) ? 1 : 0;
    fighterRecord.LoseCount  = (gameRecord.Stock < 0) ? 1 : 0;
    fighterRecord.TotalStock = gameRecord.Stock;
    return fighterRecord;
  }
}
