class LoadingHtml {

  constructor() {
  }
  
  
  get _html_overlay() { return $("#overlay"); }


  showLoading() {
    this._html_overlay.fadeIn(200);
    this._repaint();
  }

  hideLoading() {
    this._html_overlay.fadeOut(300);
    this._repaint();
  }

  async _repaint() {
    const repaint = async () => {
      for (let i = 0; i < 2; i++) {
        await new Promise(resolve => requestAnimationFrame(resolve));
      }
    };
    await repaint();
  }
}
