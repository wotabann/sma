class DumpHistoryHtml {
  constructor() {
  }

  
  // 各要素の取得
  static _getListHtml()          { return $("#dump-history-list"); }
  static _getListWrapperHtml()   { return $("#dump-history-list-wrapper"); }
  static _getListRowHtmls()      { return this._getListHtml().children(".dump-history-list-row"); }
  static _getListRowHeaderHtml() { return this._getListHtml().children(".dump-history-list-row:first") ;}
  static _getChartHtml()         { return $("#dump-history-chart-canvas"); }
  static _getChartWrapperHtml()  { return $("#dump-history-chart-wrapper")}


  /**
   * @note   Recordの入力値を取得する。
   * @param  {GameRecords} gameRecords
   */
  static Update(gameRecords) {
    this._clearList();
    this._updateList(gameRecords);
    this._updateChart(gameRecords);

    this._getListWrapperHtml().show();
    this._getChartWrapperHtml().show();
  }


  /**
   * @note リストをクリアする。
   */
  static _clearList() {
    var listRowHtmls = this._getListRowHtmls();
    for (let i = 1; i < listRowHtmls.length; i++) {
      listRowHtmls[i].remove();
    }
  }


  /**
   * @note リストを更新する。
   * @param {GameRecords} gameRecords
   */
  static _updateList(gameRecords) {
    const MAX_COUNT = 30;

    // 退避
    var length = gameRecords.Length();
    var listHtml = this._getListHtml();
    var listRowHeaderHtml = this._getListRowHeaderHtml();

    // 表示する最大レコード数
    var maxCount = Math.min(MAX_COUNT, length);

    // 1レコードずつループして表示
    for (let i = (length - maxCount); i < length; i++) {
      var gameRecord = gameRecords.Index(i);

      var date = gameRecord.Date.substr(5, 5);
      var font = (gameRecord.Stock > 0) ? "positive-font" : "negative-font";

      var listRowHtml = listRowHeaderHtml.clone().appendTo(listHtml);
      listRowHtml.children(".dump-history-list-row-date").text(date);
      listRowHtml.children(".dump-history-list-row-rate").text(gameRecord.Rate + "万");
      listRowHtml.children(".dump-history-list-row-stock").text(gameRecord.Stock);
      listRowHtml.children(".dump-history-list-row-fighter").text(gameRecord.Fighter);
      listRowHtml.addClass(font);
    }
  }


  /**
   * @note チャートを更新する。
   * @param {GameRecords} gameRecords
   */
  static _updateChart(gameRecords) {
    const MAX_COUNT = 100;

    // チャートのオプション初期値
    var labels = [];
    var values = [];
    var suggestedMax = 0;
    var suggestedMin = 2000;

    // 表示する最大レコード数
    var maxCount = Math.min(MAX_COUNT, gameRecords.Length());

    // プロットする点を作成
    for (let i = 0; i < maxCount; i++) {
      var rate = gameRecords.Index(i).Rate;

      labels.push("");
      values.push(rate);
      suggestedMax = Math.max(suggestedMax, rate);
      suggestedMin = Math.min(suggestedMin, rate);
    }

    // Y軸の表示領域を調整
    suggestedMax = (Math.ceil((suggestedMax / 100) + 0.5) * 100);
    suggestedMin = (Math.floor((suggestedMin / 100) - 0.5) * 100);

    // チャートを作成
    var chartHtml = this._getChartHtml();
    new Chart(chartHtml, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '戦闘力',
            data: values,
            borderWidth: 1,
            borderColor: "rgba(0,73,134,1.0)",
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
