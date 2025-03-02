class DumpHistoryChartHtml {

  constructor() {
    this._MAX_COUNT = 100;
  }

  
  get _html_wrapper() { return $("#dump-history-chart-wrapper"); }
  get _html_canvas()  { return $("#dump-history-chart-canvas"); }


  /**
   * @note チャートを更新する。
   * @param {GameRecords} gameRecords
   */
  update(gameRecords) {
    this._update(gameRecords);
    this._html_wrapper.show();
  }


  /**
   * @note チャートを更新する。(内部用)
   * @param {GameRecords} gameRecords
   */
  _update(gameRecords) {
    const MAX_COUNT = this._MAX_COUNT;

    // チャートのオプション初期値
    var labels = [];
    var values = [];
    var suggestedMax = 0;
    var suggestedMin = 2000;

    // 退避
    var length = gameRecords.length;

    // 表示する最大レコード数
    var maxCount = Math.min(MAX_COUNT, length);

    // プロットする点を作成
    for (let i = (length - maxCount); i < length; i++) {
      if (gameRecords.index(i).isDeleted) {
        continue;
      }

      var rate = gameRecords.index(i).rate;
      labels.push("");
      values.push(rate);
      suggestedMax = Math.max(suggestedMax, rate);
      suggestedMin = Math.min(suggestedMin, rate);
    }

    // Y軸の表示領域を調整
    suggestedMax = (Math.ceil((suggestedMax / 100) + 0.5) * 100);
    suggestedMin = (Math.floor((suggestedMin / 100) - 0.5) * 100);

    // チャートを作成
    var html_canvas = this._html_canvas;
    new Chart(html_canvas, {
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
