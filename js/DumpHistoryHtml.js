class DumpHistoryHtml {
  static _MAX_LIST_COUNT = 30;
  static _MAX_CHART_COUNT = 100;

  constructor() {
  }

  
  // 各要素の取得
  static _getListHtml()            { return $("#dump-history-list"); }
  static _getListWrapperHtml()     { return $("#dump-history-list-wrapper"); }
  static _getListRowHtmls()        { return this._getListHtml().children(".dump-history-list-row"); }
  static _getListRowHeaderHtml()   { return this._getListHtml().children(".dump-history-list-row:first") ;}
  static _getListShowButtonHtml()  { return $("#dump-history-list-show-button"); }
  static _getListHideButtonHtml()  { return $("#dump-history-list-hide-button"); }
  static _getChartHtml()           { return $("#dump-history-chart-canvas"); }
  static _getChartWrapperHtml()    { return $("#dump-history-chart-wrapper"); }


  /**
   * @note   表示を更新する。
   * @param  {GameRecords} gameRecords
   */
  static Update(gameRecords, listClickCallback) {
    // リストをクリア
    this._clearList();

    // リストを更新
    this._updateList(gameRecords, listClickCallback);
    this._getListWrapperHtml().show();

    // リストの表示設定など
    this._hideList();
    this._getListShowButtonHtml().on("click", function() { DumpHistoryHtml._showList(); });
    this._getListHideButtonHtml().on("click", function() { DumpHistoryHtml._hideList(); });
    this._updateListNotice();

    // チャートを更新
    this._updateChart(gameRecords);
    this._getChartWrapperHtml().show();
  }


  /**
   * @note リストクリック時のイベント
   * @param {GameRecord} gameRecord
   */
  static _listRowCallback(e) {
    // クリックされた行のオブジェクト
    var listRowHtml   = $(this);
    var isDeletedHtml = listRowHtml.children(".dump-history-list-row-is-deleted");
    var idHtml        = listRowHtml.children(".dump-history-list-row-id");
    var dateHtml      = listRowHtml.children(".dump-history-list-row-date");
    var rateHtml      = listRowHtml.children(".dump-history-list-row-rate");
    var stockHtml     = listRowHtml.children(".dump-history-list-row-stock");
    var fighterHtml   = listRowHtml.children(".dump-history-list-row-fighter");

    // 引数を作成
    var gameRecord = new GameRecord();
    gameRecord.Id = idHtml.data("raw");
    gameRecord.Date = dateHtml.data("raw");
    gameRecord.Rate = rateHtml.data("raw");
    gameRecord.Stock = stockHtml.data("raw");
    gameRecord.Fighter = fighterHtml.data("raw");
    gameRecord.IsDeleted = isDeletedHtml.data("raw");

    // コールバック関数を呼び出す
    e.data.callback(gameRecord);
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
   * @note リストを全件表示する。
   */
  static _showList() {
    const MAX_COUNT = DumpHistoryHtml._MAX_LIST_COUNT;

    var listRowHtmls = this._getListRowHtmls();
    for (let i = 0; i < listRowHtmls.length; i++) {
      $(listRowHtmls[i]).show();
    }

    this._getListShowButtonHtml().hide();
    this._getListHideButtonHtml().hide();
    if (listRowHtmls.length > MAX_COUNT) {
      this._getListHideButtonHtml().show();
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

    this._getListShowButtonHtml().hide();
    this._getListHideButtonHtml().hide();
    if (listRowHtmls.length > MAX_COUNT) {
      this._getListShowButtonHtml().show();
    }
  }


  /**
   * @note リストを更新する。(1行)
   * @param {Object}     listRowHtml
   * @param {GameRecord} gameRecord
   */
  static _updateListRow(listRowHtml, gameRecord) {
    // 設定値
    var date = gameRecord.Date.substr(5, 5);
    var font = (gameRecord.Stock > 0) ? "positive-font" : "negative-font";

    // 各要素
    var idHtml         = listRowHtml.children(".dump-history-list-row-id");
    var dateHtml       = listRowHtml.children(".dump-history-list-row-date");
    var rateHtml       = listRowHtml.children(".dump-history-list-row-rate");
    var stockHtml      = listRowHtml.children(".dump-history-list-row-stock");
    var fighterHtml    = listRowHtml.children(".dump-history-list-row-fighter");
    var isDeletedHtml  = listRowHtml.children(".dump-history-list-row-is-deleted");
    var noticeIconHtml = listRowHtml.children(".dump-history-list-row-notice-icon");

    // 各要素の表示を更新
    idHtml.text(gameRecord.Id);
    dateHtml.text(date);
    rateHtml.text(gameRecord.Rate + "万");
    stockHtml.text(gameRecord.Stock);
    fighterHtml.text(gameRecord.Fighter);
    isDeletedHtml.text(gameRecord.IsDeleted);
    noticeIconHtml.hide();

    // リストクリックのコールバック用に生の値を仕込む
    idHtml.data("raw",   gameRecord.Id);
    dateHtml.data("raw", gameRecord.Date);
    rateHtml.data("raw", gameRecord.Rate);
    stockHtml.data("raw", gameRecord.Stock);
    fighterHtml.data("raw", gameRecord.Fighter);
    isDeletedHtml.data("raw", gameRecord.IsDeleted);

    // 勝敗に応じてフォントを設定
    listRowHtml.addClass(font);

    // 削除済みかどうかに応じてフォントを設定
    if (gameRecord.IsDeleted) {
      listRowHtml.addClass("line-through");
    }
    else {
      listRowHtml.removeClass("line-through");
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
      var arg = { callback: listClickCallback };
      listRowHtml.on("click", arg, this._listRowCallback);
    }
  }


  /**
   * @note リストの注意喚起欄を更新する。
   */
  static _updateListNotice() {
    // 退避
    var listRowHtmls = this._getListRowHtmls();
    var length = listRowHtmls.length;

    // 1レコードずつループして表示
    for (let i = 1; i < (length - 1); i++) {
      var listRowHtml   = $(listRowHtmls[i]);

      // 削除レコードは対象外
      var isDeletedHtml = listRowHtml.children(".dump-history-list-row-is-deleted");
      if (isDeletedHtml.data("raw") == true) {
        continue;
      }

      // 必要な情報の退避
      var rateHtml  = listRowHtml.children(".dump-history-list-row-rate");
      var stockHtml = listRowHtml.children(".dump-history-list-row-stock");
      var rate      = rateHtml.data("raw");
      var stock     = stockHtml.data("raw");
      var rate_prev = rate;

      // 1試合前の戦闘力を検索
      for (let j = (i + 1); j < length; j++) {
        var listRowHtml_prev   = $(listRowHtmls[j]);
        var isDeletedHtml_prev = listRowHtml_prev.children(".dump-history-list-row-is-deleted");
        if (isDeletedHtml_prev.data("raw") == false) {
          var rateHtml_prev = listRowHtml_prev.children(".dump-history-list-row-rate");
          rate_prev = rateHtml_prev.data("raw");
          break;
        }
      }

      // 不整合のチェック
      var noticeIconHtml;
      var noticeHtml;
      if ((rate < rate_prev) && (stock > 0) || (rate > rate_prev) && (stock < 0)) {
        var noticeIconHtml = listRowHtml.children(".dump-history-list-row-notice-icon");
        var noticeHtml     = noticeIconHtml.children(".dump-history-list-row-notice");
        noticeHtml.text("戦闘力の増減とストック差に不整合があります。");
        noticeIconHtml.show();
      }
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
