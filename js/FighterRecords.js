class FighterRecords {
  constructor() {
    this._fighterRecords = [];
  }

  /**
   * @param  {FighterRecord} fighterRecord
   * @return {FighterRecord}
   */
  Push(fighterRecord) {
    this._fighterRecords.push(fighterRecord);
    return fighterRecord;
  }

  /**
   * @return {Integer}
   */
  Length() {
    return this._fighterRecords.length;
  }

  /**
   * @param  {Integer} i
   * @return {FighterRecord}
   */
  Index(i) {
    return this._fighterRecords[i];
  }

  /**
   * @param  {String} fighter
   * @return {FighterRecord}
   */
  Find(fighter) {
    for (let i = 0; i < this._fighterRecords.length; i++) {
      if (fighter == this._fighterRecords[i].Fighter) {
        return this._fighterRecords[i];
      }
    }
    return null;
  }

  // 各種ソート
  SortByGameCount() { this._fighterRecords.sort(function(a, b) { return b.GameCount - a.GameCount; }); }
  SortByWinCount()  { this._fighterRecords.sort(function(a, b) { return b.WinCount  - a.WinCount;  }); }
  SortByLoseCount() { this._fighterRecords.sort(function(a, b) { return b.LoseCount - a.LoseCount; }); }
  SortByWinRate()   { this._fighterRecords.sort(function(a, b) { return b.WinRate() - a.WinRate(); }); }
  SortByWinRateR()  { this._fighterRecords.sort(function(a, b) { return a.WinRate() - b.WinRate(); }); }

}
