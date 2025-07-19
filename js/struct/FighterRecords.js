class FighterRecords {
  constructor() {
    this._fighterRecords = [];
  }

  /**
   * @param {Integer}  fighterId
   * @param {Integer} stock 
   * @return {FighterRecord}
   */
  add(fighterId, stock) {
    var fighterRecord = this.find(fighterId);
    if (fighterRecord == null) {
      fighterRecord = new FighterRecord(fighterId);
      this.push(fighterRecord);
    }

    fighterRecord.add(stock);
    return fighterRecord;
  }

  /**
   * @param {FighterRecord} fighterRecord
   * @return {FighterRecord}
   */
  push(fighterRecord) {
    this._fighterRecords.push(fighterRecord);
    return fighterRecord;
  }

  /**
   * @return {Integer}
   */
  get length() {
    return this._fighterRecords.length;
  }

  /**
   * @param {Integer} i
   * @return {FighterRecord}
   */
  index(i) {
    return this._fighterRecords[i];
  }

  /**
   * @param {Integer} fighterId
   * @return {FighterRecord}
   */
  find(fighterId) {
    for (let i = 0; i < this._fighterRecords.length; i++) {
      if (fighterId == this._fighterRecords[i].fighterId) {
        return this._fighterRecords[i];
      }
    }
    return null;
  }

  // 各種ソート
  sortByGameCount() { this._fighterRecords.sort(function(a, b) { return b.gameCount - a.gameCount; }); }
  sortByWinCount()  { this._fighterRecords.sort(function(a, b) { return b.winCount  - a.winCount;  }); }
  sortByLoseCount() { this._fighterRecords.sort(function(a, b) { return b.loseCount - a.loseCount; }); }
  sortByWinRate()   { this._fighterRecords.sort(function(a, b) { return b.winRate   - a.winRate; }); }
  sortByWinRateR()  { this._fighterRecords.sort(function(a, b) { return a.winRate   - b.winRate; }); }
  sortByWinOver()   { this._fighterRecords.sort(function(a, b) { return b.winOver   - a.winOver; }); }
  sortByWinOverR()  { this._fighterRecords.sort(function(a, b) { return a.winOver   - b.winOver; }); }

}
