class Util {
  /**
   * @note   本日の日付をyyyy-mm-ddで取得する
   * @return {String}
   */
  static GetToday() {
    const dateTime = new Date();
    const date = new Date(dateTime.getFullYear(), dateTime.getMonth(), dateTime.getDate());
    const yyyy = date.getFullYear();
    const mm = ('00' + (date.getMonth()+1)).slice(-2);
    const dd = ('00' + date.getDate()).slice(-2);
    return `${yyyy}-${mm}-${dd}`;
  }


  /**
   * @note   ディレクトリ名を取得する
   * @return {String}
   */
  static GetDirectoryName() {
    var loc = location.pathname.split("/"); //パス名を/で分割して取得
    var dirName = loc[loc.length - 2]; // 文字列の後ろから２番目を取得
    return dirName;
  }
}
