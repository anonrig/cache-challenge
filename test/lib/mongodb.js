const mongodb = require('../../src/lib/mongodb');
const EventEmitter = require('events').EventEmitter;

describe('MongoDB', async function() {
  before(async function() {
    this.sandbox = sinon.sandbox.create();
    this.mongooseConnect = this.sandbox.stub(mongodb.mongoose, 'connect');
    this.mongooseConnection = this.sandbox.stub(mongodb.mongoose, 'connection');
  });

  after(async function() {
    this.sandbox.restore();
  });

  it('should initialize with empty instance', () => {
    expect(mongodb.instance).to.equal(null);
  });
});
