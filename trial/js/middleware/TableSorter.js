class TableSorter {

  constructor(tableHtml) {
    this._tableHtml = tableHtml;

    this._registerSortCallback(this._tableHtml.find(".sort-asc"),  false);
    this._registerSortCallback(this._tableHtml.find(".sort-desc"), true);
  }

  _registerSortCallback(buttonHtmls, isDesc) {
    for (let i = 0; i < buttonHtmls.length; i++) {
      var buttonHtml = $(buttonHtmls[i]);
      var sortCell = buttonHtml.data("sort-cell");
      var sortType = buttonHtml.data("sort-type");
      var compareFunction = this._getCompareFunction(sortType, isDesc);
      var arg = {
        this: this,
        sortCell : sortCell,
        compareFunction: compareFunction
      }
      buttonHtml.on("click", arg, this._sort);
    }
  }

  _compareAsString(textA, textB) {
    return textB < textA;
  }
  _compareAsStringDesc(textA, textB) {
    return textB > textA;
  }
  _compareAsNumber(textA, textB) {
    return parseInt(textB, 10) < parseInt(textA, 10);
  }
  _compareAsNumberDesc(textA, textB) {
    return parseInt(textB, 10) > parseInt(textA, 10);
  }
  _compareAsFloat(textA, textB) {
    return parseFloat(textB, 10) < parseFloat(textA, 10);
  }
  _compareAsFloatDesc(textA, textB) {
    return parseFloat(textB, 10) > parseFloat(textA, 10);
  }

  _getCompareFunction(sortType, isDesc) {
    switch (sortType) {
      case "string":
        return (isDesc ? this._compareAsStringDesc : this._compareAsString);
      case "number":
        return (isDesc ? this._compareAsNumberDesc : this._compareAsNumber);
      case "float":
        return (isDesc ? this._compareAsFloatDesc  : this._compareAsFloat);
      default:
        return (isDesc ? this._compareAsStringDesc : this._compareAsString);
    }
  }

  _getCellValue(cellHtml) {
    var value = cellHtml.data("sort-value");
    var text  = cellHtml.text();
    return (value == undefined) ? text : value;
  }

  _sort(event) {
    // 引数を取得
    var context = event.data.this; 
    var tableHtml = event.data.this._tableHtml;
    var sortCell = event.data.sortCell;
    var compareFunction = event.data.compareFunction;

    // テーブルの情報
    var bodyHtml  = tableHtml.find(".sort-body");

    // ソート用の情報
    var findCellString = "[data-sort-cell=\"" + sortCell + "\"]";

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
      cursorText = context._getCellValue(cellHtml_a);

      // ソート用ループ2
      for (let j = (i + 1); j < rowHtmls.length; j++) {
        // 比較先の情報
        rowHtml_b  = $(rowHtmls[j]);
        cellHtml_b = rowHtml_b.find(findCellString);

        // 比較して条件満たせば最大/最小の情報を更新
        if (compareFunction(cursorText, context._getCellValue(cellHtml_b))) {
          cursorRow  = j;
          cursorText = cellHtml_b.text();
          cursorText = context._getCellValue(cellHtml_b);
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


  filter(filterFunction) {
    var tableHtml = this._tableHtml;
    var bodyHtml  = tableHtml.find(".sort-body");
    var rowHtmls  = bodyHtml.children("tr");

    for (let i = 0; i < rowHtmls.length; i++) {
      var dataset = {};

      var rowHtml = $(rowHtmls[i]);
      var cellHtmls = $(rowHtml.children("td"));

      for (let j = 0; j < cellHtmls.length; j++) {
        var cellHtml = $(cellHtmls[j]);
        var dataName = cellHtml.data("sort-cell");

        if (dataName != undefined) {
          dataset[dataName] = {};
          dataset[dataName].text  = cellHtml.text();
          dataset[dataName].value = this._getCellValue(cellHtml);
        }
      }

      if (filterFunction(dataset)) {
        rowHtml.show();
      }
      else {
        rowHtml.hide();
      }
    }
  }

}
