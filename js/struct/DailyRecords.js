class DailyRecords {
  constructor() {
    this._dailyRecords = [];
  }

  /**
   * @param  {String}  date
   * @param  {Integer} rate 
   * @param  {Integer} stock 
   * @return {DailyRecord}
   */
  add(date, rate, stock) {
    var dailyRecord = this.find(date);
    if (dailyRecord == null) {
      dailyRecord = new DailyRecord(date);
      this.push(dailyRecord);
    }

    dailyRecord.add(rate, stock);
    return dailyRecord;
  }

  /**
   * @param  {DailyRecord} dailyRecord
   * @return {DailyRecord}
   */
  push(dailyRecord) {
    this._dailyRecords.push(dailyRecord);
    return dailyRecord;
  }

  /**
   * @return {Integer}
   */
  get length() {
    return this._dailyRecords.length;
  }

  /**
   * @param  {Integer} i
   * @return {DailyRecord}
   */
  index(i) {
    return this._dailyRecords[i];
  }

  /**
   * @param  {String} date
   * @return {DailyRecord}
   */
  find(date) {
    for (let i = 0; i < this._dailyRecords.length; i++) {
      if (date == this._dailyRecords[i].date) {
        return this._dailyRecords[i];
      }
    }
    return null;
  }

}
