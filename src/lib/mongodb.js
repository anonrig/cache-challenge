const mongoose = require('mongoose');


class MongoDB {
  constructor() {
    this.instance = null;
  }

  init() {
    if (!this.instance) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this.instance = mongoose.connect(process.env.MONGODB);
      this.instance.connection.once('error', reject);
      this.instance.connection.once('open', resolve);
    });
  }
}


module.exports = new MongoDB();
