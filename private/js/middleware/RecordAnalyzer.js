class RecordAnalyzer {
  /**
   * @param  {GameRecords} gameRecords
   */
  constructor(gameRecords) {
    // 外部公開プロパティ
    this._gameRecords    = gameRecords;

    // 各種レコードを更新
    for (let i = 0; i < gameRecords.length; i++) {
      var gameRecord = gameRecords.index(i);

      // 削除レコードはスキップ
      if (gameRecord.isDisabled != 0) {
        continue;
      }
    }

    return;
  }


  /**
   * @return {GameRecords}
   */
  get gameRecords() {
    return this._gameRecords;
  }
}
