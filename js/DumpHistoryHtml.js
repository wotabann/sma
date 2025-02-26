class DumpHistoryHtml {
  static _MAX_LIST_COUNT = 30;
  static _MAX_CHART_COUNT = 100;

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
   * @note   表示を更新する。
   * @param  {GameRecords} gameRecords
   */
  static Update(gameRecords, listClickCallback) {
    this._clearList();
    this._updateList(gameRecords, listClickCallback);
    this._updateChart(gameRecords);

    this._hideList();

    this._getListWrapperHtml().show();
    this._getChartWrapperHtml().show();
  }


  /**
   * @note   表示を更新する。(1行)
   * @param  {GameRecord} gameRecord
   */
  static UpdateRow(gameRecord) {
    var listRowHtmls = this._getListRowHtmls();

    for (let i = 0; i < listRowHtmls.length; i++) {
      var listRowHtml = $(listRowHtmls[i]);
      var id = listRowHtml.children(".dump-history-list-row-id").text();

      if (id == gameRecord.Id) {
        this._updateListRow(listRowHtml, gameRecord);
        return;
      }
    }
  }


  /**
   * @note リストをクリアする。
   */
  static _clearList() {
    var listRowHtmls = this._getListRowHtmls();
    for (let i = 1; i < listRowHtmls.length; i++) {
      $(listRowHtmls[i]).remove();
    }
  }


  /**
   * @note リストを更新する。
   * @param {GameRecords} gameRecords
   */
  static _updateList(gameRecords, listClickCallback) {
    // 退避
    var length = gameRecords.Length();
    var listHtml = this._getListHtml();
    var listRowHeaderHtml = this._getListRowHeaderHtml();

    // 1レコードずつループして表示
    for (let i = (length - 1); i >= 0; i--) {
      var gameRecord = gameRecords.Index(i);

      // 1行追加
      var listRowHtml = listRowHeaderHtml.clone().appendTo(listHtml);

      // 追加した行の内容を更新
      this._updateListRow(listRowHtml, gameRecord);

      // クリックイベントをセット
      var arg = {
        gameRecord: gameRecord,
        callback: listClickCallback
      };
      listRowHtml.on("click", arg, this._listRowCallback);
    }
  }


  /**
   * @note リストを更新する。(1行)
   * @param {Object}     listRowHtml
   * @param {GameRecord} gameRecord
   */
  static _updateListRow(listRowHtml, gameRecord) {
    var date = gameRecord.Date.substr(5, 5);
    var font = (gameRecord.Stock > 0) ? "positive-font" : "negative-font";

    listRowHtml.children(".dump-history-list-row-is-deleted").text(gameRecord.IsDeleted);
    listRowHtml.children(".dump-history-list-row-id").text(gameRecord.Id);
    listRowHtml.children(".dump-history-list-row-date").text(date);
    listRowHtml.children(".dump-history-list-row-rate").text(gameRecord.Rate + "万");
    listRowHtml.children(".dump-history-list-row-stock").text(gameRecord.Stock);
    listRowHtml.children(".dump-history-list-row-fighter").text(gameRecord.Fighter);
    listRowHtml.addClass(font);

    if (gameRecord.IsDeleted) {
      listRowHtml.addClass("line-through");
    }
    else {
      listRowHtml.removeClass("line-through");
    }
  }


  /**
   * @note リストクリック時のイベント
   * @param {GameRecord} gameRecord
   */
  static _listRowCallback(e) {
    e.data.callback(e.data.gameRecord);
  }


  /**
   * @note リストを全件表示する。
   */
  static _showList() {
    var listRowHtmls = this._getListRowHtmls();
    for (let i = 0; i < listRowHtmls.length; i++) {
      $(listRowHtmls[i]).show();
    }
  }


  /**
   * @note リストを隠す。
   */
  static _hideList() {
    const MAX_COUNT = DumpHistoryHtml._MAX_LIST_COUNT;

    var listRowHtmls = this._getListRowHtmls();
    for (let i = MAX_COUNT; i < listRowHtmls.length; i++) {
      $(listRowHtmls[i]).hide();
    }
  }


  /**
   * @note チャートを更新する。
   * @param {GameRecords} gameRecords
   */
  static _updateChart(gameRecords) {
    const MAX_COUNT = DumpHistoryHtml._MAX_CHART_COUNT;

    // チャートのオプション初期値
    var labels = [];
    var values = [];
    var suggestedMax = 0;
    var suggestedMin = 2000;

    // 退避
    var length = gameRecords.Length();

    // 表示する最大レコード数
    var maxCount = Math.min(MAX_COUNT, length);

    // プロットする点を作成
    for (let i = (length - maxCount); i < length; i++) {
      if (gameRecords.Index(i).IsDeleted) {
        continue;
      }

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
