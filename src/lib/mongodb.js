class MongoDB {
  constructor() {
    this.mongoose = require('mongoose');
    this.instance = null;
  }

  init() {
    if (this.instance) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      this.instance = this.mongoose.connect(process.env.MONGODB);
      this.mongoose.connection.once('error', reject);
      this.mongoose.connection.once('open', resolve);
    });
  }
}


module.exports = new MongoDB();
