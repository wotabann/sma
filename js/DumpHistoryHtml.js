class DumpHistoryHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getListObject()          { return $("#dump-history-list"); }
  static _getChartObject()         { return $("#dump-history-chart"); }
  static _getListRowObjects()      { return this._getListObject().children(".dump-history-list") ;}
  static _getListHeaderRowObject() { return this._getListObject().children(".dump-history-list:first") ;}


  /**
   * @note   Recordの入力値を取得する。
   * @param  {GameRecords} gameRecords
   */
  static Update(gameRecords) {
    var maxRowCount = 30;
    if (gameRecords.Length() < maxRowCount) {
      maxRowCount = gameRecords.Length();
    }

    this._clearList();

    for (let i = 0; i < maxRowCount; i++) {
      this._addListRow(gameRecords.Index(i));
    }

    this._updateChart(gameRecords, maxRowCount);
  }

  /**
   * @note リストをクリアする。
   */
  static _clearList() {
    var listRows = this._getListRowObjects();
    for (let i = 1; i < listRows.length; i++) {
      listRows[i].remove();
    }
  }

  /**
   * @note リストに1行追加する。
   * @param {GameRecord} gameRecord
   */
  static _addListRow(gameRecord) {
    var list = this._getListObject();
    var listHeader = this._getListHeaderRowObject();
    var listRow = listHeader.clone().appendTo(list);

    var date = gameRecord.Date.substr(5, 5).replace("-", "/");

    listRow.children(".dump-history-list-date").text(date);
    listRow.children(".dump-history-list-rate").text(gameRecord.Rate + "万");
    listRow.children(".dump-history-list-stock").text(gameRecord.Stock);
    listRow.children(".dump-history-list-fighter").text(gameRecord.Fighter);

    if (gameRecord.Stock > 0) {
      listRow.addClass("positive-font");
    }
    if (gameRecord.Stock < 0) {
      listRow.addClass("negative-font");
    }
  }

  /**
   * @note チャートを作成する。
   * @param {GameRecords} gameRecords
   * @param {Integer} maxCount
   */
  static _updateChart(gameRecords, maxCount) {
    var labels = [];
    var values = [];
    var suggestedMax = 0;
    var suggestedMin = 2000;
    for (let i = 0; i < maxCount; i++) {
      labels.push("");
      values.push(gameRecords.Index(i).Rate);
      suggestedMax = Math.max(suggestedMax, gameRecords.Index(i).Rate);
      suggestedMin = Math.min(suggestedMin, gameRecords.Index(i).Rate);
    }

    suggestedMax = (Math.ceil(suggestedMax / 100) * 100) + 100;
    suggestedMin = (Math.floor(suggestedMin / 100) * 100) - 100;

    var chartObject = this._getChartObject();
    chartObject.show();

    var myLineChart = new Chart(chartObject, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '戦闘力[万]',
            data: values,
            borderWidth: 1,
            borderColor: "rgba(255,0,0,1)",
            backgroundColor: "rgba(0,0,0,0)",
            pointRadius: 0,
            tension: 0
          }
        ],
      },
      options: {
        title: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              suggestedMax: suggestedMax,
              suggestedMin: suggestedMin,
              stepSize: 100,
              callback: function(value, index, values){
                return  value +  '万'
              }
            }
          }],
        },
      }
    });
  }
}
