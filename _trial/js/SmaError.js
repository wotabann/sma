class SmaError extends Error {
  static {
    this.prototype.name = "SmaError"
  }

  constructor(message = "", options = {}) {
    const { loc, ...rest } = options;

    super(message, rest);
    this.loc = loc;
  }

}
