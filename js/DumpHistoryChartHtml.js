class DumpHistoryChartHtml {

  constructor() {
    this._MAX_COUNT = 100;
  }

  
  get _html_wrapper() { return $("#dump-history-chart-wrapper"); }
  get _html_canvas()  { return $("#dump-history-chart-canvas"); }
  get _html_select()  { return $("#dump-history-chart-select"); }
  get _html_chart()   { return $('#dump-history-chart'); }

  get _html_canvasLatest() { return $("#dump-history-chart-canvas-latest"); }
  get _html_canvasAll()    { return $("#dump-history-chart-canvas-all"); }
  get _html_canvasDaily()  { return $("#dump-history-chart-canvas-daily"); }

  
  /**
   * @note チャートを更新する。
   * @param  {RecordAnalyzer} recordAnalyzer
   */
  update(recordAnalyzer) {
    // 有効な戦績のみを抽出
    var gameRecords = this._createValidGameRecords(recordAnalyzer.gameRecords);

    // 表示対象がない場合は即終了
    if (gameRecords.length == 0) {
      this._html_wrapper.hide();
      return;
    }

    // 各種チャートのデータを作成
    var latestData = this._createLatestData(gameRecords, 100);
    var allData    = this._createAllData(gameRecords, 50);
    var dailyData  = this._createDailyData(recordAnalyzer.dailyRecords, 20);
    
    // チャート更新
    this._updateChart(this._html_canvasLatest, latestData);
    this._updateChart(this._html_canvasAll,    allData);
    this._updateChart(this._html_canvasDaily,  dailyData);

    // 領域全体を表示
    this._html_wrapper.show();

    // Slick表示
    if (gameRecords.length > 100) {
      this._showSlick();
    }
    else {
      this._hideSlick();
    }
  }


  /**
   * @note 有効な戦績のみのリストを作成する。
   * @param  {GameRecords} gameRecords
   * @return {Integer}
   */
  _createValidGameRecords(gameRecords) {
    var validGameRecords = new GameRecords();
    for (let i = 0; i < gameRecords.length; i++) {
      if (!(gameRecords.index(i).isDeleted)) {
        validGameRecords.push(gameRecords.index(i));
      }
    }
    return validGameRecords;
  }


  /**
   * @note 直近の戦績(n戦)のデータを作成する。
   * @param  {GameRecords} gameRecords
   * @param  {Integer}     plotCount
   * @return {Object}
   */
  _createLatestData(gameRecords, plotCount) {
    var length = gameRecords.length;
    var headIndex = length - Math.min(length, plotCount);

    var rates = [];
    for (let i = headIndex; i < length; i++) {
      rates.push(gameRecords.index(i).rate);
    }

    var option = this._initialChartOption();
    option.data.labels = new Array(rates.length);
    option.data.datasets[0].data = rates;
    option.options.title.text = "直近の戦績 " + plotCount + "戦";

    return option;
  }


  /**
   * @note 全ての戦績のデータを作成する。
   * @param  {GameRecords} gameRecords
   * @param  {Integer}     plotCount
   * @return {Object}
   */
  _createAllData(gameRecords, plotCount) {
    var rates;

    rates = this._createLowPassFilteredRates(gameRecords);
    rates = this._pickupRates(rates, plotCount);

    var option = this._initialChartOption();
    option.data.labels = new Array(rates.length);
    option.data.datasets[0].data = rates;
    option.options.title.text = "全ての戦績 (平滑化＋間引き)";

    return option;
  }


  /**
   * @note 日毎の戦績のデータを作成する。
   * @param  {DailyRecords} dailyRecords
   * @param  {Integer}     plotCount
   * @return {Object}
   */
  _createDailyData(dailyRecords, plotCount) {
    var length = dailyRecords.length;
    var headIndex = length - Math.min(length, plotCount);

    //var m_prev = "";
    var rates = [];
    var labels = [];
    for (let i = headIndex; i < length; i++) {
      rates.push(dailyRecords.index(i).medianRate);
      labels.push(dailyRecords.index(i).date.substr(5, 5));
      //var m = dailyRecords.index(i).date.substr(5, 2);
      //var d = dailyRecords.index(i).date.substr(8, 2);
      //labels.push((m != m_prev) ? (m + "/" + d) : d);
      //m_prev = m;
    }

    var option = this._initialChartOption();
    option.data.labels = labels;
    option.data.datasets[0].data = rates;
    option.options.title.text = "日毎の戦績 (その日の中央値)";

    return option;
  }


  /**
   * @note ローパスフィルタした戦闘力配列を作成する。
   * @param  {GameRecords} gameRecords
   * @return {Integer}
   */
  _createLowPassFilteredRates(gameRecords) {
    // ガウシアンフィルタっぽいモノ
    const gaussian_x3 = [1, 2, 1];
    const gaussian_x5 = [1, 4, 6, 4, 1];
    const gaussianDenominator_x3 = 4;
    const gaussianDenominator_x5 = 16;

    var length = gameRecords.length;
    var filteredRates = new Array(length);

    for (let i = 0; i < length; i++) {
      var rate = 0;

      // 端点: 生の値のまま
      if ((i == 0) || (i == (length - 1))) {
        rate = gameRecords.index(i).rate;
      }
      // 端点-1: x3テーブル
      else if ((i == 1) || i == (length - 2)) {
        var r0 = gameRecords.index(i - 1).rate * gaussian_x3[0];
        var r1 = gameRecords.index(i    ).rate * gaussian_x3[1];
        var r2 = gameRecords.index(i + 1).rate * gaussian_x3[2];
        rate = Math.round((r0 + r1 + r2) / gaussianDenominator_x3);
      }
      // 端点-2～: x5テーブル
      else {
        var r0 = gameRecords.index(i - 2).rate * gaussian_x5[0];
        var r1 = gameRecords.index(i - 1).rate * gaussian_x5[1];
        var r2 = gameRecords.index(i    ).rate * gaussian_x5[2];
        var r3 = gameRecords.index(i + 1).rate * gaussian_x5[3];
        var r4 = gameRecords.index(i + 2).rate * gaussian_x5[4];
        rate = Math.round((r0 + r1 + r2 + r3 + r4) / gaussianDenominator_x5);
      }

      // 配列を更新
      filteredRates[i] = rate;
    }

    return filteredRates;
  }


  /**
   * @note 戦闘力の配列から等間隔で抜き出す。
   * @param  {Integer} rates
   * @param  {Integer} plotCount
   * @return {Integer}
   */
  _pickupRates(rates, plotCount) {
    // memo
    // plotCount = 5での例
    // 11件:   00102030405
    // 12件:  001002030405
    // 13件: 0010020030405

    var length = rates.length;
    var surplus  = length % plotCount;
    var shortInterval = Math.floor(length / plotCount);
    var longInterval  = shortInterval + 1;

    var shortIntervalIndex = longInterval * surplus;
    if (surplus == 0) {
      shortIntervalIndex = length;
    }

    var pickedRates = [];
    for (let i = 0; i < shortIntervalIndex; i++) {
      if (((i + 1) % longInterval) == 0) {
        pickedRates.push(rates[i]);
      }
    }
    for (let i = shortIntervalIndex; i < length; i++) {
      if (((i + 1 - shortIntervalIndex) % shortInterval) == 0) {
        pickedRates.push(rates[i]);
      }
    }

    return pickedRates;
  }


  /**
   * @note Slickを表示する。
   */
  _showSlick() {
    if (this._html_chart.hasClass("slick-initialized")) {
      return;
    }

    this._html_canvasLatest.show();
    this._html_canvasAll.show();
    this._html_canvasDaily.show();

    this._html_chart.slick({
      dots: true,
      arrows: true,
      infinite: false,
    });
  }


  /**
   * @note Slickを非表示にする。
   */
  _hideSlick() {
    if (this._html_chart.hasClass("slick-initialized")) {
      this._html_chart.slick('unslick');
    }

    this._html_canvasLatest.show();
    this._html_canvasAll.hide();
    this._html_canvasDaily.hide();
  }


  /**
   * @note チャートを作成する。
   * @param {Integer} rates
   */
  _updateChart(html_canvas, option) {
    // Y軸の表示領域を調整
    const suggestedMax = option.data.datasets[0].data.reduce((a, b) => Math.max(a, b), -Infinity);
    const suggestedMin = option.data.datasets[0].data.reduce((a, b) => Math.min(a, b), +Infinity);

    // チャートのオプション設定
    option.options.scales.yAxes[0].ticks.suggestedMax = suggestedMax;
    option.options.scales.yAxes[0].ticks.suggestedMin = suggestedMin;

    // チャート表示
    new Chart(html_canvas, option);
  }


  /**
   * @note   チャートのオプション初期値
   * @return {Object}
   */
  _initialChartOption() {
    return {
      type: 'line',
      data: {
        labels: [],
        datasets: [
          {
            label: '戦闘力',
            data: [],
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
          display: true,
          position: "top",
          fontSize: 13,
          fontColot: "#333",
          fontStyle: "normal",
          text: "",
        },
        scales: {
          xAxes: [{
            gridLines: {
              color: "rgba(255, 255, 255, 0)",
              dispaly: false,
              drawBorder: false,
            },
          }],
          yAxes: [{
            ticks: {
              suggestedMax: 1600,
              suggestedMin: 100,
              stepSize: 100,
              callback: function(value, index, values){
                return  value +  '万'
              }
            }
          }],
        },
        legend: {
          display: false,
        },
      }
    };
  }


}
