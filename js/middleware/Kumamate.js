class Kumamate {

  constructor() {
  }


  /**
   * @note クマメイトの段位の数字を取得する。
   * @param {Integer} rankIndex
   * @return {String}
   */
  getRankNumber(rankIndex) {
    let rankNumbers = [
      "25",
      "24",
      "23",
      "22",
      "21",
      "20",
      "19",
      "18",
      "17",
      "16",
      "15",
      "14",
      "13",
      "12",
      "11",
      "10",
      "9の2",
      "9",
      "8",
      "7",
      "6",
      "5",
      "4",
      "3",
      "2",
      "1",
      "0",
    ];
    if (rankIndex < 0) {
      return "-";
    }
    if (rankIndex >= rankNumbers.length) {
      return "-";
    }
    return rankNumbers[rankIndex];
  }


  /**
   * @note クマメイトの段位の名称を取得する。
   * @param {Integer} rankIndex
   * @return {String}
   */
  getRankString(rankIndex) {
    let rankStrings = [
      "桜井",
      "神",
      "宇宙最強",
      "地元最強",
      "魔境卒業",
      "魔境Lv.5（トップオブザ魔境）",
      "魔境Lv.4",
      "魔境Lv.3（魔境街道）",
      "魔境Lv.2",
      "魔境Lv.1（魔境到達！）",
      "魔境まであと2-3勝",
      "VIP街道爆進",
      "一人前VIP",
      "VIP不安定層",
      "VIP入りたて",
      "VIP到達！",
      "VIPまであと2-3勝",
      "VIPまでラストスパート",
      "VIPの階段登る",
      "未VIP修行ゾーン（上）",
      "未VIP修行ゾーン（中）",
      "未VIP修行ゾーン（下）",
      "VIPに向けた発射台",
      "未VIPカオス（上）",
      "未VIPカオス（中）",
      "未VIPカオス（下）",
      "未VIP発射台",
    ];
    if (rankIndex < 0) {
      return "-";
    }
    if (rankIndex >= rankStrings.length) {
      return "-";
    }
    return rankStrings[rankIndex];
  }


}
