class TableSorter {

  constructor(tableId) {
    this._tableHtml = $("#" + tableId);

    this._registerSortCallback(this._tableHtml.find(".sort-asc"),  false);
    this._registerSortCallback(this._tableHtml.find(".sort-desc"), true);
  }

  _registerSortCallback(buttonHtmls, isDesc) {
    for (let i = 0; i < buttonHtmls.length; i++) {
      var buttonHtml = $(buttonHtmls[i]);
      var sortCell = buttonHtml.data("sort-cell");
      var sortType = buttonHtml.data("sort-type");
      var compareFunction = TableSorter._getCompareFunction(sortType, isDesc);
      var arg = {
        tableHtml : this._tableHtml,
        sortCell : sortCell,
        compareFunction: compareFunction
      }
      buttonHtml.on("click", arg, this._sort);
    }
  }

  static _compareAsString(textA, textB) {
    return textB < textA;
  }
  static _compareAsStringDesc(textA, textB) {
    return textB > textA;
  }
  static _compareAsNumber(textA, textB) {
    return parseInt(textB, 10) < parseInt(textA, 10);
  }
  static _compareAsNumberDesc(textA, textB) {
    return parseInt(textB, 10) > parseInt(textA, 10);
  }
  static _compareAsFloat(textA, textB) {
    return parseFloat(textB, 10) < parseFloat(textA, 10);
  }
  static _compareAsFloatDesc(textA, textB) {
    return parseFloat(textB, 10) > parseFloat(textA, 10);
  }

  static _getCompareFunction(sortType, isDesc) {
    switch (sortType) {
      case "string":
        return (isDesc ? TableSorter._compareAsStringDesc : TableSorter._compareAsString);
      case "number":
        return (isDesc ? TableSorter._compareAsNumberDesc : TableSorter._compareAsNumber);
      case "float":
        return (isDesc ? TableSorter._compareAsFloatDesc  : TableSorter._compareAsFloat);
      default:
        return (isDesc ? TableSorter._compareAsStringDesc : TableSorter._compareAsString);
    }
  }


  _sort(event) {
    // 引数を取得
    var tableHtml = event.data.tableHtml;
    var sortCell = event.data.sortCell;
    var compareFunction = event.data.compareFunction;

    // テーブルの情報
    var bodyHtml  = tableHtml.find(".sort-body");

    // ソート用の情報
    var findCellString = "[data-sort-cell=\"" + sortCell + "\"";

    // ソート対象のセルが存在しない場合は何もしない
    if (bodyHtml.find(findCellString).length == 0) {
      return;
    }

    // ソート用のワーク変数
    var rowHtml_a;
    var rowHtml_b;
    var cellHtml_a;
    var cellHtml_b;
    var cursorRow;
    var cursorText;
    var rowHtmls  = bodyHtml.children();

    // ソート用ループ1
    for (let i = 0; i < rowHtmls.length; i++) {
      // 比較元の情報
      rowHtml_a  = $(rowHtmls[i]);
      cellHtml_a = rowHtml_a.find(findCellString);

      // 最大/最小の情報(まずは初期値)
      cursorRow  = i;
      cursorText = cellHtml_a.text();

      // ソート用ループ2
      for (let j = (i + 1); j < rowHtmls.length; j++) {
        // 比較先の情報
        rowHtml_b  = $(rowHtmls[j]);
        cellHtml_b = rowHtml_b.find(findCellString);

        // 比較して条件満たせば最大/最小の情報を更新
        if (compareFunction(cursorText, cellHtml_b.text())) {
          cursorRow  = j;
          cursorText = cellHtml_b.text();
        }
      }

      // 位置の入れ替え
      if (cursorRow > i) {
        rowHtml_b  = $(rowHtmls[cursorRow]);
        rowHtml_b.insertBefore(rowHtml_a);
        rowHtmls  = bodyHtml.children();
      }
    }
  }

}
