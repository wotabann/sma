class LoadingHtml {
  constructor() {
  }

  static ShowLoading() {
    $("#overlay").fadeIn(200);
    this._repaint();
  }

  static ClearLoading() {
    $("#overlay").fadeOut(300);
    this._repaint();
  }

  static async _repaint() {
    const repaint = async () => {
      for (let i = 0; i < 2; i++) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
    };
    await repaint();
  }
}
